import {useMutation,} from "@tanstack/react-query";
import {sendMessage} from "@/api/chat";
import {ChangeEvent, useRef} from "react";
import {Loader} from "@/components/Loader";
import {useMessages} from "@/hooks/useMessages";
import { toast } from "@/functions/toast"
import {FileUpload} from "@/components/FileUpload";
import { Button } from "@/components/ui/button"
import {useIsMobile} from "@/hooks/use-mobile";

export function Form () {

    const {addMessage} = useMessages();

    const input = useRef<HTMLInputElement>(null);

    let typing = false;

    const isMobile = useIsMobile();

    const {mutate, isPending} = useMutation({
        mutationFn: (data: FormData) => sendMessage(data),
        mutationKey: ['message.send'],
        onSuccess: (message) => {
            addMessage(message);
            input.current!.value = '';
            window.CHAT_CHANNEL.whisper('stop_typing', window.USER);
        },
        onError (error: Error) {
            toast(error.message)
        }
    });

    const handleSubmit = async (data: FormData) => {
        mutate(data)
    }

    const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {

        const value = event.currentTarget.value;

        if (!typing && value.length > 0 ) {
            typing = true;
            window.CHAT_CHANNEL.whisper('typing', window.USER);
        } else if (value.length === 0) {
            typing = false
            window.CHAT_CHANNEL.whisper('stop_typing', window.USER);
        }
    }


    return (
        <div className={'h-18 bg-white border-t border-gray-300 px-3 py-4 w-full relative bottom-0'}>
            <div className={'flex items-stretch justify-center content-between gap-3'}>
                <div className={'flex w-full border border-gray-300 h-full focus:border-gray-700'}>
                    <form id={'main-form'} action={handleSubmit} className="flex w-full">
                        <input
                            type="text"
                            className={'block w-full p-2 bg-gray-50 text-gray-900 focus:outline-hidden'}
                            placeholder={'Type a message ..'}
                            name={'content'}
                            required
                            ref={input}
                            maxLength={255}
                            onChange={handleChange}
                            autoFocus={!isMobile}
                            autoComplete={'off'}
                        />
                    </form>
                    <FileUpload/>
                </div>
                <Button className={'h-full py-2.5 rounded-none'} type={'submit'} form={'main-form'} disabled={isPending}>
                    {isPending && <Loader size={'sm'}/>}
                    <span>Send</span>
                </Button>
            </div>
        </div>
    )
}

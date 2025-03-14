import {useMutation,} from "@tanstack/react-query";
import {sendMessage} from "@/api/chat";
import {ChangeEvent, FormEvent, useRef} from "react";
import {Loader} from "@/components/Loader";
import {useMessages} from "@/hooks/useMessages";
import { toast } from "@/functions/toast"
import {Typing} from "@/components/Typing";
import {ImageUpload} from "@/components/ImageUpload";
import { Button } from "@/components/ui/button"

export function Form () {

    const {addMessage} = useMessages();

    const input = useRef<HTMLInputElement>(null);

    let typing = false;

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

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        mutate(formData)
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
        <div className={'h-22 bg-white border-t border-gray-300 px-3 pt-6 w-full relative bottom-0'}>
            <div className={'flex items-stretch justify-center content-between gap-3'}>
                <div className={'flex w-full border border-gray-300 h-full'}>
                    <form id={'main-form'} onSubmit={handleSubmit} className="flex w-full">
                        <input
                            type="text"
                            className={'block w-full p-2 bg-gray-50 text-gray-900'}
                            placeholder={'Type a message ..'}
                            name={'content'}
                            required
                            ref={input}
                            maxLength={255}
                            onChange={handleChange}
                        />
                    </form>
                    <ImageUpload/>
                </div>
                <Button className={'h-full py-2.5 rounded-none'} type={'submit'} form={'main-form'} disabled={isPending}>
                    {isPending && <Loader size={'sm'}/>}
                    <span>Send</span>
                </Button>
            </div>
            <Typing/>
        </div>
    )
}

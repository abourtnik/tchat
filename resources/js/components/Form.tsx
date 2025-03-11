import {useMutation,} from "@tanstack/react-query";
import {sendMessage} from "@/api/chat";
import {FormEvent, useRef} from "react";
import { MessageData, MessageDataSchema} from "@/types";
import {Loader} from "@/components/Loader";
import {clsx} from "clsx";
import {useMessages} from "@/hooks/useMessages";

export function Form () {

    const {addMessage} = useMessages();

    const input = useRef<HTMLInputElement>(null);

    const {mutate, isPending} = useMutation({
        mutationFn: (data: MessageData) => sendMessage(data),
        mutationKey: ['message.send'],
        onSuccess: (message) => {
            addMessage(message);
            input.current!.value = '';
        }
    });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const data = Object.fromEntries(formData.entries());

        mutate(MessageDataSchema.parse(data))
    }

    return (
        <form onSubmit={handleSubmit} className="h-16 bg-white flex fixed bottom-0 w-full lg:w-7/8 items-center justify-center content-between gap-3 border-t border-gray-300 p-3">
            <div className={'flex w-full border border-gray-300 rounded-sm'}>
                <input
                    type="text"
                    className={'block w-full border-gray-100 p-2 bg-gray-50'}
                    placeholder={'Type a message ..'}
                    name={'content'}
                    required
                    ref={input}
                    maxLength={255}
                />
               {/* <label
                    className="p-2 border-l border-gray-200 font-medium bg-white text-gray-700 hover:bg-gray-100 cursor-pointer">
                    <input type="file" className={'hidden h-full w-full'} onChange={handleFileChange}/>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"/>
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"/>
                    </svg>
                </label>*/}
            </div>

            <button
                type={'submit'}
                className={clsx('text-white font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center gap-2', isPending && 'bg-blue-400 cursor-not-allowed', !isPending && 'cursor-pointer bg-midnight hover:bg-blue-800')}
                disabled={isPending}
            >
                {isPending && <Loader size={'sm'}/>}
                <span>Send</span>
            </button>
        </form>
    )
}

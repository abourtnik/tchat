import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose,} from "@/components/ui/dialog"
import {ChangeEvent, FormEvent, useRef, useState} from "react";
import { Button } from "@/components/ui/button"
import {useMutation} from "@tanstack/react-query";
import {sendMessage} from "@/api/chat";
import {useMessages} from "@/hooks/useMessages";
import {Loader} from "@/components/Loader";

export function ImageUpload () {

    const [open, setOpen] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);

    const input = useRef<HTMLInputElement>(null);

    const {addMessage} = useMessages();

    const {mutate, isPending, isError, error} = useMutation({
        mutationFn: (data: FormData) => sendMessage(data),
        mutationKey: ['message.send'],
        onSuccess: (message) => {
            addMessage(message);
            setFile(null);
            setOpen(false);
            input.current!.value = '';
        }
    });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        formData.append('file', file as File, file?.name);

        mutate(formData)
    }

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget!.files![0];

        if (!file) return;

        setFile(file);
        setOpen(true);
    }


    return (
        <>
        <label
            className="p-2 border-l border-gray-200 font-medium bg-white text-gray-700 hover:bg-gray-100 cursor-pointer">
            <input type="file" className={'hidden h-full w-full'} onChange={handleFileChange} ref={input}/>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"/>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"/>
            </svg>
        </label>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Send image</DialogTitle>
                        <DialogDescription/>
                    </DialogHeader>
                    <form id="my-form" onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="flex flex-col items-center gap-4">
                            {
                                file &&
                                <img className={'rounded h-auto max-w-full'} src={URL.createObjectURL(file)} alt="file"/>
                            }
                            <input
                                type="text"
                                className={'block w-full p-2 bg-gray-50 border border-gray-300'}
                                placeholder={'Add a message ..'}
                                name={'content'}
                                ref={input}
                                maxLength={255}
                            />
                        </div>
                    </form>
                    <DialogFooter className="sm:justify-between">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">Close</Button>
                        </DialogClose>
                        <Button type="submit" form="my-form" disabled={isPending}>
                            {isPending && <Loader size={'sm'}/>}
                            Send
                        </Button>
                    </DialogFooter>
                    {
                        error &&
                        <div className={'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'} role="alert">{error.message}</div>
                    }
                </DialogContent>
            </Dialog>
        </>

    )
}

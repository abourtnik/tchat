import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose,} from "@/components/ui/dialog"
import {ChangeEvent, useRef, useState} from "react";
import { Button } from "@/components/ui/button"
import {useMutation} from "@tanstack/react-query";
import {sendMessage} from "@/api/chat";
import {useMessages} from "@/hooks/useMessages";
import {Loader} from "@/components/Loader";
import {formatSizeUnits} from "@/functions/size";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip"

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp'];
const VIDEO_TYPES = ['video/mp4', 'video/webm'];

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

    const handleSubmit = async (data: FormData) => {
        data.append('file', file as File, file?.name);
        mutate(data)
    }

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget!.files![0];

        if (!file) return;

        setFile(file);
        setOpen(true);
    }

    const preview = (file && (IMAGE_TYPES.includes(file.type) || VIDEO_TYPES.includes(file.type))) ? URL.createObjectURL(file) : null;

    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <label
                            className="p-2 border-l border-gray-200 font-medium bg-white text-gray-700 hover:bg-gray-100 cursor-pointer">
                            <input type="file" className={'hidden h-full w-full'} onChange={handleFileChange}
                                   ref={input}/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                            </svg>
                        </label>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Attach a file of 10MB maximum</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Send file</DialogTitle>
                        <DialogDescription/>
                    </DialogHeader>
                    <form id="my-form" action={handleSubmit}>
                        <div className="flex flex-col items-center gap-4">
                            {
                                (file && preview) &&
                                <>
                                    {
                                        IMAGE_TYPES.includes(file.type) &&
                                        <img className={'rounded h-auto max-w-full'} src={preview} alt="file"/>
                                    }
                                    {
                                        VIDEO_TYPES.includes(file.type) &&
                                        <video className="rounded h-auto max-w-full" controls>
                                            <source src={preview} type={file.type}/>
                                            Your browser does not support the video tag.
                                        </video>
                                    }
                                </>
                            }
                            {
                                (file && !preview) &&
                                <div className={'bg-gray-200 border border-gray-300 p-4 rounded w-full flex flex-col items-center justify-center gap-4'}>
                                    <div className={'flex flex-col items-center justify-center gap-1'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-25">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>
                                        </svg>
                                        <span className={'text-xs text-gray-500 break-all'}>{file.name}</span>
                                    </div>
                                    <div className={'flex flex-col items-center gap-1'}>
                                        <span className={'text-xs text-gray-500'}>{formatSizeUnits(file.size)} - {file.type}</span>
                                    </div>
                                </div>
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

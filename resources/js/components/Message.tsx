import {MessageType} from "@/types";
import {clsx} from "clsx";
import {cn} from "@/lib/utils";
import {memo, useState} from "react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {Button, buttonVariants} from "@/components/ui/button";
import {useMutation} from "@tanstack/react-query";
import {deleteMessage,} from "@/api/chat";
import {toast} from "@/functions/toast";
import {useMessages} from "@/hooks/useMessages";
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from "@/components/ui/alert-dialog"

type Props = {
    message: MessageType
}
export const Message = memo(({message} : Props) => {

    const isCurrentUser = message.user.id === window.USER.id;

    const [hover, setHover] = useState<boolean>(false);

    let menuOpen = false;

    const {removeMessage} = useMessages();

    const {mutate, isPending} = useMutation({
        mutationFn: (id: number) => deleteMessage(id),
        mutationKey: ['message.delete', message.id],
        onSuccess: (e) => {
            removeMessage(message.id);
        },
        onError (error: Error) {
            toast(error.message)
        }
    });

    return (
        <li
            className={clsx("flex", {
                "justify-end": isCurrentUser,
                "justify-start": !isCurrentUser,
            })}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => !menuOpen && setHover(false)}
        >
            <div
                className={clsx("flex gap-3 items-start mb-3 text", {
                    "flex-row-reverse": isCurrentUser,
                })}
            >
                <img src={message.user.avatar} alt="" className="rounded-full w-8"/>
                <div
                    className={'flex flex-col gap-1'}
                >
                    <div
                        className={clsx("flex gap-2 items-center", {
                            "flex-row-reverse": isCurrentUser,
                        })}
                    >
                        <div
                            className={cn('rounded ', {
                                "bg-white border-gray-300": isCurrentUser,
                                "bg-midnight border-gray-700 text-white": !isCurrentUser,
                                "p-0 border-0 max-w-80": message.file,
                            })}
                        >
                            {message.file && <img className={clsx('h-auto', message.content && 'rounded-t mb-1', !message.content && 'rounded')} src={message.file} alt=""/>}
                            {message.content && <p className={'px-2 py-1'}>{message.content}</p>}
                        </div>
                        {
                            (isCurrentUser && hover) &&
                            <DropdownMenu onOpenChange={(open) => {
                                menuOpen = open
                            }}>
                                <DropdownMenuTrigger asChild>
                                    <button className={'hover:bg-gray-300 hover:rounded-full w-6 h-6 flex justify-center items-center'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.0} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"/>
                                        </svg>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side={"top"}>
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem asChild>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild={true}>
                                                    <Button size={'sm'} variant={'ghost'} className={'w-full hover:ring-0'}>Delete</Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete this message for you and all other users.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            disabled={isPending}
                                                            onClick={() => mutate(message.id)}
                                                            className={buttonVariants({ variant: "destructive" })}
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        }
                    </div>
                    <small
                        className={clsx("text-xs text-gray-500", {
                            "text-right": isCurrentUser,
                            "text-left": !isCurrentUser,
                        })}
                    >
                        {message.formated_date}
                    </small>
                </div>
            </div>
        </li>
    )
}, (prev, next) => prev.message.id === next.message.id)

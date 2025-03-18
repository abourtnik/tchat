import {MessageType} from "@/types";
import {clsx} from "clsx";
import {cn} from "@/lib/utils";
import {memo} from "react";

type Props = {
    message: MessageType
}
export const Message = memo(({message} : Props) => {

    const isCurrentUser = message.user.id === window.USER.id;

    return (
        <li
            className={clsx("flex", {
                "justify-end": isCurrentUser,
                "justify-start": !isCurrentUser,
            })}
        >
            <div
                className={clsx("flex gap-3 items-start mb-3 text", {
                    "flex-row-reverse": isCurrentUser,
                })}
            >
                <img src={message.user.avatar} alt="" className="rounded-full w-8"/>
                <div className={'flex flex-col gap-1'}>
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
                    <small className={'text-xs text-gray-500 text-right'}>{message.formated_date}</small>
                </div>
            </div>

        </li>
    )
}, (prev, next) => prev.message.id === next.message.id)

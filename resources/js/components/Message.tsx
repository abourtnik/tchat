import {MessageType} from "@/types";
import {clsx} from "clsx";

type Props = {
    message: MessageType
}
export function Message ({message} : Props) {

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
                    <p
                        className={clsx("px-2 py-0.5 rounded border ", {
                            "bg-white border-gray-300": isCurrentUser,
                            "bg-midnight border-gray-700 text-white": !isCurrentUser,
                        })}
                    >
                        {message.content}
                    </p>
                    <small className={'text-xs text-gray-500 text-right'}>{message.formated_date}</small>
                </div>
            </div>

        </li>
    )
}

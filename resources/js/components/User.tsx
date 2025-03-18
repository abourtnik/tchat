import {UserType} from "@/types";
import {clsx} from "clsx";
import {memo} from "react";

type Props = {
    user: UserType
}

export const User = memo(({user} : Props) => {

    const isCurrentUser = user.id === window.USER.id;

    return (
        <div className={'flex flex-col gap-2 items-center mt-4'}>
            <img
                src={user.avatar}
                alt={'avatar ' + user.username}
                className={clsx("rounded-full w-25", {
                     "border-3 border-gray-700": isCurrentUser,
                })}
            />
            <span
                id={'user-' + user.id}
                className={clsx("text-sm font-medium break-all px-2 text-center", {
                    "text-red-500": isCurrentUser,
                })}
            >
                {user.username}
            </span>
        </div>
    )
}, (prev, next) => prev.user.username === next.user.username)

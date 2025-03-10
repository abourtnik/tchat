import {UserType} from "@/types";
import {clsx} from "clsx";

type Props = {
    user: UserType
}

export function User ({user} : Props) {

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
                className={clsx("text-sm font-medium", {
                    "text-red-500": isCurrentUser,
                })}
            >
                {user.username}
            </span>
        </div>
    )
}

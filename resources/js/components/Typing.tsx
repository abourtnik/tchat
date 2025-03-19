import {Fragment, useEffect, useState} from "react";
import {UserType} from "@/types";
import {clsx} from "clsx";

export function Typing () {

    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
        window.CHAT_CHANNEL.listenForWhisper('typing', (user: UserType) => {
            setUsers(users => [...users, user]);
        })
        window.CHAT_CHANNEL.listenForWhisper('stop_typing', (user: UserType) => {
            setUsers(users => users.filter(u => u.id !== user.id));
        })
    }, [])

    return (
        <Fragment>
            {
                users.length > 0 &&
                <div className={'flex gap-2 items-center my-3'}>
                    <div className={'flex'}>
                        {users.map((user, index) => (
                            <img
                                key={user.id}
                                src={user.avatar}
                                alt={'avatar ' + user.username}
                                className={clsx('rounded-full w-8 border-2 border-white', {
                                    '-ml-2' : index !== 0,
                                })}
                            />
                        ))}
                    </div>
                    <div className="flex flex-none items-end">
                        <div className="flex items-center justify-center py-3 px-2 bg-white rounded-full">
                            {
                                Array(3).fill(0).map((_, index) => (
                                    <span
                                        key={index}
                                        className="w-1.5 h-1.5 mx-1 bg-gray-400 rounded-full animate-bounce"
                                        style={{animationDelay: `${index * 0.15}s`}}
                                    >
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    )
}

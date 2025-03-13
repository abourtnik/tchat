import {Fragment, useEffect, useState} from "react";
import {UserType} from "@/types";

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
                <div className={'text-xs text-gray-500 py-1'}>
                    {users.length === 1 && (users[0] + ' is typing ...')}
                    {(users.length >= 2 && users.length < 10) && (users.map(user => user.username).join(' and ') + ' are typing ...')}
                    {users.length >= 10 && users.length + ' users are typing ...'}
                </div>
            }
        </Fragment>
    )
}

import {User} from "@/components/User";
import {useEffect, useState} from "react";
import {UserType} from "@/types";

export function Users () {

    const [users, setUsers] = useState<UserType[]>([]);

    const joining = (user: UserType) => {
        setUsers(users => [...users, user]);
    }

    const leaving = (user: UserType) => {
        setUsers(users => users.filter(u => u.id !== user.id));
    }

    const init = (users: UserType[]) => {
        setUsers(users);
    }

    const error = (error: Error) => {
        console.error(error);
    }

    useEffect(() => {
        window.CHAT_CHANNEL
            .here(init)
            .joining(joining)
            .leaving(leaving)
            .error(error);
    }, []);


    return (
        <div className={'flex-1 bg-white overflow-y-auto border-r border-gray-300'}>
            {
                users.map(user => <User key={user.id} user={user}/>)
            }
        </div>
    )
}

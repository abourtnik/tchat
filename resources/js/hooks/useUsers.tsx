import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {UserType} from "@/types";

type UsersContextType = {
    users: UserType[],
    setUsers: (users: UserType[]) => void
}

const initialContext : UsersContextType = {
    users: [],
    setUsers: () => {}
}

const UsersContext = createContext<UsersContextType>(initialContext);

export function UsersProvider({ children }: { children: ReactNode }) {

    const joining = (user: UserType) => {
        setUsers(users => [...users, user]);
    }

    const leaving = (user: UserType) => {
        window.CHAT_CHANNEL.whisper('stop_typing', user);
        setUsers(users => users.filter(u => u.id !== user.id));
    }

    const init = (users: UserType[]) => {
        setUsers(users);
    }

    const error = (error: Error) => {
        console.error(error);
    }

    const updateUser = (user: UserType) => {
        setUsers(users => users.map(u => u.id == user.id ? {...u, username: user.username} : u));
    }

    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
        window.CHAT_CHANNEL
            .here(init)
            .joining(joining)
            .leaving(leaving)
            .listen('.user.updated', updateUser)
            .error(error);

    }, []);


    return (
        <UsersContext value={{ users, setUsers }}>
            {children}
        </UsersContext>
    );
}

export function useUsers() {
    const context = useContext(UsersContext);
    if (!context) throw new Error("useUsers must be used within UsersProvider");
    return context;
}

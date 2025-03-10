import {Form} from "@/components/Form";
import {Users} from "@/components/Users";
import { Messages } from "./components/Messages";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useState} from "react";
import {clsx} from "clsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            networkMode: 'online',
            refetchOnReconnect: false,
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
});

export default function App () {

    const [isOpen, setIsOpen] = useState<boolean>(true);

    return (
        <QueryClientProvider client={queryClient}>
            <div className={'flex h-screen'}>
                <div
                    className={clsx('flex-col bg-white transform transition-transform', {
                        'hidden lg:w-1/8 lg:flex': isOpen,
                        'hidden': !isOpen,
                    })
                    }>
                    <div
                        className="h-16 bg-midnight text-white flex items-center justify-between px-3 border-b border-gray-300">
                        <h2 className="text-lg font-semibold">{window.APP.name}</h2>
                        <button className={'cursor-pointer'} onClick={() => setIsOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                            </svg>
                        </button>
                    </div>
                    <Users/>
                </div>
                <div
                    className={clsx('flex flex-col', {
                        'w-full lg:w-7/8': isOpen,
                        'w-full': !isOpen,
                    })}
                >
                    <div className="h-16 bg-white flex items-center justify-start px-3 gap-3 border-b border-gray-300">
                        {
                            !isOpen &&
                            <button className={'cursor-pointer'} onClick={() => setIsOpen(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                                </svg>
                            </button>
                        }

                        <img className={'w-9 rounded-full border-2 border-gray-500'} src={window.USER.avatar} alt=""/>
                        <h2 className="text-lg font-semibold">{window.USER.username}</h2>
                    </div>
                    <Messages/>
                    <Form/>
                </div>
            </div>
        </QueryClientProvider>
    );
}

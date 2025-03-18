import {Form} from "@/components/Form";
import { Messages } from "./components/Messages";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {clsx} from "clsx";
import { Toaster } from "@/components/ui/sonner"
import { SidebarProvider } from "@/components/ui/sidebar"
import {Sidebar} from "@/components/Sidebar";
import {Header} from "@/components/Header";
import {UsersProvider} from "@/hooks/useUsers";

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

    return (
        <QueryClientProvider client={queryClient}>
            <UsersProvider>
                <SidebarProvider>
                    <Sidebar/>
                    <main className={clsx('w-full h-dvh flex flex-col')}>
                        <Header/>
                        <Messages/>
                        <Form/>
                    </main>
                    <Toaster position="top-center" visibleToasts={1} toastOptions={{closeButton: true}}/>
                </SidebarProvider>
            </UsersProvider>
        </QueryClientProvider>
    );
}

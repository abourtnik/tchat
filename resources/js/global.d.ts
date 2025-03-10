import { UserType } from "@/types";

declare global {
    interface Window {
        USER: UserType,
        APP: {
            name: string
        },
        Pusher : any
        Echo : any
        CHAT_CHANNEL: any;
    }
}

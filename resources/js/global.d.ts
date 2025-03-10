import { UserType } from "@/types";
import { Alpine as AlpineType } from 'alpinejs'

declare global {
    interface Window {
        USER: UserType,
        APP: {
            name: string
        },
        Pusher : any
        Echo : any
        CHAT_CHANNEL: any;
        Alpine: AlpineType
    }
}

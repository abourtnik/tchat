import { z } from "zod";

export type UserType = {
    id: number,
    username: string,
    avatar: string,
}

export type Paginator<T> = {
    data: T[],
    next_page : number | null
}

export type MessageType = {
    id: number,
    content: string,
    user : UserType
    date: Date,
    formated_date: string,
}

export const MessageDataSchema = z.object({
    content: z.string().min(1).max(5000),
});

export type MessageData = z.infer<typeof MessageDataSchema>

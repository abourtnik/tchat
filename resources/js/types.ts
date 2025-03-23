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
    content: string | null,
    user : UserType
    date: Date,
    formated_date: string,
    file?: string
    file_type?: string,
    file_size?: number,
    file_original_name?: string,
    is_image: boolean,
    is_video: boolean,
    is_media: boolean
}

export const MessageDataSchema = z.object({
    content: z.string().min(1).max(5000),
});

export type MessageData = z.infer<typeof MessageDataSchema>

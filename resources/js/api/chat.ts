import {jsonFetch} from '@/functions/api'
import {Paginator, MessageType} from "@/types";

const API_URL =  '/api';

export async function getMessages(page: number = 1): Promise<Paginator<MessageType>> {
    return jsonFetch(API_URL + `/messages?page=${page}`);
}

export async function sendMessage(data : FormData): Promise<MessageType> {
    return jsonFetch(API_URL + `/messages/send`, {
        method: 'POST',
        body: data
    });
}

export async function updateUser(data : FormData): Promise<{username: string}> {
    return jsonFetch(API_URL + `/user/update`, {
        method: 'POST',
        body: data
    });
}

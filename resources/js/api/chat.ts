import {jsonFetch} from '@/functions/api'
import {Paginator, MessageData, MessageType} from "@/types";

const API_URL =  '/api';

export async function getMessages(page: number = 1): Promise<Paginator<MessageType>> {
    return jsonFetch(API_URL + `/messages?page=${page}`);
}

export async function sendMessage(data : MessageData): Promise<MessageType> {
    return jsonFetch(API_URL + `/messages/send`, 'POST', data);
}

export async function updateUser(data : {username : string}): Promise<{username: string}> {
    return jsonFetch(API_URL + `/user/update`, 'POST', data);
}

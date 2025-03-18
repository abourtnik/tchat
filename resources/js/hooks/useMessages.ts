import {InfiniteData, useQueryClient} from "@tanstack/react-query";
import {Paginator, MessageType} from "@/types";
import {produce} from "immer";
export function useMessages() {

    const queryClient = useQueryClient();

    const addMessage = (message: MessageType) => {
        queryClient.setQueriesData(
            { queryKey: ["messages"] },
            (oldData: InfiniteData<Paginator<MessageType>> | undefined) => {
                if (!oldData) return undefined;
                return produce(oldData, draft => {
                    draft.pages[draft.pages.length - 1].data.push(message);
                    // @ts-ignore
                    draft.pushed = true;
                });
            }
        );
    };

    const removeMessage = (id: number) => {
        queryClient.setQueriesData(
            { queryKey: ["messages"] },
            (oldData: InfiniteData<Paginator<MessageType>> | undefined) => {
                if (!oldData) return undefined;
                return produce(oldData, draft => {
                    draft.pages.forEach(page => {
                        page.data = page.data.filter(m => m.id !== id);
                    });
                });
            }
        );
    };

    return {
        addMessage,
        removeMessage
    };
}

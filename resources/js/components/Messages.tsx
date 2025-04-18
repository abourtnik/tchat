import {getMessages} from "@/api/chat";
import {Fragment, useEffect, useMemo, useRef} from "react";
import {Message} from "@/components/Message";
import {Loader} from "@/components/Loader";
import {MessageType} from "@/types";
import {useMessages} from "@/hooks/useMessages";
import {useInfiniteQuery} from "@tanstack/react-query";
import {useInView} from "react-intersection-observer";
import {Typing} from "@/components/Typing";

export function Messages () {

    const { ref, inView} = useInView()
    const messagesRef = useRef<HTMLDivElement>(null);

    const {addMessage, removeMessage} = useMessages();

    const {
        data: messages,
        isLoading,
        isError,
        refetch,
        error,
        isFetchingPreviousPage,
        hasPreviousPage,
        fetchPreviousPage,
    } = useInfiniteQuery({
        queryKey: ['messages'],
        queryFn: ({pageParam}) => getMessages(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.next_page,
        getPreviousPageParam: (firstPage) => firstPage.next_page,
    });

    useEffect(() => {
        window.CHAT_CHANNEL
            .listen('.message.new', (message: MessageType) => {
                addMessage(message);
            })
            .listen('.message.deleted', (message: MessageType) => {
                removeMessage(message.id);
            })
    }, []);

    useEffect(() => {
        // @ts-ignore
       if (messages && (messages.pushed || messages.pages.length === 1)) {

       }
    }, [messages]);


    useEffect( () => {
        if (inView && !isFetchingPreviousPage && !isError) {
            (async () => {
                const previous = messagesRef.current!.scrollHeight;
                await fetchPreviousPage();
                setTimeout(() => {
                    messagesRef.current!.scrollTop = -(previous - 400);
                }, 0);
            })();
        }
    }, [inView]);

    return (
        <section ref={messagesRef} id={'messages'} className={'bg-gray-200 overflow-y-auto flex-1 px-2 pt-4 h-full flex flex-col-reverse'}>
            <Typing/>
            {
                isLoading &&
                <div className={'flex justify-center items-center h-full'}>
                    <Loader/>
                </div>
            }
            {
                isError &&
                <div className={'flex justify-center items-center h-full'}>
                    <div className="p-4 mb-4 text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 w-1/2" role="alert">
                        <div className="flex items-center">
                            <span className="sr-only">Info</span>
                            <h3 className="text-lg font-medium">Something went wrong !</h3>
                        </div>
                        <div className="mt-2 mb-4 text-sm">
                            {error.message}
                        </div>
                        <div className="flex" onClick={() => refetch()}>
                            <button type="button" className="cursor-pointer text-white bg-yellow-800 hover:bg-yellow-900 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center ">
                                Reload
                            </button>
                        </div>
                    </div>
                </div>
            }
            {
                messages &&
                <ul>
                    {messages.pages.map((group, i) => (
                        <Fragment key={i}>
                            {group.data.map((message) => <Message key={message.id} message={message} />)}
                        </Fragment>
                    ))}
                </ul>
            }
            {
                isFetchingPreviousPage &&
                <div className={'flex justify-center items-center mb-3'}>
                    <Loader size={'sm'}/>
                </div>
            }
            {hasPreviousPage && <span ref={ref}></span>}
        </section>
    )
}

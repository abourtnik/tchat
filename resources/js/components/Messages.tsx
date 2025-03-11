import {getMessages} from "@/api/chat";
import {Fragment, useEffect, useRef} from "react";
import {Message} from "@/components/Message";
import {Loader} from "@/components/Loader";
import {MessageType} from "@/types";
import {useMessages} from "@/hooks/useMessages";
import {useInfiniteQuery} from "@tanstack/react-query";
import {useInView} from "react-intersection-observer";

export function Messages () {

    const { ref, inView} = useInView()
    const messagesRef = useRef<HTMLDivElement>(null);

    const {addMessage} = useMessages();

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
    }, []);

    useEffect(() => {
        // @ts-ignore
       if (messages && (messages.pushed || messages.pages.length === 1)) {
           messagesRef.current!.scrollTop = messagesRef.current!.scrollHeight;
       }
    }, [messages]);


    useEffect( () => {
        if (inView && !isFetchingPreviousPage && !isError) {
            (async () => {
                const previous = messagesRef.current!.scrollHeight;
                await fetchPreviousPage();
                setTimeout(() => {
                    messagesRef.current!.scrollTop = messagesRef.current!.scrollHeight - previous;
                }, 0);
            })();
        }
    }, [inView]);

    return (
        <div ref={messagesRef} id={'messages'} className={'bg-gray-200 overflow-y-auto'} style={{height: 'calc(100% - 128px)'}}>
            {hasPreviousPage && <span ref={ref}></span>}
            {
                isFetchingPreviousPage &&
                <div className={'flex justify-center items-center mt-3'}>
                    <Loader size={'sm'}/>
                </div>
            }
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
                <ul className="p-2">
                    {messages.pages.map((group, i) => (
                        <Fragment key={i}>
                            {group.data.map((message) => <Message key={message.id} message={message} />)}
                        </Fragment>
                    ))}
                </ul>
            }
        </div>
    )
}

import {FormEvent, Fragment, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {updateUser} from "@/api/chat";
import {Loader} from "@/components/Loader";
import { toast } from "@/functions/toast"

type Data = {
    username: string
}
export function Username () {

    const [edit, setEdit] = useState<boolean>(false);
    const [username, setUsername] = useState<string>(window.USER.username);

    const {mutate, isPending, isError, error} = useMutation({
        mutationFn: (data: Data) => updateUser(data),
        mutationKey: ['user.update'],
        onSuccess: (data: Data) => {
            setEdit(false)
            setUsername(data.username)
            document.getElementById('user-' + window.USER.id)!.innerText = data.username;
        },
        onError (error: any) {
            toast(error.message)
        }
    });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const data = Object.fromEntries(formData.entries()) as Data;

        if (data.username !== username) {
            mutate(data);
        } else {
            setEdit(false);
        }
    }

    return (
        <Fragment>
            {
                edit &&
                <form onSubmit={handleSubmit} className={'flex border border-gray-200 rounded-sm w-60'}>
                    <input type={'text'} name={'username'} className={'block w-full px-2 py-1 bg-gray-50 text-black'} defaultValue={username} required maxLength={50}/>
                    <button
                        className={'px-2 py-1 border-l border-gray-200 font-medium bg-white text-gray-700 hover:bg-green-100 cursor-pointer'}
                        disabled={isPending}
                    >
                        {isPending && <Loader size={'sm'}/>}
                        {
                            !isPending &&
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
                            </svg>
                        }
                    </button>
                    <button
                        className={'px-2 py-1 border-l border-gray-200 font-medium bg-white text-gray-700 hover:bg-red-100 cursor-pointer'}
                        onClick={() => setEdit(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </form>
            }
            {
                !edit &&
                <Fragment>
                    <h2 className="text-lg font-semibold">{username}</h2>
                    <button type={'button'} className={'cursor-pointer'} onClick={() => setEdit(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"/>
                        </svg>
                    </button>
                </Fragment>
            }
        </Fragment>
    )
}

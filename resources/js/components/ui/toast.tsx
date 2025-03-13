import { toast as sonnerToast } from 'sonner';

export type ToastProps = {
    id: string | number;
    title: string;
    description?: string;
}

export function Toast({ title, description, id }: ToastProps) {
    return (
        <div className="flex rounded-lg bg-white shadow-lg ring-1 ring-black/5 w-full md:max-w-[364px] items-center p-4 gap-4">
            <div className="flex flex-1 items-center">
                <div className="w-full">
                    <p className="text-sm font-medium text-gray-900">{title}</p>
                    {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
                </div>
            </div>
            <button
                className="text-gray-500 cursor-pointer"
                onClick={() => sonnerToast.dismiss(id)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
            </button>
        </div>
    );
}

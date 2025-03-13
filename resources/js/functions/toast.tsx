import { toast as sonnerToast, ExternalToast } from 'sonner';
import { Toast } from "@/components/ui/toast";

export function toast(title: string, options?: ExternalToast) {
    return sonnerToast.custom((id) => (
        <Toast
            id={id}
            title={title}
        />
    ), options);
}

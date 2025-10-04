import {ReactElement, ImgHTMLAttributes, Fragment} from "react";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";


type Props = {
    children: ReactElement<ImgHTMLAttributes<HTMLImageElement>>;
}

export function ImagePreview ({children} : Props) {

    const img = children;

    return (
        <Fragment>
            <Dialog>
                <DialogTrigger asChild className="cursor-pointer">
                    {children}
                </DialogTrigger>
                <DialogContent className="flex items-center justify-center p-0 bg-transparent border-0 shadow-none" aria-describedby={undefined}>
                    <VisuallyHidden>
                        <DialogTitle></DialogTitle>
                    </VisuallyHidden>
                    <img
                        src={img.props.src}
                        alt={img.props.alt || "Preview"}
                        className="rounded-2xl max-h-[90vh] max-w-[90vw] object-contain"
                    />
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

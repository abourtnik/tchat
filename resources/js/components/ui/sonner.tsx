import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {

  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        unstyled:true,
        classNames: {
          toast: "flex rounded-lg bg-white shadow-lg ring-1 ring-black/20 w-full md:max-w-[364px] items-center p-4 gap-3",
          description: "mt-1 text-sm text-red-500",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-medium",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

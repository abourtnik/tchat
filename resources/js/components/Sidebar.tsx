import {Sidebar as SidebarComponent, SidebarContent, SidebarHeader, SidebarTrigger} from "@/components/ui/sidebar"
import {Users} from "@/components/Users";

export function Sidebar() {
    return (
        <SidebarComponent collapsible={'offcanvas'} >
            <SidebarHeader className={'border-b h-16 bg-primary text-white flex flex-row items-center justify-between px-4'}>
                <h1 className={'text-xl'}>{window.APP.name}</h1>
                <SidebarTrigger/>
            </SidebarHeader>
            <SidebarContent>
                <Users/>
            </SidebarContent>
        </SidebarComponent>
    )
}

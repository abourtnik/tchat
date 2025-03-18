import {User} from "@/components/User";
import {useUsers} from "@/hooks/useUsers";

export function Users () {

    const { users} = useUsers();

    return (
        <div className={'flex-1'}>
            {
                users.map(user => <User key={user.id} user={user}/>)
            }
        </div>
    )
}

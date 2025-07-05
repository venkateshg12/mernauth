import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteSessions } from "../lib/api"
import { SESSION } from "./useSession";

const useDeleteSession = ({ sessionId }: { sessionId: string }) => {
    const queryClient = useQueryClient();
    const { mutate, ...rest } = useMutation({
        mutationFn: () => deleteSessions({id : sessionId}),
        onSuccess : () =>{
            queryClient.setQueryData([SESSION], (cache: Array<{ _id: string }> = []) =>
                cache.filter((session: { _id: string }) => session._id !== sessionId)
            )
        }
        
    })
    return { deleteSession: mutate, ...rest };
}
export default useDeleteSession;
import { useQuery } from "@tanstack/react-query"
import { getSession } from "../lib/api"

type Session = {
  _id: string;
  createdAt: string;
  userAgent: string;
  isCurrent: boolean;
}

export const SESSION = "sessions"
const useSession = (opts = {}) => {
    const { data: sessions = [], ...rest } = useQuery<Session[], Error>({
        queryKey: [SESSION],
        queryFn: async () => {
            const response = await getSession();
            return response; 
        },
        ...opts
    })
    return {
        sessions, ...rest
    }
}
export default useSession;
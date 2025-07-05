import Spinner, { SessionCard } from "../constants/constant";
import useSession from "../hooks/useSession";

const Settings = () => {
  const { sessions, isError, isPending, isSuccess } = useSession();
  console.log(sessions);
  
  return (
    <div className="max-w-4xl mx-auto mt-16 px-4">
      <h2 className="text-3xl font-bold mb-6">My Sessions</h2>

      {isPending && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}

      {isError && (
        <p className="text-red-500">Failed to get sessions.</p>
      )}

      {isSuccess && (
        <div className="flex flex-col gap-4">
          {Array.isArray(sessions) && sessions.map((session: any) => (
            <SessionCard key={session._id} session={session} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Settings;
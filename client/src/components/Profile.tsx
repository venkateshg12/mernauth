import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  console.log(user);
  if (!user) return null;
const { email, verified, createdAt } = user

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center pt-24 px-4">
      <h1 className="text-4xl font-bold text-white mb-6">My Account</h1>

      {!verified && (
        <div className="flex items-center bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 w-full max-w-md rounded-md">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8.257 3.099c.765-1.36 2.723-1.36 3.488 0l5.45 9.688c.75 1.334-.213 2.975-1.744 2.975H4.55c-1.53 0-2.494-1.641-1.744-2.975L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-7a1 1 0 00-.993.883L9 7v4a1 1 0 001.993.117L11 11V7a1 1 0 00-1-1z" />
          </svg>
          <p>Please verify your email</p>
        </div>
      )}

      <div className="bg-gray-900 shadow-lg rounded-lg p-6 w-full max-w-md">
        <div className="mb-4">
          <span className="text-gray-400">Email:</span>
          <p className="text-white font-medium">{email}</p>
        </div>
        <div>
          <span className="text-gray-400">Member since:</span>
          <p className="text-white font-medium">
            {new Date(createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
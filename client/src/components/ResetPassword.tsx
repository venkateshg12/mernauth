import { useSearchParams, Link } from "react-router-dom";
import { ResetPasswordForm } from "../constants/constant";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const exp = Number(searchParams.get("exp"));
  const now = Date.now();
  const linkIsValid = code && exp && exp > now;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 text-center">
        {linkIsValid ? (
          <ResetPasswordForm code={code} />
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md w-fit text-sm">
              ❌ Invalid Link
            </div>
            <p className="text-gray-500 text-sm">
              The link is either invalid or expired.
            </p>
            <Link
              to="/password/forgot"
              replace
              className="text-blue-600 hover:underline text-sm"
            >
              Request a new password reset link
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
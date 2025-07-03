import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { verifyEmail } from "../lib/api";

const VerifyEmail = () => {
  const { code } = useParams();
  const isValidCode = typeof code === "string" && code.length > 0;
  const { isPending, isSuccess, isError } = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => verifyEmail(code as string),
    enabled : isValidCode,
  });

  return (
    <div className="min-h-screen flex justify-center mt-12">
      <div className="max-w-md w-full px-6 py-12 text-center">
        {isPending ? (
          <div className="text-lg font-medium animate-pulse">Loading...</div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div
              className={`px-6 py-3 rounded-lg text-sm font-medium border w-fit ${
                isSuccess
                  ? "bg-green-100 text-green-800 border-green-300"
                  : "bg-red-100 text-red-800 border-red-300"
              }`}
            >
              {isSuccess ? "✅ Email Verified!" : "❌ Invalid Link"}
            </div>

            {isError && (
              <p className="text-gray-500 text-sm">
                The link is either invalid or expired.{" "}
                <Link
                  to="/password/reset"
                  replace
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Get a new link
                </Link>
              </p>
            )}

            <Link
              to="/"
              replace
              className="text-blue-600 underline hover:text-blue-800 text-sm"
            >
              Back to home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
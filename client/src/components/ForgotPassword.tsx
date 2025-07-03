import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "../lib/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");

  const {
    mutate: sendPasswordReset,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: sendPasswordResetEmail,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Reset your password</h2>

        {isError && (
          <div className="text-red-600 text-sm text-center mb-4">
            {error.message || "An error occurred"}
          </div>
        )}

        {isSuccess ? (
          <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-md text-sm text-center mb-4">
            ✅ Email sent! Check your inbox for further instructions.
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendPasswordReset({ email });
            }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col text-left">
              <label htmlFor="email" className="mb-1 font-medium text-sm">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                required
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className={`w-full px-4 py-2 text-white font-semibold rounded-md transition-colors duration-300 bg-blue-600 hover:bg-blue-700 cursor-pointer`}
            >
              {isPending ? "Sending..." : "Reset Password"}
            </button>
          </form>
        )}

        <p className="text-sm text-gray-600 text-center mt-6">
          Go back to{" "}
          <Link to="/login" replace className="text-blue-600 hover:underline">
            Sign in
          </Link>{" "}
          or{" "}
          <Link to="/register" replace className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
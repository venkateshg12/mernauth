import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../lib/api";
import Spinner from "../constants/constant";

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const { mutate: signIn, isPending, isError } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate('/', { replace: true })
    }
  })
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {isPending && (
          <>
            <Spinner />
          </>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signIn({ email, password });
          }}
          className="bg-white p-8 rounded-xl shadow-lg w-[100%] max-w-lg flex flex-col gap-4"
        >
          <h2 className="text-2xl font-bold text-center">Login</h2>
          {isError && (
            <>
              <div className="text-center text-red-600">
                <span>Invalid email or password</span>
              </div>
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                signIn({ email, password });
              }
            }}
          />
          <div className="text-end">
            <Link to="/password/forgot">
              <a href="" className="blue hover:underline text-blue-800 cursor-pointer">Forgot Password?</a>
            </Link>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 cursor-pointer text-lg font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
          >
            Login
          </button>
          <div className="flex gap-2 justify-center">
            <span>Don't have an account ?</span>{" "}
            <Link to="/signup">
              <a href="" className="text-blue-700 hover:underline">Sign Up</a>
            </Link>
          </div>
        </form>
      </div>
    </div >
  )
}

export default SignIn;

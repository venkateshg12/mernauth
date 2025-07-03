
const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;


export const RightTick = () => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 32 32">
        <linearGradient id="ONeHyQPNLkwGmj04dE6Soa_2Tv2g4T4Wtu0_gr1" x1="16" x2="16" y1="2.888" y2="29.012" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#36eb69"></stop><stop offset="1" stop-color="#1bbd49"></stop></linearGradient><circle cx="16" cy="16" r="13" fill="url(#ONeHyQPNLkwGmj04dE6Soa_2Tv2g4T4Wtu0_gr1)"></circle><linearGradient id="ONeHyQPNLkwGmj04dE6Sob_2Tv2g4T4Wtu0_gr2" x1="16" x2="16" y1="3" y2="29" gradientUnits="userSpaceOnUse"><stop offset="0" stop-opacity=".02"></stop><stop offset="1" stop-opacity=".15"></stop></linearGradient><path fill="url(#ONeHyQPNLkwGmj04dE6Sob_2Tv2g4T4Wtu0_gr2)" d="M16,3.25c7.03,0,12.75,5.72,12.75,12.75 S23.03,28.75,16,28.75S3.25,23.03,3.25,16S8.97,3.25,16,3.25 M16,3C8.82,3,3,8.82,3,16s5.82,13,13,13s13-5.82,13-13S23.18,3,16,3 L16,3z"></path><g opacity=".2"><linearGradient id="ONeHyQPNLkwGmj04dE6Soc_2Tv2g4T4Wtu0_gr3" x1="16.502" x2="16.502" y1="11.26" y2="20.743" gradientUnits="userSpaceOnUse"><stop offset="0" stop-opacity=".1"></stop><stop offset="1" stop-opacity=".7"></stop></linearGradient><path fill="url(#ONeHyQPNLkwGmj04dE6Soc_2Tv2g4T4Wtu0_gr3)" d="M21.929,11.26 c-0.35,0-0.679,0.136-0.927,0.384L15,17.646l-2.998-2.998c-0.248-0.248-0.577-0.384-0.927-0.384c-0.35,0-0.679,0.136-0.927,0.384 c-0.248,0.248-0.384,0.577-0.384,0.927c0,0.35,0.136,0.679,0.384,0.927l3.809,3.809c0.279,0.279,0.649,0.432,1.043,0.432 c0.394,0,0.764-0.153,1.043-0.432l6.813-6.813c0.248-0.248,0.384-0.577,0.384-0.927c0-0.35-0.136-0.679-0.384-0.927 C22.608,11.396,22.279,11.26,21.929,11.26L21.929,11.26z"></path></g><path fill="#fff" d="M10.325,14.825L10.325,14.825c0.414-0.414,1.086-0.414,1.5,0L15,18l6.179-6.179	c0.414-0.414,1.086-0.414,1.5,0l0,0c0.414,0.414,0.414,1.086,0,1.5l-6.813,6.813c-0.478,0.478-1.254,0.478-1.732,0l-3.809-3.809	C9.911,15.911,9.911,15.239,10.325,14.825z"></path>
      </svg>
    </>
  )
}

export const WrongTick = () => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="48" height="48">
        <path d="M0 0 C4.82093698 3.2110094 7.61791502 7.87047239 9.12890625 13.41796875 C10.3213022 21.11669914 8.40867024 26.99242777 4.12890625 33.41796875 C-0.54095245 38.21071847 -6.07466718 40.54505126 -12.68359375 40.91796875 C-19.58489258 40.69670573 -25.39943158 37.82625496 -30.30859375 33.04296875 C-34.23038885 26.45435298 -36.09812565 21.13565537 -34.87109375 13.41796875 C-32.21079175 5.78739058 -28.75208534 1.54870923 -21.68359375 -2.33203125 C-13.93805157 -5.34977495 -7.09301064 -3.96276181 0 0 Z M-18.87109375 11.41796875 C-19.20327567 14.42056392 -19.20327567 14.42056392 -17.37109375 16.10546875 C-16.87609375 16.53859375 -16.38109375 16.97171875 -15.87109375 17.41796875 C-17.07490823 19.91158446 -18.32538097 22.09939958 -19.87109375 24.41796875 C-16.86849858 24.75015067 -16.86849858 24.75015067 -15.18359375 22.91796875 C-14.75046875 22.42296875 -14.31734375 21.92796875 -13.87109375 21.41796875 C-11.37747804 22.62178323 -9.18966292 23.87225597 -6.87109375 25.41796875 C-6.53891183 22.41537358 -6.53891183 22.41537358 -8.37109375 20.73046875 C-8.86609375 20.29734375 -9.36109375 19.86421875 -9.87109375 19.41796875 C-8.66727927 16.92435304 -7.41680653 14.73653792 -5.87109375 12.41796875 C-8.87368892 12.08578683 -8.87368892 12.08578683 -10.55859375 13.91796875 C-11.20828125 14.66046875 -11.20828125 14.66046875 -11.87109375 15.41796875 C-14.36470946 14.21415427 -16.55252458 12.96368153 -18.87109375 11.41796875 Z " fill="#F95151" transform="translate(36.87109375,5.58203125)" />
      </svg>
    </>
  )
}

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { resetPassword } from "../lib/api";

export const ResetPasswordForm = ({ code }:{code : string}) => {
  const [password, setPassword] = useState("");

  const {
    mutate: resetUserPassword,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: resetPassword,
  });

  return (
    <>
      <h2 className="text-3xl font-bold mb-6 text-center">Change your password</h2>

      <div className="bg-white rounded-lg shadow-md p-6">
        {isError && (
          <div className="text-red-600 text-sm mb-3 text-center">
            {error.message || "An error occurred"}
          </div>
        )}

        {isSuccess ? (
          <div className="flex flex-col items-center gap-3">
            <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-md text-sm w-full text-center">
              ✅ Password updated successfully!
            </div>
            <Link to="/login" replace className="text-blue-600 hover:underline text-sm">
              Sign in
            </Link>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              resetUserPassword({
                password,
                verificationCode: code,
              });
            }}
            className="flex flex-col gap-4"
          >
            <div className="text-left">
              <label htmlFor="password" className="text-sm font-medium mb-1 block">
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isPending || password.length < 6}
              className={`w-full px-4 py-2 font-semibold text-white rounded-md transition-colors duration-300 ${
                password.length < 6 || isPending
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isPending ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </>
  );
};
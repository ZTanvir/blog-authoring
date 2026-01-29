import { useState } from "react";
import useSWRMutation from "swr/mutation";
import authServices from "../services/authServices";
import { BiError } from "react-icons/bi";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { trigger, isMutating, error } = useSWRMutation(
    "api/auth/author/login",
    authServices.loginUser,
  );

  const handleLoginForm = async (event) => {
    event.preventDefault();
    const formData = {
      email,
      password,
    };
    try {
      const apiResponse = await trigger(formData);
      console.log(apiResponse);
      if (apiResponse) {
      }
    } catch (err) {
      console.error(err, error);
    }
  };

  const allErrors = error?.response?.data?.errors;

  return (
    <div className="mx-auto mt-20 max-w-3xl rounded-xl shadow-md">
      <h3 className="text-center text-4xl font-bold text-neutral-700">
        Author Panel
      </h3>
      <p className="mt-4 text-center">Sign in your access the dashboard</p>
      {allErrors && (
        <div className="my-4 px-8">
          <div className="rounded border-l-2 border-l-red-600 bg-red-100 px-4 py-2">
            {allErrors.map((err) => (
              <p
                className="flex items-center gap-2 text-red-600"
                key={err.path}
              >
                <span className="text-red-400">
                  <BiError />
                </span>
                {err.msg}
              </p>
            ))}
          </div>
        </div>
      )}
      <form onSubmit={handleLoginForm} className="flex flex-col gap-4 p-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            className="rounded border border-gray-300 bg-gray-50 p-2 outline-sky-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            placeholder="example@gmail.com"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            className="rounded border border-gray-300 bg-gray-50 p-2 outline-sky-300"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            id="password"
            placeholder="password"
          />
        </div>

        <button
          disabled={isMutating}
          className="mt-8 rounded bg-sky-600 p-3 text-white duration-300 hover:cursor-pointer hover:bg-sky-500 disabled:bg-sky-500 disabled:hover:cursor-not-allowed"
          type="submit"
        >
          Sign in
        </button>
        <p className="text-center text-sm text-neutral-700">
          Author access only. Regular users should use the main site login.
        </p>

        <p className="text-center">
          <span className="text-sky-600">
            <a href="/register">Return to main site</a>
          </span>
        </p>
      </form>
    </div>
  );
};
export default LoginPage;

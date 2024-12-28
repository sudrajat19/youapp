import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login() {
  const [data, setData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      push("/profile");
    }
  }, [push]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const login = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/login`,
        data
      );
      console.log(login);
      if (login) {
        const { accessToken, refreshToken } = login.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        push("/profile");
      }
    } catch (error) {
      console.error("Login failed:", error.login?.data || error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <>
      <div className="h-screen pt-[100px] bg-gradient-to-r from-regal-black via-regal-dark to-regal-gray">
        <div className="mx-auto w-96">
          <h1 className="text-white text-2xl ml-[18px] mb-[25px]">Login</h1>
          <form
            onSubmit={handleLogin}
            className="text-white grid gap-[15px] w-96 mx-auto"
          >
            <input
              type="text"
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
              className="h-[51px] rounded-lg p-2 bg-regal-gray"
              required
            />

            <div className="flex justify-between items-center h-[51px] rounded-lg p-2 bg-regal-gray">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
                className="bg-regal-gray w-full"
                required
              />
              <img
                onClick={toggleShowPassword}
                src="/images/eyes.png"
                alt="Toggle password visibility"
                className="w-5 h-[17px] cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg mt-[10px] h-12 text-lg text-white bg-multi-color-button"
            >
              Login
            </button>

            <p className="text-white text-center">
              No account?{" "}
              <a href="/register" className="text-gold-300 hover:underline">
                Register here
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

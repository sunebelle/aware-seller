import React, { useState } from "react";
import { useDispatch } from "react-redux";
import api from "../../axios";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { authActions } from "../../store/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const login = async (formData) => {
    try {
      const { data } = await api.post("/user/login", formData, {
        withCredentials: true,
        credentials: "include",
      });
      dispatch(authActions.auth(data));
    } catch (error) {
      console.log(error);
      //   setError(error?.response?.data?.message);
    }
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      login({ email, password });
    }
  };
  return (
    <div className="w-screen relative h-screen grid items-center login_bg justify-center ">
      <div className="absolute top-8 left-8">
        <img className="w-full h-full" src="/img/logo.svg" alt="logo" />
      </div>
      <div className="login_container">
        <form onSubmit={handleLogin} className="p-8 w-full">
          <h2 className=" text-center Montserrat pt-1 pb-2 font-bold text-[28px] leading-[1.29rem] text-[#ffa15f]">
            Log in
          </h2>
          {/* <p
            className={`${
              error ? "opacity-100" : "opacity-0"
            } m-0 p-0 Montserrat text-[#f63f45] text-xs  font-medium text-center`}
          >
            {error ? error : "Something went wrong"}
          </p> */}
          <Input
            type="email"
            name="email"
            label="email"
            placeholder="email@sample.com"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            name="password"
            label="password"
            placeholder="Enter password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
          <div className="my-10">
            <Button
              type="submit"
              btnDisabled={!email || !password}
              label="Log in"
            />
          </div>

          <p className=" text-center Montserrat text-xs text-[#ffffff] font-semibold">
            Forgot password
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import { MyButton, MyInput } from "../themed";
import { Controller, useForm } from "react-hook-form";
import { Palette } from "../../themes";
import { useAuth } from "../../context";
import { IUser } from "../../models";

interface authDTO {
  username: string;
  password: string;
}
interface props {
  switchView: (view: string) => void;
}
function Login({ switchView }: props) {
  const { setUser } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<authDTO>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleLogin = (data: authDTO) => {
    const loggedinuser: IUser = {
      username: data.username,
    };
    setUser(loggedinuser);
  };

  return (
    <div className="p-4 ">
      <div className="flex flex-col items-center gap-2 text-white">
        <span className="text-5xl font-semibold">Welcome back !</span>
        <span className="text-2xl font-medium">Log in to your account</span>
      </div>

      <div className="flex flex-col items-center pt-8">
        <div
          className={`  flex flex-col items-center w-full p-4 bg-[${Palette.background}] `}
        >
          <Controller
            control={control}
            rules={{
              required: "Username can't be empty.",
            }}
            render={({ field: { onChange, value } }) => (
              <MyInput
                placeholder="Username"
                onChange={onChange}
                value={value}
              />
            )}
            name="username"
          />
          <div className="w-full h-[1px] bg-[#00000050]"></div>
          <Controller
            control={control}
            rules={{
              required: "Password can't be empty.",
            }}
            render={({ field: { onChange, value } }) => (
              <MyInput
                placeholder="Password"
                onChange={onChange}
                value={value}
              />
            )}
            name="password"
          />
        </div>
        <MyButton label="Login" onClick={handleSubmit(handleLogin)} />
        <span
          className={`text-lg font-medium pt-2  hover:cursor-pointer text-[#F3A952] `}
        >
          Forget Password
        </span>

        <div className="flex justify-between w-full pt-4">
          <span className={`text-lg font-normal pt-2 text-white `}>
            Don't have an account?
          </span>
          <span
            className={`text-lg font-medium pt-2 hover:cursor-pointer text-[#F3A952] `}
            onClick={() => switchView("register")}
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;

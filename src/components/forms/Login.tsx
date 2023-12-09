import React from "react";
import { MyButton, MyInput } from "../themed";
import { Controller, useForm } from "react-hook-form";
import { Palette } from "../../themes";

interface authDTO {
  email: string;
  password: string;
}
interface props {
  switchView: (view: string) => void;
  joinRoom: (user: any, room: any) => Promise<void>;
}
function Login({ switchView, joinRoom }: props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<authDTO>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = (data: authDTO) => {
    joinRoom(data.email, "12345");
  };

  return (
    <div className="p-4">
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
              required: "Email can't be empty.",
            }}
            render={({ field: { onChange, value } }) => (
              <MyInput placeholder="Email" onChange={onChange} value={value} />
            )}
            name="email"
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

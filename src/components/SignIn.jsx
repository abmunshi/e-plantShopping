import { useForm } from "react-hook-form";
import { signIn } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { Button, Input } from "@heroui/react";
import { DividerWithTextHr } from "./Utls";
import FormInput from "./auth/FormInput";
import toast from "react-hot-toast";
const SignIn = ({ authState }) => {
  const { handleSubmit, control } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(signIn({ email: data.email, password: data.password }));
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action="#"
        className="mx-auto max-w-[24rem] text-left"
      >
        <div className="mb-6">
          <FormInput
            name="email"
            control={control}
            placeholder="Your Email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            }}
          />
        </div>
        <div className="mb-1">
          <FormInput
            name="password"
            control={control}
            placeholder="Password"
            type="password"
            rules={{
              required: "Password is required",
            }}
          />
        </div>
        <div className="text-right mb-6">
          <a href="#" className="text-black text-base font-medium">
            Forgot password
          </a>
        </div>
        <Button
          type="submit"
          fullWidth
          className="gap-2 rounded-lg font-semibold "
          isLoading={authState.loading == "pending" ? true : false}
        >
          sign in
        </Button>

        <div className="my-10">
          <DividerWithTextHr text="Or continue with" />
        </div>

        <Button
          fullWidth
          className="mt-6 flex w-full items-center justify-center gap-2"
        >
          <img
            src={`https://www.material-tailwind.com/logos/logo-google.png`}
            alt="google"
            className="h-6 w-6"
          />{" "}
          sign in with google
        </Button>
      </form>
    </div>
  );
};

export default SignIn;

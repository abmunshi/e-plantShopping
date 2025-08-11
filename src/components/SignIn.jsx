import { useForm } from "react-hook-form";
import { signIn } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { Button, Input } from "@heroui/react";
import { DividerWithTextHr } from "./Utls";
const SignIn = ({ authState }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          dispatch(signIn({ email: data.email, password: data.password }));
        })}
        action="#"
        className="mx-auto max-w-[24rem] text-left"
      >
        <div className="mb-6">
          <Input type="email" placeholder="Email" {...register("email")} />
        </div>
        <div className="mb-1">
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
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

import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { signIn } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spinner, Input, Typography } from "@material-tailwind/react";
import { DividerWithTextHr } from "../components/Utls";
const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate("/");
    }
  }, [authState.isAuthenticated, navigate]);

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
          <Input
            type="email"
            size="lg"
            placeholder="Email"
            {...register("email")}
            className="border-2 border-gray-400 focus:border-primary focus:ring-0 rounded-lg"
          />
        </div>
        <div className="mb-1">
          <Input
            type="password"
            size="lg"
            placeholder="Password"
            {...register("password")}
            className="border-2 border-gray-400 focus:border-primary focus:ring-0 rounded-lg"
          />
        </div>
        <div className="text-right mb-6">
          <Typography className="text-black text-base font-medium">
            Forgot password
          </Typography>
        </div>
        <Button
          type="submit"
          size="lg"
          isFullWidth
          className="gap-2 rounded-lg font-semibold "
        >
          {authState.loading === "pending" && <Spinner className="h-4 w-4" />}
          sign in
        </Button>

        <div className="my-10">
          <DividerWithTextHr text="Or continue with" />
        </div>

        <Button className="mt-6 flex w-full items-center justify-center gap-2">
          <img
            src={`https://www.material-tailwind.com/logos/logo-google.png`}
            alt="google"
            className="h-6 w-6"
          />{" "}
          sign in with google
        </Button>

        <Typography className="text-center mt-6">
          Not Signup yet?{" "}
          <a href="/auth/signup" className="font-medium text-gray-900">
            Sign Up
          </a>
        </Typography>
      </form>
    </div>
  );
};

export default SignIn;

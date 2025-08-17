import { Input, Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signUp } from "../redux/slices/authSlice";
const SignUp = ({ authState }) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  return (
    <div>
      <form
        action=""
        onSubmit={handleSubmit((data) => {
          dispatch(
            signUp({
              username: data.username,
              email: data.email,
              password: data.password,
            })
          );
        })}
      >
        <div className="mb-6">
          <Input placeholder="Username" {...register("username")} />
        </div>
        <div className="mb-6">
          <Input type="email" placeholder="Your Email" {...register("email")} />
        </div>
        <div className="mb-6">
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </div>
        <div className="mb-6">
          <Input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
        </div>
        <Button
          fullWidth
          type="submit"
          isLoading={authState.loading === "pending" ? true : false}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUp;

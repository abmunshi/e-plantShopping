import { Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signUp } from "../redux/slices/authSlice";
import FormInput from "./auth/FormInput";
const SignUp = ({ authState }) => {
  const { handleSubmit, watch, control } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(
      signUp({
        username: data.username,
        email: data.email,
        password: data.password,
      })
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <FormInput
            name="username"
            control={control}
            placeholder="Username"
            type="text"
            rules={{
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters long",
              },
            }}
          />
        </div>
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
        <div className="mb-6">
          <FormInput
            name="password"
            control={control}
            placeholder="Password"
            type="password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            }}
          />
        </div>
        <div className="mb-6">
          <FormInput
            name="confirmPassword"
            control={control}
            placeholder="Confirm Password"
            type="password"
            rules={{
              required: "Confirm Password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            }}
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

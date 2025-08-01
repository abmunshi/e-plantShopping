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
              fullName: data.fullName,
              email: data.email,
              password: data.password,
            })
          );
        })}
      >
        <div className="mb-6">
          <Input
            type="text"
            size="lg"
            placeholder="Your Full Name"
            {...register("fullName")}
            className="border-2 border-gray-400 focus:border-primary focus:ring-0 rounded-lg"
          />
        </div>
        <div className="mb-6">
          <Input
            type="email"
            size="lg"
            placeholder="Your Email"
            {...register("email")}
            className="border-2 border-gray-400 focus:border-primary focus:ring-0 rounded-lg"
          />
        </div>
        <div className="mb-6">
          <Input
            type="password"
            size="lg"
            placeholder="Password"
            {...register("password")}
            className="border-2 border-gray-400 focus:border-primary focus:ring-0 rounded-lg"
          />
        </div>
        <div className="mb-6">
          <Input
            type="password"
            size="lg"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            className="border-2 border-gray-400 focus:border-primary focus:ring-0 rounded-lg"
          />
        </div>
        <Button fullWidth type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUp;

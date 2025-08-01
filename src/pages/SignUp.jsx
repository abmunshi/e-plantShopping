import { useEffect } from "react";
import { Input, Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../redux/slices/authSlice";
import { useNavigate } from "react-router";
const SignUp = () => {
  const { register, handleSubmit } = useForm();
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
        <Button isFullWidth size="lg" type="submit" className="rounded-lg">
          Sign Up
        </Button>

        <a href="/auth/signin">Back to Sign In</a>
      </form>
    </div>
  );
};

export default SignUp;

import { Controller } from "react-hook-form";
import { Input } from "@heroui/react";

const FormInput = ({ name, control, rules, placeholder, type = "text" }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <>
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            variant="bordered"
            radius="none"
            size="lg"
            classNames={{
              inputWrapper: "shadow-none",
            }}
          />
          {fieldState.error && (
            <span className="text-danger text-sm">
              {fieldState.error.message}
            </span>
          )}
        </>
      )}
    />
  );
};

export default FormInput;

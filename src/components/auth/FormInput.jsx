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
          <Input {...field} type={type} placeholder={placeholder} />
          {fieldState.error && (
            <span className="text-red-500 text-sm">
              {fieldState.error.message}
            </span>
          )}
        </>
      )}
    />
  );
};

export default FormInput;

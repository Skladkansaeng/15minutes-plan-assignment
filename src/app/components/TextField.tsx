import { Control, Controller, FieldValues } from "react-hook-form";

const TextField = ({
  label,
  controlName,
  type,
  control,
  required
}: {
  label: string;
  controlName: string;
  type: string;
  control: Control<FieldValues, any>;
  required?: boolean;
}) => {
  return (
    <Controller
      name={controlName}
      control={control}
      defaultValue={""}
      render={({ field, formState }) => (
        <div className="flex gap-2 flex-col">
          <label>{label}</label>
          <input
            {...field}
            className="border  px-4 p-1 rounded-lg required:border-red-500"
            type={type}
          />
          {formState.errors[controlName] && (
            <div className="text-red-500 text-sm">
              {(formState?.errors[controlName] as any)?.message}
            </div>
          )}
        </div>
      )}
      rules={{ required }}
    />
  );
};

export default TextField;

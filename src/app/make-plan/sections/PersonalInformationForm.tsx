"use client";

import TextField from "@/app/components/TextField";
import { useForm, useFieldArray } from "react-hook-form";
import Image from "next/image";
import axios from "axios";

const PersonalInformationForm = ({
  setPersonalInfo
}: {
  setPersonalInfo: (val: any) => void;
}) => {
  const { control, watch, setValue, handleSubmit } = useForm();
  const activityValue = watch("activity");

  const { fields, append, remove } = useFieldArray({
    name: "weeklyActivity",
    control: control
  });

  return (
    <form
      onSubmit={handleSubmit((e) => {
        setPersonalInfo(e);
      })}
    >
      <TextField
        controlName="planName"
        label="Plan Name"
        control={control}
        type={"text"}
        required
      />
      <TextField
        controlName="dateOfBirth"
        label="Date Of Birth"
        control={control}
        type={"date"}
        required
      />
      <TextField
        controlName="height"
        label="Height"
        control={control}
        type={"number"}
        required
      />
      <TextField
        controlName="weight"
        label="Weight"
        control={control}
        type={"number"}
        required
      />

      <div className="flex flex-row gap-2 mt-6 w-full">
        <div className="w-full">
          <TextField
            controlName="activity"
            label="Activity"
            control={control}
            type={"text"}
          />
        </div>

        <button
          type="button"
          className="border rounded-lg p-2 w-fit hover:bg-gray-100"
          onClick={() => {
            if (activityValue) {
              append({ weeklyActivity: activityValue });
              setValue("activity", "");
            }
          }}
        >
          + Weekly activities
        </button>
      </div>
      {fields.map((value: any, idx) => (
        <div key={value.id} className="flex gap-10 justify-between mt-4">
          <div>{value?.weeklyActivity}</div>
          <button type="button" onClick={() => remove(idx)}>
            <Image
              className="hover:opacity-50"
              src={"/bin-icon.svg"}
              alt={"Bin Icon"}
              width={25}
              height={25}
            />
          </button>
        </div>
      ))}

      <button
        type="submit"
        className="border rounded-lg p-2 w-fit hover:bg-gray-100 mt-2"
      >
        Next
      </button>
    </form>
  );
};

export default PersonalInformationForm;

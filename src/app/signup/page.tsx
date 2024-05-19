"use client";

import { SignupFormSchema, SignUpSchemaType } from "../libs/definitions";
import TextField from "../components/TextField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import AppBar from "../components/AppBar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(SignupFormSchema)
  });
  const router = useRouter();

  useEffect(() => {
    document.title = "Sign Up";
  }, []);

  const createUser = async (signUpBody: SignUpSchemaType) => {
    const { data } = await axios.post("/signup/api", signUpBody);
    router.push("/login");
  };
  return (
    <>
      <AppBar />
      <main className="container">
        <div
          className="flex flex-col items-center justify-center"
          style={{ height: "calc(100vh - 64px)" }}
        >
          <div>Register</div>
          <form
            onSubmit={handleSubmit((e) => {
              createUser(e as SignUpSchemaType);
            })}
          >
            <div className="flex gap-4 flex-col">
              <TextField
                controlName="email"
                type="text"
                label="Email"
                control={control}
              />
              <TextField
                controlName="password"
                type="password"
                label="Password"
                control={control}
              />

              <TextField
                controlName="confirmPassword"
                type="password"
                label="Confirm Password"
                control={control}
              />
              <div className="flex gap-1 flex-col justify-center align-center">
                <button
                  className="bg-sky-300 rounded-lg p-2 hover:bg-opacity-50 "
                  type="submit"
                >
                  Register
                </button>
                <a href="/login" className="text-center">
                  Sign In
                </a>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

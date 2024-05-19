"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignInSchema, SignInSchemaType } from "../libs/definitions";
import TextField from "../components/TextField";
import axios from "axios";
import { useRouter } from "next/navigation";
import AppBar from "../components/AppBar";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(SignInSchema)
  });

  const login = async (loginBody: SignInSchemaType) => {
    const { data } = await axios.post("/login/api", loginBody);
    if (data.success) {
      router.push("/make-plan");
    }
  };
  useEffect(() => {
    document.title = "Sign In";
  }, []);
  return (
    <>
      <AppBar />
      <main className="container ">
        <div
          className="flex flex-col items-center justify-center "
          style={{ height: "calc(100vh - 64px)" }}
        >
          <div>Login</div>
          <form
            onSubmit={handleSubmit((e) => {
              login(e as SignInSchemaType);
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
              <div className="flex gap-1 flex-col justify-center align-center">
                <button
                  className="bg-sky-300 rounded-lg p-2 hover:bg-opacity-50 "
                  type="submit"
                >
                  Login
                </button>
                <a href="/signup" className="text-center">
                  Create your account
                </a>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

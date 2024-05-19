"use client";

import axios from "axios";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const logout = async () => {
    try {
      await axios.get("/logout/api");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    logout();
  }, [logout]);

  return <></>;
}

"use client";

import AppBar from "@/app/components/AppBar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function View({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const fetchPlan = async () => {
    const { data } = await axios.get(`/view/${params.id}/api`);
    setWorkoutPlan(JSON.parse(data?.plan?.plan || "[]"));
    console.log("🚀 ~ fetchPlan ~ data:", data)
  };
  useEffect(() => {
    fetchPlan();
  }, []);
  useEffect(() => {
    document.title = "Plan";
  }, []);
  return (
    <>
      <AppBar />
      <main className="container max-w-screen-lg m-auto py-5 overflow-scroll">
        <div>
          <div className="whitespace-pre">{workoutPlan.join("\n")}</div>
          <div className="flex gap-2">
            <button
              className="bg-sky-300 rounded-lg p-2 hover:bg-opacity-50"
              onClick={async () => {
                router.push("/");
              }}
            >
              Back
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

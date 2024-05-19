"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AppBar from "./components/AppBar";

export default function Home() {
  const router = useRouter();
  const [plans, setPlans] = useState([]);
  const fetchPlan = async () => {
    const { data } = await axios.get("/api");
    setPlans(data.plans);
  };
  useEffect(() => {
    fetchPlan();
  }, []);

  useEffect(() => {
    document.title = "HomePage";
  }, []);

  return (
    <>
      <AppBar />
      <main
        className="flex flex-col items-center justify-between p-24 overflow-scroll"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <div className="container mx-auto pt-8">
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => router.push("/make-plan")}
            >
              Generate Workout Plan
            </button>
          </div>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light text-surface text-black">
                    <thead className="border-b border-gray-400 font-medium ">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          Plan Name
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {plans.map((plan: any) => (
                        <>
                          <tr className="border-b border-gray-400 ">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {JSON.parse(plan?.personalInfo).planName}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 gap-2 flex">
                              <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => {
                                  router.push(`/view/${plan._id}`);
                                }}
                              >
                                View
                              </button>
                              <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={async () => {
                                  await axios.delete(`/view/${plan._id}/api`);
                                  fetchPlan();
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

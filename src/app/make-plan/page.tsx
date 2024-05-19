"use client";

import PersonalInformationForm from "./sections/PersonalInformationForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import AppBar from "../components/AppBar";


export default function MakePlan() {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [workoutGolds, setWorkoutGolds] = useState([]);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const fetchWorkoutGold = async (regenerate?: boolean) => {
    if (personalInfo) {
      const { data } = await axios.post("/make-plan/api", {
        ...(personalInfo as any),
        regenerate
      });
      setWorkoutGolds(data?.results);
    }
  };
  useEffect(() => {
    fetchWorkoutGold();
  }, [personalInfo]);

  useEffect(() => {
    document.title = "Make Plan";
  }, []);

  return (
    <>
      <AppBar />
      <main className={`container max-w-screen-lg m-auto py-5`}>
        <div>
          {personalInfo === null && (
            <PersonalInformationForm setPersonalInfo={setPersonalInfo} />
          )}
          {(loading ||
            (personalInfo !== null &&
              workoutPlan.length === 0 &&
              workoutGolds?.length === 0)) && <div>Processing...</div>}
          {!loading && workoutPlan.length === 0 && workoutGolds?.length > 0 && (
            <div className="flex flex-col gap-2">
              <label>Select Workout Goals</label>
              <div className="flex gap-2 flex-row">
                {workoutGolds?.map((goal) => (
                  <button
                    className={`border rounded-lg p-2 w-fit hover:bg-gray-100 ${
                      selectedGoals.includes(goal) && "bg-gray-100"
                    }`}
                    key={goal}
                    onClick={() => {
                      if (selectedGoals.includes(goal))
                        setSelectedGoals(
                          selectedGoals.filter((_goal) => _goal !== goal)
                        );
                      else setSelectedGoals([...selectedGoals, goal]);
                    }}
                  >
                    {goal}
                  </button>
                ))}
              </div>
              <div>
                <button
                  className="border rounded-lg p-2 w-fit hover:bg-gray-100"
                  onClick={async () => {
                    setLoading(true);

                    const { data } = await axios.post("/make-plan/workout", {
                      ...(personalInfo || {}),
                      goals: workoutGolds
                    });
                    setLoading(false);

                    setWorkoutPlan(data.results);
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {!loading && workoutPlan.length > 0 && (
            <div>
              <div className="whitespace-pre">{workoutPlan.join("\n")}</div>
              <div className="flex gap-2">
                <button
                  className="border rounded-lg p-2 w-fit hover:bg-gray-100"
                  onClick={async () => {
                    setLoading(true);
                    const { data } = await axios.post("/make-plan/workout", {
                      ...(personalInfo || {}),
                      goals: workoutGolds,
                      regenerate: true
                    });
                    setLoading(false);

                    setWorkoutPlan(data.results);
                  }}
                >
                  Regenerate
                </button>
                <button
                  className="bg-sky-300 rounded-lg p-2 hover:bg-opacity-50"
                  onClick={async () => {
                    await axios.post("/make-plan/save", {
                      workoutPlan,
                      personalInfo
                    });
                    router.push("/");
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

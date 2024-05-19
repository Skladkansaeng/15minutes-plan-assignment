import mongoose from "mongoose";

export interface PersonalInfo {
    planName: string
    dateOfBirth: string
    height: number
    weight: number
    activity: string
    weeklyActivity: any[]
  }
  

const workoutPlanSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "Please provide a userId"]
    },
    plan: {
        type: String,
        required: [true, "Please provide a plan"]
    },
    personalInfo: {
        type: String,
        required: [true, "Please provide a personalInfo"]
    }
});

const Plan = mongoose.models.plans || mongoose.model("plans", workoutPlanSchema);


export default Plan;
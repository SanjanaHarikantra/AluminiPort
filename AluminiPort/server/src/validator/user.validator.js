import { z } from "zod";

const userSchema = z.object({
  fullName: z
    .string({ required_error: "Full name is required" })
    .min(3, "Full name must be at least 3 characters"),

  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format"),

  branch: z
    .string({ required_error: "Branch is required" })
    .min(2, "Branch must be at least 2 characters"),

  yearOfPassing: z
    .number({ required_error: "Year of passing is required" })
    .int("Year must be an integer")
    .min(2000, "Year must be no earlier than 2000")
    .max(new Date().getFullYear(), "Year can't be in the future"),

  currentCompany: z
    .string({ required_error: "Company name is required" })
    .min(2, "Company name must be at least 2 characters"),

  phoneNumber: z
  .string()
  .regex(/^(\d{10})?$/, "Phone number must be 10 digits")
  .optional(),

  linkedinProfile: z
    .string()
    .url("Invalid LinkedIn URL")
    .optional(),
});

export default userSchema;

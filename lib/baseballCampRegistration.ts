import { z } from "zod";

export const baseballCampRegistrationSchema = z.object({
  firstName: z.string().min(1, "First name required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name required"),
  address: z.string().min(1, "Address required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Phone required"),
  gender: z.enum(["male", "female"], { error: "Select gender" }),
  birthdate: z.string().min(1, "Birthdate required"),
  grade: z.enum(["4", "5", "6", "7", "8", "9", "10", "11", "12"], { error: "Select grade" }),
  school: z.string().min(1, "School required"),
  medicalNotes: z.string().optional(),
  emergencyName: z.string().min(1, "Emergency contact name required"),
  emergencyPhone: z.string().min(10, "Emergency phone required"),
  guardianName: z.string().min(1, "Guardian name required"),
  guardianCell: z.string().min(10, "Guardian cell required"),
  guardianHomePhone: z.string().optional(),
  shirtSize: z.enum(["youth-s", "youth-m", "youth-l", "adult-s", "adult-m", "adult-l", "adult-xl", "adult-2xl"], {
    error: "Select a shirt size",
  }),
  transportMethod: z.string().min(1, "Transportation details required"),
  authorizedPickup: z.string().optional(),
  additionalInfo: z.string().optional(),
  insuranceCarrier: z.string().min(1, "Insurance carrier and policy number required"),
  medicalConditions: z.string().optional(),
  emergencyConsent: z.literal(true, {
    error: "You must agree to emergency treatment consent",
  }),
  parentRelease: z.literal(true, {
    error: "You must agree to the parent/guardian release",
  }),
  guardianSignature: z.string().min(1, "Signature required"),
  signatureDate: z.string().min(1, "Signature date required"),
});

export type BaseballCampRegistrationData = z.infer<typeof baseballCampRegistrationSchema>;

export const shirtSizes = [
  { value: "youth-s", label: "Youth S" },
  { value: "youth-m", label: "Youth M" },
  { value: "youth-l", label: "Youth L" },
  { value: "adult-s", label: "Adult S" },
  { value: "adult-m", label: "Adult M" },
  { value: "adult-l", label: "Adult L" },
  { value: "adult-xl", label: "Adult XL" },
  { value: "adult-2xl", label: "Adult 2XL" },
] as const;

export const campWaiverText =
  "By checking yes below, I understand the nature of camp activities, certify that the camper is able to participate, and grant permission for participation. On behalf of myself, my child, and our heirs or assigns, I release and hold harmless Trinity Church, 1Died4All, Nansemond River High School, Suffolk Public Schools, and their trustees, officers, agents, and employees from liability, damages, and claims arising from or related to my child's participation in this program.";

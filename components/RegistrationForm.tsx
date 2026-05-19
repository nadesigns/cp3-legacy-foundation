"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const registrationSchema = z.object({
  // Attendee
  firstName: z.string().min(1, "First name required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name required"),
  address: z.string().min(1, "Address required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Phone required"),
  gender: z.enum(["male", "female"]).refine((v) => v !== undefined, { message: "Select gender" }),
  birthdate: z.string().min(1, "Birthdate required"),
  grade: z.enum(["4","5","6","7","8","9","10","11","12"]).refine((v) => v !== undefined, { message: "Select grade" }),
  school: z.string().min(1, "School required"),
  medicalNotes: z.string().optional(),

  // Emergency contact
  emergencyName: z.string().min(1, "Emergency contact name required"),
  emergencyPhone: z.string().min(10, "Emergency phone required"),
  guardianName: z.string().min(1, "Guardian name required"),
  guardianCell: z.string().min(10, "Guardian cell required"),
  guardianHomePhone: z.string().optional(),

  // Shirt size
  shirtSize: z.enum(["youth-s","youth-m","youth-l","adult-s","adult-m","adult-l","adult-xl","adult-2xl"]).refine((v) => v !== undefined, { message: "Select a shirt size" }),

  // Transportation
  transportMethod: z.string().min(1, "Select transportation method"),
  authorizedPickup: z.string().optional(),
  additionalInfo: z.string().optional(),

  // Medical
  insuranceCarrier: z.string().min(1, "Insurance carrier required"),
  medicalConditions: z.string().optional(),
  emergencyConsent: z.literal(true).refine((v) => v === true, { message: "You must agree to emergency treatment consent" }),

  // Release
  parentRelease: z.literal(true).refine((v) => v === true, { message: "You must agree to the parent/guardian release" }),
  guardianSignature: z.string().min(1, "Signature required"),
  signatureDate: z.string(),
});

type RegistrationData = z.infer<typeof registrationSchema>;

const shirtSizes = [
  { value: "youth-s", label: "Youth S" },
  { value: "youth-m", label: "Youth M" },
  { value: "youth-l", label: "Youth L" },
  { value: "adult-s", label: "Adult S" },
  { value: "adult-m", label: "Adult M" },
  { value: "adult-l", label: "Adult L" },
  { value: "adult-xl", label: "Adult XL" },
  { value: "adult-2xl", label: "Adult 2XL" },
];

const fieldCls =
  "w-full px-4 py-3 rounded-lg border border-gray-light bg-white font-body text-sm text-navy placeholder-gray-mid focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition";

const labelCls = "block font-ui text-sm font-semibold text-navy mb-1.5";
const errorCls = "mt-1 font-ui text-xs text-red-accent";

const waiverText = `In consideration of my child's participation in the 1Died4All Baseball Camp hosted by the CP3 Family Legacy Foundation, I hereby release, discharge, and covenant not to sue the CP3 Family Legacy Foundation, its officers, directors, employees, volunteers, agents, and representatives from any and all liability, claims, demands, actions, or causes of action whatsoever arising out of or related to any loss, damage, or injury, including death, that may be sustained by my child while participating in this camp. I acknowledge that participation involves physical activity and potential risk of injury. I have read this release and understand its terms.`;

export default function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { signatureDate: today },
  });

  const onSubmit = async (data: RegistrationData) => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or call 757-535-9539.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 px-4">
        <div className="w-12 h-1 bg-gold mx-auto mb-6" />
        <h2 className="font-heading text-3xl text-navy uppercase tracking-wide mb-4">
          Registration Submitted!
        </h2>
        <p className="font-body text-gray-mid text-lg mb-6">
          Thank you for registering for the 1Died4All Baseball Camp. You will receive a confirmation
          email shortly.
        </p>
        <div className="bg-navy rounded-xl p-6 text-left">
          <p className="font-heading text-gold uppercase tracking-widest text-sm mb-3">Camp Details</p>
          <p className="font-body text-white/80 text-sm">📅 June 16–18, 2026 · 9:00AM – 2:00PM</p>
          <p className="font-body text-white/80 text-sm mt-1">📍 Nansemond River High School</p>
          <p className="font-body text-white/80 text-sm mt-1">3301 Nansemond Parkway, Suffolk, VA 23434</p>
          <p className="font-body text-white/80 text-sm mt-3">Questions? Call: 757-535-9539</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto space-y-10 py-8 px-4">
      {/* Section: Attendee */}
      <section>
        <h3 className="font-heading text-xl text-navy uppercase tracking-widest border-b-2 border-gold pb-2 mb-6">
          Attendee Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className={labelCls}>First Name *</label>
            <input {...register("firstName")} className={fieldCls} placeholder="First" />
            {errors.firstName && <p className={errorCls}>{errors.firstName.message}</p>}
          </div>
          <div>
            <label className={labelCls}>Middle Name</label>
            <input {...register("middleName")} className={fieldCls} placeholder="Middle" />
          </div>
          <div>
            <label className={labelCls}>Last Name *</label>
            <input {...register("lastName")} className={fieldCls} placeholder="Last" />
            {errors.lastName && <p className={errorCls}>{errors.lastName.message}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className={labelCls}>Address *</label>
            <input {...register("address")} className={fieldCls} placeholder="Street address" />
            {errors.address && <p className={errorCls}>{errors.address.message}</p>}
          </div>
          <div>
            <label className={labelCls}>Email *</label>
            <input {...register("email")} type="email" className={fieldCls} placeholder="email@example.com" />
            {errors.email && <p className={errorCls}>{errors.email.message}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className={labelCls}>Phone *</label>
            <input {...register("phone")} type="tel" className={fieldCls} placeholder="(757) 000-0000" />
            {errors.phone && <p className={errorCls}>{errors.phone.message}</p>}
          </div>
          <div>
            <label className={labelCls}>Gender *</label>
            <select {...register("gender")} className={fieldCls}>
              <option value="">Select…</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <p className={errorCls}>{errors.gender.message}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className={labelCls}>Birthdate *</label>
            <input {...register("birthdate")} type="date" className={fieldCls} />
            {errors.birthdate && <p className={errorCls}>{errors.birthdate.message}</p>}
          </div>
          <div>
            <label className={labelCls}>Grade *</label>
            <select {...register("grade")} className={fieldCls}>
              <option value="">Grade…</option>
              {["4","5","6","7","8","9","10","11","12"].map((g) => (
                <option key={g} value={g}>{g}th</option>
              ))}
            </select>
            {errors.grade && <p className={errorCls}>{errors.grade.message}</p>}
          </div>
          <div>
            <label className={labelCls}>School *</label>
            <input {...register("school")} className={fieldCls} placeholder="School name" />
            {errors.school && <p className={errorCls}>{errors.school.message}</p>}
          </div>
        </div>
        <div>
          <label className={labelCls}>Medical Notes</label>
          <textarea {...register("medicalNotes")} className={fieldCls} rows={3} placeholder="Any medical information the camp directors should know…" />
        </div>
      </section>

      {/* Section: Emergency Contact */}
      <section>
        <h3 className="font-heading text-xl text-navy uppercase tracking-widest border-b-2 border-gold pb-2 mb-6">
          Emergency Contact
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className={labelCls}>Emergency Contact Name *</label>
            <input {...register("emergencyName")} className={fieldCls} placeholder="Full name" />
            {errors.emergencyName && <p className={errorCls}>{errors.emergencyName.message}</p>}
          </div>
          <div>
            <label className={labelCls}>Emergency Contact Phone *</label>
            <input {...register("emergencyPhone")} type="tel" className={fieldCls} placeholder="(757) 000-0000" />
            {errors.emergencyPhone && <p className={errorCls}>{errors.emergencyPhone.message}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>Primary Guardian Name *</label>
            <input {...register("guardianName")} className={fieldCls} placeholder="Full name" />
            {errors.guardianName && <p className={errorCls}>{errors.guardianName.message}</p>}
          </div>
          <div>
            <label className={labelCls}>Guardian Cell *</label>
            <input {...register("guardianCell")} type="tel" className={fieldCls} placeholder="(757) 000-0000" />
            {errors.guardianCell && <p className={errorCls}>{errors.guardianCell.message}</p>}
          </div>
          <div>
            <label className={labelCls}>Guardian Home Phone</label>
            <input {...register("guardianHomePhone")} type="tel" className={fieldCls} placeholder="(757) 000-0000" />
          </div>
        </div>
      </section>

      {/* Section: T-Shirt Size */}
      <section>
        <h3 className="font-heading text-xl text-navy uppercase tracking-widest border-b-2 border-gold pb-2 mb-6">
          T-Shirt Size
        </h3>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {shirtSizes.map((s) => (
            <label key={s.value} className="flex flex-col items-center cursor-pointer">
              <input {...register("shirtSize")} type="radio" value={s.value} className="sr-only peer" />
              <span className="w-full text-center py-2.5 px-1 border-2 border-gray-light rounded-lg text-xs font-heading font-bold text-gray-mid peer-checked:border-gold peer-checked:bg-gold peer-checked:text-navy hover:border-gold/50 transition-all cursor-pointer select-none">
                {s.label}
              </span>
            </label>
          ))}
        </div>
        {errors.shirtSize && <p className={errorCls}>{errors.shirtSize.message}</p>}
      </section>

      {/* Section: Transportation */}
      <section>
        <h3 className="font-heading text-xl text-navy uppercase tracking-widest border-b-2 border-gold pb-2 mb-6">
          Transportation & Release
        </h3>
        <div className="mb-4">
          <label className={labelCls}>Transportation Method *</label>
          <div className="flex gap-4 flex-wrap">
            {["Parent drop-off", "Bus", "Other"].map((method) => (
              <label key={method} className="flex items-center gap-2 cursor-pointer">
                <input
                  {...register("transportMethod")}
                  type="radio"
                  value={method}
                  className="accent-gold w-4 h-4"
                />
                <span className="font-body text-sm text-navy">{method}</span>
              </label>
            ))}
          </div>
          {errors.transportMethod && <p className={errorCls}>{errors.transportMethod.message}</p>}
        </div>
        <div className="mb-4">
          <label className={labelCls}>Authorized Pickup Persons (name + phone)</label>
          <textarea
            {...register("authorizedPickup")}
            className={fieldCls}
            rows={2}
            placeholder="Name: Jane Doe, Phone: (757) 555-0000"
          />
        </div>
        <div>
          <label className={labelCls}>Additional Information</label>
          <textarea
            {...register("additionalInfo")}
            className={fieldCls}
            rows={2}
            placeholder="Orders of protection, special instructions, etc."
          />
        </div>
      </section>

      {/* Section: Medical */}
      <section>
        <h3 className="font-heading text-xl text-navy uppercase tracking-widest border-b-2 border-gold pb-2 mb-6">
          Medical Information
        </h3>
        <div className="mb-4">
          <label className={labelCls}>Medical Insurance Carrier & Policy # *</label>
          <input
            {...register("insuranceCarrier")}
            className={fieldCls}
            placeholder="Carrier name and policy number"
          />
          {errors.insuranceCarrier && <p className={errorCls}>{errors.insuranceCarrier.message}</p>}
        </div>
        <div className="mb-6">
          <label className={labelCls}>Medical Conditions / History</label>
          <textarea
            {...register("medicalConditions")}
            className={fieldCls}
            rows={3}
            placeholder="List any conditions or history requiring special attention…"
          />
        </div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            {...register("emergencyConsent")}
            type="checkbox"
            className="mt-0.5 w-5 h-5 accent-gold shrink-0"
          />
          <span className="font-body text-sm text-navy leading-relaxed">
            I authorize emergency medical treatment for my child if necessary, and I agree to be responsible for any related medical costs.
          </span>
        </label>
        {errors.emergencyConsent && <p className={errorCls}>{errors.emergencyConsent.message}</p>}
      </section>

      {/* Section: Parent Release */}
      <section>
        <h3 className="font-heading text-xl text-navy uppercase tracking-widest border-b-2 border-gold pb-2 mb-6">
          Parent / Guardian Release
        </h3>
        <div className="bg-cream border border-gray-light rounded-lg p-5 mb-5 max-h-40 overflow-y-auto">
          <p className="font-body text-sm text-gray-mid leading-relaxed">{waiverText}</p>
        </div>
        <label className="flex items-start gap-3 cursor-pointer mb-6">
          <input
            {...register("parentRelease")}
            type="checkbox"
            className="mt-0.5 w-5 h-5 accent-gold shrink-0"
          />
          <span className="font-body text-sm text-navy leading-relaxed">
            I have read and agree to the above Parent/Guardian Release.
          </span>
        </label>
        {errors.parentRelease && <p className={errorCls}>{errors.parentRelease.message}</p>}

        <p className="font-body text-xs text-gray-mid mb-5">
          <strong>Photo Release:</strong> By submitting this form, you grant the CP3 Family Legacy Foundation permission to use photographs and/or video of your child taken during camp activities for promotional and educational purposes.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Guardian Signature (typed name) *</label>
            <input
              {...register("guardianSignature")}
              className={fieldCls}
              placeholder="Type full name to sign"
            />
            {errors.guardianSignature && <p className={errorCls}>{errors.guardianSignature.message}</p>}
          </div>
          <div>
            <label className={labelCls}>Date</label>
            <input
              {...register("signatureDate")}
              type="date"
              className={`${fieldCls} bg-gray-light/50 cursor-not-allowed`}
              readOnly
            />
          </div>
        </div>
      </section>

      {/* Submit */}
      {error && (
        <p className="text-center font-ui text-sm text-red-accent bg-red-accent/10 rounded-lg p-3">
          {error}
        </p>
      )}
      <div className="text-center pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="px-12 py-4 bg-gold hover:bg-gold-light disabled:opacity-60 text-navy font-heading font-bold uppercase tracking-widest text-lg rounded-xl transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
        >
          {submitting ? "Submitting…" : "Submit Registration"}
        </button>
      </div>
    </form>
  );
}

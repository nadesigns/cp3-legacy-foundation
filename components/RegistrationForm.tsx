"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  baseballCampRegistrationSchema,
  type BaseballCampRegistrationData,
  campWaiverText,
  shirtSizes,
} from "@/lib/baseballCampRegistration";

const fieldCls =
  "w-full px-4 py-3 rounded-lg border border-gray-light bg-white font-body text-sm text-navy placeholder-gray-mid focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition";

const labelCls = "block font-ui text-sm font-semibold text-navy mb-1.5";
const errorCls = "mt-1 font-ui text-xs text-red-accent";

export default function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BaseballCampRegistrationData>({
    resolver: zodResolver(baseballCampRegistrationSchema),
    defaultValues: { signatureDate: today },
  });

  const onSubmit = async (data: BaseballCampRegistrationData) => {
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
      <div className="max-w-2xl mx-auto px-4 py-12 text-center sm:py-16">
        <div className="w-12 h-1 bg-gold mx-auto mb-6" />
        <h2 className="font-heading text-3xl text-navy uppercase tracking-wide mb-4">
          Registration Submitted!
        </h2>
        <p className="font-body text-gray-mid text-lg mb-6">
          Thank you for registering for the 1Died4All Baseball Camp. The camp team has received your
          information.
        </p>
        <div className="rounded-xl bg-navy p-5 text-left sm:p-6">
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
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-3xl space-y-8 px-3 py-6 sm:space-y-10 sm:px-4 sm:py-8">
      <div className="rounded-[1.75rem] border border-gold/20 bg-gold/8 p-4 sm:p-5">
        <p className="font-ui text-xs font-semibold uppercase tracking-[0.24em] text-gold mb-2">
          Printable Option
        </p>
        <p className="font-body text-sm leading-relaxed text-navy/72">
          Prefer the paper version? You can also use the official camp registration PDF.
        </p>
        <a
          href="/baseball-camp-registration.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 font-ui text-sm font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4"
        >
          Open the registration PDF
        </a>
      </div>

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
          <textarea
            {...register("medicalNotes")}
            className={fieldCls}
            rows={3}
            placeholder="Any medical notes the camp directors should know"
          />
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
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-8">
          {shirtSizes.map((s) => (
            <label key={s.value} className="flex flex-col items-center cursor-pointer">
              <input {...register("shirtSize")} type="radio" value={s.value} className="sr-only peer" />
              <span className="w-full rounded-lg border-2 border-gray-light px-1 py-2.5 text-center text-xs font-heading font-bold text-gray-mid transition-all cursor-pointer select-none peer-checked:border-gold peer-checked:bg-gold peer-checked:text-navy hover:border-gold/50">
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
          <label className={labelCls}>How will your camper be transported to and from camp? *</label>
          <input
            {...register("transportMethod")}
            className={fieldCls}
            placeholder="Parent drop-off and pickup, church van, carpool, etc."
          />
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
        <p className="font-body text-sm leading-relaxed text-gray-mid mb-4">
          By registering, you certify that your child has been medically cleared for camp activity and has active medical insurance coverage.
        </p>
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
          <label className={labelCls}>Medical Conditions / History / Treatment Protocol</label>
          <textarea
            {...register("medicalConditions")}
            className={fieldCls}
            rows={3}
            placeholder="List any allergies, asthma, diabetes, epilepsy, medication, inhaler, EpiPen, insulin, or other treatment protocol"
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
        <div className="mb-5 max-h-40 overflow-y-auto rounded-lg border border-gray-light bg-cream p-4 sm:p-5">
          <p className="font-body text-sm text-gray-mid leading-relaxed">{campWaiverText}</p>
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
      <div className="pt-4 text-center">
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-gold px-8 py-4 text-base font-heading font-bold uppercase tracking-[0.16em] text-navy transition-all duration-200 hover:bg-gold-light hover:scale-105 disabled:opacity-60 disabled:hover:scale-100 sm:w-auto sm:px-12 sm:text-lg"
        >
          {submitting ? "Submitting…" : "Submit Registration"}
        </button>
      </div>
    </form>
  );
}

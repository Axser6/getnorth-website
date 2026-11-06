"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import {
  budgetOptions,
  emptyEnquiry,
  enquirySummary,
  industryOptions,
  serviceOptions,
  timelineOptions,
  validateEnquiry,
  validateField,
  type EnquiryErrors,
  type EnquiryState,
  type EnquiryValues,
} from "@/lib/enquiry";
import { site, telHref, whatsappHref } from "@/lib/site";
import { cn } from "@/lib/cn";
import { buttonClass } from "@/components/ui";
import { Alert, ArrowRight, Check, Phone, Plus, WhatsApp } from "@/components/icons";
import { submitEnquiry } from "./actions";

const initialState: EnquiryState = { status: "idle" };

const LABELS: Record<keyof EnquiryValues, string> = {
  name: "Full name",
  company: "Company",
  email: "Email address",
  phone: "Phone / WhatsApp number",
  service: "Service required",
  industry: "Industry",
  budget: "Budget",
  timeline: "Timeline",
  message: "Project requirements",
  consent: "Consent",
};

const OPTIONAL_KEYS: (keyof EnquiryValues)[] = ["company", "industry", "budget", "timeline"];

const HELP: Partial<Record<keyof EnquiryValues, string>> = {
  phone: "We'll call or WhatsApp you on this number. Include the country code if you're outside India.",
  message: "Tell us what you want to achieve, any deadlines, and what isn't working today.",
};

const fieldBase =
  "mt-2 block w-full rounded-xl border bg-white px-4 py-3.5 text-[1rem] text-ink placeholder:text-ink/35 transition-colors focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal";

export function EnquiryForm() {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);
  const [values, setValues] = useState<EnquiryValues>(emptyEnquiry);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [startedAt, setStartedAt] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  // Pre-select service/industry from links such as /contact?service=ai-automation
  // and record when the form was opened (spam protection).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");
    const industry = params.get("industry");
    /* eslint-disable react-hooks/set-state-in-effect -- one-time sync from the URL after hydration */
    setStartedAt(String(Date.now()));
    if (industry && industryOptions.some((o) => o.value === industry)) setMoreOpen(true);
    setValues((v) => ({
      ...v,
      service: service && serviceOptions.some((o) => o.value === service) ? service : v.service,
      industry: industry && industryOptions.some((o) => o.value === industry) ? industry : v.industry,
    }));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Merge server-side validation errors and move focus to the result message.
  const [seenState, setSeenState] = useState(state);
  if (state !== seenState) {
    setSeenState(state);
    if (state.status === "invalid" && state.errors) {
      setErrors(state.errors);
      setShowSummary(Object.keys(state.errors).length > 1);
    }
  }
  useEffect(() => {
    if (state.status === "idle" || !statusRef.current) return;
    statusRef.current.focus({ preventScroll: true });
    statusRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [state]);

  const update = <K extends keyof EnquiryValues>(key: K, value: EnquiryValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: validateField(key, value) }));
  };
  const blur = (key: keyof EnquiryValues) => {
    const err = validateField(key, values[key] as never);
    setErrors((e) => ({ ...e, [key]: err }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateEnquiry(values);
    setErrors(found);
    const keys = Object.keys(found);
    if (keys.some((k) => OPTIONAL_KEYS.includes(k as keyof EnquiryValues))) setMoreOpen(true);
    if (keys.length > 1) {
      setShowSummary(true);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setShowSummary(false);
    if (keys.length === 1) {
      formRef.current?.querySelector<HTMLElement>(`[name="${keys[0]}"]`)?.focus();
      return;
    }
    const fd = new FormData(e.currentTarget);
    startTransition(() => formAction(fd));
  };

  const whatsappEnquiry = whatsappHref(`Hello GetNorth, I'd like to make an enquiry.\n\n${enquirySummary(values)}`);

  if (state.status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-[24px] border border-ink/10 bg-white p-8 sm:p-12 focus:outline-none">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper">
          <Check size={26} />
        </span>
        <h2 className="font-heading mt-8 text-3xl font-extrabold">Thank you — your enquiry has been sent.</h2>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-stone">
          Our team will review your requirements and get back to you. If your project is urgent, you&apos;re welcome
          to message or call us directly.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={whatsappHref("Hello GetNorth, I've just sent an enquiry through your website.")} target="_blank" rel="noopener noreferrer" className={buttonClass("primary")}>
            <WhatsApp size={18} /> WhatsApp us
          </a>
          <a href={telHref} className={buttonClass("outline")}>
            <Phone size={18} /> {site.phone.display}
          </a>
        </div>
      </div>
    );
  }

  const err = (k: keyof EnquiryValues) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-danger">
        <Alert size={15} /> {errors[k]}
      </p>
    ) : null;

  const aria = (k: keyof EnquiryValues) => {
    const ids = [HELP[k] ? `${k}-help` : null, errors[k] ? `${k}-error` : null].filter(Boolean).join(" ");
    return { "aria-invalid": errors[k] ? true : undefined, "aria-describedby": ids || undefined };
  };
  const help = (k: keyof EnquiryValues) =>
    HELP[k] ? (
      <p id={`${k}-help`} className="mt-2 text-sm text-stone">
        {HELP[k]}
      </p>
    ) : null;

  const border = (k: keyof EnquiryValues) => (errors[k] ? "border-danger" : "border-ink/15 hover:border-ink/35");

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      className="rounded-[24px] border border-ink/10 bg-paper-2/60 p-6 sm:p-10"
      aria-labelledby="enquiry-title"
    >
      <h2 id="enquiry-title" className="font-heading text-2xl font-extrabold sm:text-3xl">
        Tell us about your project
      </h2>
      <p className="mt-2 text-stone">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      {showSummary && Object.values(errors).some(Boolean) && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          aria-labelledby="error-summary-title"
          className="mt-6 rounded-2xl border border-danger/40 bg-danger-surface p-5 focus:outline-none focus-visible:outline-2 focus-visible:outline-danger"
        >
          <p id="error-summary-title" className="flex items-center gap-2 font-semibold text-danger">
            <Alert size={20} /> Please fix {Object.values(errors).filter(Boolean).length} fields before sending:
          </p>
          <ul className="mt-3 space-y-1 pl-7">
            {(Object.keys(errors) as (keyof EnquiryValues)[])
              .filter((k) => errors[k])
              .map((k) => (
                <li key={k}>
                  <a
                    href={`#${k === "consent" ? "consent" : k}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (OPTIONAL_KEYS.includes(k)) setMoreOpen(true);
                      requestAnimationFrame(() => {
                        const el = formRef.current?.querySelector<HTMLElement>(`[name="${k}"]`);
                        el?.focus();
                        el?.scrollIntoView({ block: "center", behavior: "smooth" });
                      });
                    }}
                    className="inline-flex min-h-11 items-center text-danger underline underline-offset-4"
                  >
                    {LABELS[k]}: {errors[k]}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      )}

      {(state.status === "unconfigured" || state.status === "failed" || state.status === "invalid") && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className={cn(
            "mt-6 rounded-2xl border p-5 focus:outline-none",
            state.status === "invalid" ? "border-danger/40 bg-danger-surface" : "border-ink/15 bg-white",
          )}
        >
          <p className="flex items-start gap-2.5 font-medium">
            <Alert size={20} className={cn("mt-0.5 shrink-0", state.status === "invalid" ? "text-danger" : "text-signal")} />
            {state.message}
          </p>
          {state.status !== "invalid" && (
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <a href={whatsappEnquiry} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "min-h-11 text-sm")}>
                <WhatsApp size={17} /> Send this enquiry on WhatsApp
              </a>
              <a href={telHref} className={buttonClass("outline", "min-h-11 text-sm")}>
                <Phone size={17} /> Call {site.phone.display}
              </a>
            </div>
          )}
        </div>
      )}

      {/* Spam protection */}
      <input type="hidden" name="startedAt" value={startedAt} />
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold">
            Full name <span aria-hidden="true">*</span>
          </label>
          <input id="name" name="name" type="text" autoComplete="name" required value={values.name}
            onChange={(e) => update("name", e.target.value)} onBlur={() => blur("name")}
            className={cn(fieldBase, border("name"))} {...aria("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold">
            Email address <span aria-hidden="true">*</span>
          </label>
          <input id="email" name="email" type="email" inputMode="email" autoComplete="email" required value={values.email}
            onChange={(e) => update("email", e.target.value)} onBlur={() => blur("email")}
            className={cn(fieldBase, border("email"))} {...aria("email")} />
          {err("email")}
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-semibold">
            Phone / WhatsApp number <span aria-hidden="true">*</span>
          </label>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="+91" value={values.phone}
            onChange={(e) => update("phone", e.target.value)} onBlur={() => blur("phone")}
            className={cn(fieldBase, border("phone"))} {...aria("phone")} />
          {help("phone")}
          {err("phone")}
        </div>
        <div>
          <label htmlFor="service" className="text-sm font-semibold">
            Service required <span aria-hidden="true">*</span>
          </label>
          <select id="service" name="service" required value={values.service}
            onChange={(e) => update("service", e.target.value)} onBlur={() => blur("service")}
            className={cn(fieldBase, border("service"), "appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10")}
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230f1f17' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }}
            {...aria("service")}>
            <option value="">Select a service</option>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          {err("service")}
        </div>



        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-sm font-semibold">
            Project requirements <span aria-hidden="true">*</span>
          </label>
          <textarea id="message" name="message" rows={6} required value={values.message}
            placeholder="e.g. We want more enquiries for our new project and faster replies on WhatsApp."
            onChange={(e) => update("message", e.target.value)} onBlur={() => blur("message")}
            className={cn(fieldBase, border("message"), "resize-y")} {...aria("message")} />
          {help("message")}
          <div className="flex justify-between gap-4">
            {err("message") ?? <span />}
            <span className="mt-2 text-xs text-stone tabular-nums">{values.message.length}/3000</span>
          </div>
        </div>

        {/* Progressive disclosure: optional details stay out of the way (low-friction form) */}
        <details
          open={moreOpen}
          onToggle={(e) => setMoreOpen(e.currentTarget.open)}
          className="group/more rounded-2xl border border-ink/10 bg-white/60 sm:col-span-2"
        >
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 text-sm font-semibold [&::-webkit-details-marker]:hidden">
            <span>
              Add more details <span className="font-normal text-stone">(optional: company, industry, budget, timeline)</span>
            </span>
            <Plus size={18} className="shrink-0 transition-transform duration-(--duration-base) group-open/more:rotate-45" />
          </summary>
          <div className="grid gap-6 border-t border-ink/10 px-5 pt-5 pb-6 sm:grid-cols-2">
            <div>
              <label htmlFor="company" className="text-sm font-semibold">
                Company / organisation
              </label>
              <input id="company" name="company" type="text" autoComplete="organization" value={values.company}
                onChange={(e) => update("company", e.target.value)} onBlur={() => blur("company")}
                className={cn(fieldBase, border("company"))} {...aria("company")} />
              {err("company")}
            </div>
            <div>
              <label htmlFor="industry" className="text-sm font-semibold">
                Industry
              </label>
              <select id="industry" name="industry" value={values.industry}
                onChange={(e) => update("industry", e.target.value)}
                className={cn(fieldBase, border("industry"), "appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10")}
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230f1f17' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }}
                {...aria("industry")}>
                <option value="">Select your industry</option>
                {industryOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              {err("industry")}
            </div>

            <fieldset className="sm:col-span-2">
              <legend className="text-sm font-semibold">Approximate budget</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {budgetOptions.map((b) => (
                  <label key={b} className={cn(
                    "inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 py-2 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-signal",
                    values.budget === b ? "border-ink bg-ink text-paper" : "border-ink/15 bg-white hover:border-ink/40",
                  )}>
                    <input type="radio" name="budget" value={b} checked={values.budget === b}
                      onChange={() => update("budget", b)} className="sr-only" />
                    {b}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="sm:col-span-2">
              <legend className="text-sm font-semibold">Timeline</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {timelineOptions.map((t) => (
                  <label key={t} className={cn(
                    "inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 py-2 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-signal",
                    values.timeline === t ? "border-ink bg-ink text-paper" : "border-ink/15 bg-white hover:border-ink/40",
                  )}>
                    <input type="radio" name="timeline" value={t} checked={values.timeline === t}
                      onChange={() => update("timeline", t)} className="sr-only" />
                    {t}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </details>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 text-[0.95rem] leading-relaxed">
            <input type="checkbox" name="consent" checked={values.consent}
              onChange={(e) => update("consent", e.target.checked)}
              className="mt-0.5 h-6 w-6 shrink-0 cursor-pointer accent-signal" {...aria("consent")} />
            <span>
              I agree that GetNorth may contact me about this enquiry by phone, WhatsApp or email.{" "}
              <a href="/privacy" className="underline underline-offset-4 hover:text-signal-ink">Privacy notice</a>
              <span aria-hidden="true"> *</span>
            </span>
          </label>
          {err("consent")}
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={pending} className={buttonClass("primary", "w-full sm:w-auto")}>
          {pending ? "Sending…" : "Send enquiry"}
          {!pending && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
        </button>
        <p className="text-sm text-stone">
          Prefer to chat?{" "}
          <a href={whatsappEnquiry} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-semibold text-ink underline underline-offset-4">
            Send via WhatsApp
          </a>
        </p>
      </div>
      <p aria-live="polite" className="sr-only">{pending ? "Sending your enquiry" : ""}</p>
    </form>
  );
}

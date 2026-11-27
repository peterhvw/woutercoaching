"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitEnquiry, type EnquiryState } from "./actions";

const initialState: EnquiryState = { status: "idle" };

const inputClass =
  "mt-2 block w-full rounded-xl border border-line bg-surface px-4 py-3 text-base text-ink placeholder:text-muted/70 focus:border-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-600/40 aria-[invalid=true]:border-red-700";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm font-medium text-red-800">
      {message}
    </p>
  );
}

export function EnquiryForm({
  successTitle,
  successText,
  replyTime,
}: {
  successTitle: string;
  successText: string;
  replyTime: string;
}) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="h-fit rounded-2xl border border-sage-600 bg-sage-50 p-8"
      >
        <h2 className="text-2xl">{successTitle}</h2>
        <p className="mt-3 text-lg leading-relaxed">{successText}</p>
        <p className="mt-2 text-muted">Je krijgt {replyTime} een reactie.</p>
      </div>
    );
  }

  const { errors, values } = state;

  return (
    <form action={formAction} noValidate className="space-y-6">
      {state.message && (
        <p role="alert" className="rounded-xl bg-red-50 p-4 font-medium text-red-900">
          {state.message}
        </p>
      )}

      <div>
        <label htmlFor="name" className="font-semibold">
          Naam
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          defaultValue={values?.name}
          aria-invalid={Boolean(errors?.name)}
          aria-describedby={errors?.name ? "name-error" : undefined}
          className={inputClass}
        />
        <FieldError id="name-error" message={errors?.name} />
      </div>

      <div>
        <label htmlFor="email" className="font-semibold">
          E-mailadres
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={values?.email}
          aria-invalid={Boolean(errors?.email)}
          aria-describedby={errors?.email ? "email-error" : undefined}
          className={inputClass}
        />
        <FieldError id="email-error" message={errors?.email} />
      </div>

      <div>
        <label htmlFor="phone" className="font-semibold">
          Telefoonnummer <span className="font-normal text-muted">(optioneel)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          defaultValue={values?.phone}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="message" className="font-semibold">
          Waar loop je tegenaan?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={values?.message}
          aria-invalid={Boolean(errors?.message)}
          aria-describedby={errors?.message ? "message-error" : undefined}
          className={inputClass}
        />
        <FieldError id="message-error" message={errors?.message} />
      </div>

      {/* Honeypot against spam bots; hidden from visitors and screen readers. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-sage-700 px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-sage-800 disabled:opacity-60"
      >
        {pending ? "Bezig met versturen…" : "Verstuur aanvraag"}
      </button>

      <p className="text-sm text-muted">
        Je gegevens worden alleen gebruikt om contact met je op te nemen. Lees de{" "}
        <Link href="/privacyverklaring" className="underline underline-offset-4">
          privacyverklaring
        </Link>
        .
      </p>
    </form>
  );
}

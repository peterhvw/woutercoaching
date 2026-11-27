"use server";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
  values?: { name: string; email: string; phone: string; message: string };
};

type Enquiry = { name: string; email: string; phone: string; message: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Delivers an enquiry to the coach.
 * Not connected yet: at launch this sends an email (planned: Resend).
 * Until then it only works in development, where the enquiry is printed in
 * the terminal. In production it fails loudly, so an enquiry is never
 * confirmed to a visitor while nothing was actually sent.
 */
async function deliverEnquiry(enquiry: Enquiry): Promise<void> {
  if (process.env.NODE_ENV !== "production") {
    console.log("[kennismaking] Nieuwe aanvraag (alleen lokaal gelogd):", enquiry);
    return;
  }
  throw new Error("Enquiry delivery is not configured.");
}

export async function submitEnquiry(
  _previous: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const text = (key: string) => String(formData.get(key) ?? "").trim();

  // Honeypot: real visitors never see or fill this field.
  if (text("website")) return { status: "success" };

  const values: Enquiry = {
    name: text("name"),
    email: text("email"),
    phone: text("phone"),
    message: text("message"),
  };

  const errors: EnquiryState["errors"] = {};
  if (!values.name) errors.name = "Vul je naam in.";
  if (!EMAIL_PATTERN.test(values.email))
    errors.email = "Vul een geldig e-mailadres in.";
  if (values.message.length < 10)
    errors.message = "Vertel in een paar zinnen waar je tegenaan loopt.";
  if (values.message.length > 4000)
    errors.message = "Je bericht is te lang. Kort het in tot 4000 tekens.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  try {
    await deliverEnquiry(values);
  } catch {
    return {
      status: "error",
      message:
        "Het versturen is niet gelukt. Probeer het later opnieuw of neem rechtstreeks contact op.",
      values,
    };
  }

  return { status: "success" };
}

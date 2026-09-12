"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SubmitState = {
  status: "idle" | "success" | "error";
  message: string;
};

export function NewsletterForm() {
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const company = String(formData.get("company") || "").trim();

    setIsSubmitting(true);
    setSubmitState({ status: "idle", message: "" });

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, company }),
      });
      const responseForText = response.clone();
      let data: { message?: string };

      try {
        data = (await response.json()) as { message?: string };
      } catch (error) {
        const rawText = await responseForText
          .text()
          .catch(() => "");

        console.error("Newsletter response was not valid JSON", {
          error,
          status: response.status,
          rawResponseText: rawText,
        });

        throw error;
      }

      if (!response.ok) {
        setSubmitState({
          status: "error",
          message: data.message || "Something went wrong. Please try again.",
        });
        return;
      }

      event.currentTarget.reset();
      setSubmitState({
        status: "success",
        message: data.message || "You're subscribed.",
      });
    } catch {
      setSubmitState({
        status: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 rounded-xl border border-white/10 bg-surface/82 p-4 sm:grid-cols-[1fr_auto]"
    >
      <input
        className="hidden"
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <Input type="email" name="email" required placeholder="you@example.com" />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Subscribing..." : "Subscribe"}
      </Button>
      {submitState.message ? (
        <p
          className={
            submitState.status === "success"
              ? "text-sm font-medium text-primary sm:col-span-2"
              : "text-sm font-medium text-red-300 sm:col-span-2"
          }
          role={submitState.status === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          {submitState.message}
        </p>
      ) : null}
    </form>
  );
}

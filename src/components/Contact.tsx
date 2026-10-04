"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "./Reveal";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in your name, email and message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again or email us directly.");
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-white">
      <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2">
        <Reveal>
          <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-accent-red">
            CONTACT <span className="inline-block h-[2px] w-8 bg-accent-red" />
          </p>
          <h2 className="font-exo mt-3 text-4xl font-bold leading-[1.02] text-ink sm:text-[4.7rem]">
            Let&apos;s build something
            <br />
            <span className="text-primary">remarkable.</span>
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            If you have any questions or want to know more about our services,
            feel free to contact us.
          </p>
          <div className="mt-6 space-y-4 text-sm font-semibold text-ink">
            <p className="flex items-center gap-3">
              <Image
                src="/figma/icon-phone.png"
                alt="Phone"
                width={72}
                height={72}
                className="h-10 w-10"
              />
              +91 83691 23086
            </p>
            <p className="flex items-center gap-3 break-all">
              <Image
                src="/figma/icon-mail.png"
                alt="Email"
                width={72}
                height={72}
                className="h-10 w-10 shrink-0"
              />
              manage.epigrotivegaming@gmail.com
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-line bg-white p-6 shadow-xl shadow-primary/10"
          >
            <h3 className="font-display text-2xl font-extrabold text-ink">
              Get in touch
            </h3>
            <div className="mt-4 space-y-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full rounded-lg border border-line bg-white px-4 py-2.5 text-sm outline-none placeholder:text-muted/70 focus:border-primary"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                type="email"
                className="w-full rounded-lg border border-line bg-white px-4 py-2.5 text-sm outline-none placeholder:text-muted/70 focus:border-primary"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter Message"
                rows={4}
                className="w-full resize-y rounded-lg border border-line bg-white px-4 py-2.5 text-sm outline-none placeholder:text-muted/70 focus:border-primary"
              />
            </div>
            {error && (
              <p className="mt-3 text-xs font-medium text-red-600">{error}</p>
            )}
            {status === "success" && (
              <p className="mt-3 text-xs font-medium text-green-700">
                Thanks — your message was sent. We&apos;ll get back to you
                shortly.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-4 w-full rounded-lg bg-primary py-3 text-xs font-bold tracking-[0.15em] text-white transition hover:bg-primary-dark disabled:opacity-60"
            >
              {status === "sending" ? "SENDING…" : "SEND"}
            </button>
            <p className="mt-3 flex items-center gap-1.5 text-[11px] text-muted">
              <span aria-hidden="true">🔒</span> We respect your privacy. Your
              information is safe with us.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

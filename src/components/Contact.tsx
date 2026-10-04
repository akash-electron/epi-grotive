"use client";

import Image from "next/image";
import { useState } from "react";
import { Box, Layer, T, u } from "./design";
import type { Content } from "@/lib/content/types";

type C = Content["contact"];
const telHref = (p: string) => `tel:${p.replace(/[^\d+]/g, "")}`;
const mailHref = (e: string) => `mailto:${e.replace(/[^\w.+@-]/g, "")}`;

const A = "/figma/contact";

/* Desktop: Figma frame 6:2, section starts at y=6750 (it overlaps the bottom of
   the Portfolio band, so it has no background of its own). Mobile "Contact":
   node 40:3219. */
const Y0 = 6750;
const y = (n: number) => n - Y0;

type Status = "idle" | "sending" | "success" | "error";

/* Shared form logic: validates, posts to /api/contact, reports status. */
function useContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setError("");
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setError("Please fill in your name, email and message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Request failed");
      }
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error && e.message !== "Request failed" ? e.message : "Something went wrong. Please try again or email us directly.");
    }
  }

  return { name, setName, email, setEmail, message, setMessage, website, setWebsite, status, error, onSubmit };
}

/* Replaces the privacy line while a result is showing. */
function FormNote({ status, error, fallback, success }: { status: Status; error: string; fallback: React.ReactNode; success: string }) {
  if (status === "success")
    return <span role="status" className="font-semibold text-[#0a8f4d]">{success}</span>;
  if (status === "error")
    return <span role="alert" className="font-semibold text-[#d93025]">{error}</span>;
  return <>{fallback}</>;
}

function DesktopContact({ d }: { d: C }) {
  const f = useContactForm();
  const field = "absolute border border-[#d3deed] bg-white outline-none transition focus:border-[#006aff]";
  return (
    <div className="relative hidden lg:block" style={{ height: u(836), marginTop: u(-198) }}>
      <Layer src={`${A}/art.svg`} left={1360} top={0} width={560} height={310} />

      <Box left={269} top={y(6877)} width={57} height={2} className="bg-[#ff5349]" />
      <T left={138} top={y(6867)} size={20.053} tracking={2.437} weight={500} color="#fc5d51">
        {d.eyebrow}
      </T>
      <h2>
        <T left={140} top={y(6921)} size={101.43} tracking={-1.041} weight={700} color="#010722" font="exo">
          {d.line1}
        </T>
        <T left={136} top={y(7018)} size={100} tracking={1.1661} weight={700} color="#010723" font="exo">
          {d.line2}
        </T>
        <T left={140} top={y(7120)} size={104.031} tracking={0.4984} weight={700} color="#005bf8" font="exo">
          {d.line3}
        </T>
      </h2>
      <T left={140} top={y(7242)} size={24.847} tracking={-0.4234} weight={400} color="#334262" font="body">
        {d.sub1}
      </T>
      <T left={139} top={y(7275)} size={20.236} tracking={1.6037} weight={400} color="#303f62" font="body">
        {d.sub2}
      </T>

      <Layer src={`${A}/circle.svg`} left={139} top={y(7347)} width={73} height={73} />
      <Layer src={`${A}/circle.svg`} left={139} top={y(7444)} width={73} height={73} />
      <Layer src={`${A}/phone.svg`} left={156} top={y(7367)} width={39} height={36} />
      <Layer src={`${A}/mail.svg`} left={156} top={y(7465)} width={39} height={36} />
      <a href={telHref(d.phone)} className="absolute" style={{ left: u(252), top: u(y(7366)), width: u(260), height: u(46) }} aria-label={`Call ${d.phone}`}>
        <T left={0} top={9} size={26.667} tracking={-0.1022} weight={500} color="#000015" font="exo">
          {d.phone}
        </T>
      </a>
      <a href={mailHref(d.email)} className="absolute" style={{ left: u(253), top: u(y(7470)), width: u(500), height: u(46) }} aria-label={`Email ${d.email}`}>
        <T left={-1} top={7} size={25.554} tracking={0.2335} weight={600} color="#000a34" font="body">
          {d.email}
        </T>
      </a>

      <form onSubmit={f.onSubmit} noValidate className="contents">
        <input
          type="text"
          name="website"
          value={f.website}
          onChange={(e) => f.setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="pointer-events-none absolute -left-[9999px] size-0 opacity-0"
        />
        <Box
          left={954}
          top={y(6847)}
          width={839}
          height={670}
          className="border border-[#e4efff] bg-white"
          style={{ borderRadius: u(22), boxShadow: `0 ${u(8)} ${u(36)} rgba(33,125,255,0.07)` }}
        />
        <T left={1012} top={y(6908)} size={51.317} tracking={-0.3539} weight={700} color="#01011d" font="body">
          {d.formTitle}
        </T>

        <input
          aria-label="Your name"
          value={f.name}
          onChange={(e) => f.setName(e.target.value)}
          placeholder={d.namePlaceholder}
          autoComplete="name"
          className={`${field} ip-ph font-body`}
          style={{ left: u(1009), top: u(y(6986)), width: u(731), height: u(66), borderRadius: u(10), padding: `${u(8)} ${u(19)} 0`, fontSize: u(20.269), letterSpacing: u(-0.322), color: "#01011d" }}
        />
        <input
          aria-label="Your email"
          type="email"
          value={f.email}
          onChange={(e) => f.setEmail(e.target.value)}
          placeholder={d.emailPlaceholder}
          autoComplete="email"
          className={`${field} ip-ph font-body`}
          style={{ left: u(1009), top: u(y(7073)), width: u(731), height: u(66), borderRadius: u(10), padding: `${u(8)} ${u(19)} 0`, fontSize: u(20.976), letterSpacing: u(-0.6815), color: "#01011d" }}
        />
        <textarea
          aria-label="Your message"
          value={f.message}
          onChange={(e) => f.setMessage(e.target.value)}
          placeholder={d.messagePlaceholder}
          className={`${field} ip-ph font-body resize-none`}
          style={{ left: u(1009), top: u(y(7161)), width: u(731), height: u(153), borderRadius: u(10), padding: `${u(22)} ${u(21)} ${u(18)}`, fontSize: u(20.145), letterSpacing: u(-0.18), color: "#01011d" }}
        />
        <Layer src={`${A}/resize.svg`} left={1718} top={y(7301)} width={17} height={11} />

        <button
          type="submit"
          disabled={f.status === "sending"}
          className="font-roboto-condensed absolute text-white transition hover:brightness-90 disabled:opacity-70"
          style={{ left: u(1009), top: u(y(7350)), width: u(731), height: u(73), borderRadius: u(13), backgroundColor: "#006aff", fontSize: u(20.535), letterSpacing: u(5.6049), padding: `${u(8)} 0 0 ${u(4)}` }}
        >
          {f.status === "sending" ? "SENDING…" : d.sendLabel}
        </button>

        <Layer src={`${A}/lock.svg`} left={1008} top={y(7445)} width={22} height={29} />
        <p
          className="font-display absolute whitespace-nowrap font-medium"
          style={{ left: u(1043), top: u(y(7450)), fontSize: u(19.565), letterSpacing: u(-0.1564), color: "#6c7b9e", marginTop: "-0.068em" }}
        >
          <FormNote status={f.status} error={f.error} success={d.successMessage} fallback={d.privacy} />
        </p>
      </form>
    </div>
  );
}

/* ---------- mobile (390px) ---------- */

function MobileContact({ d }: { d: C }) {
  const f = useContactForm();
  const field =
    "w-full rounded-lg border border-[#dce7f4] bg-white pl-[12px] pr-[14px] pb-[24px] pt-[11px] text-[10px] leading-[normal] text-[#12213d] outline-none transition placeholder:text-[#8190a7] focus:border-[#086bfa]";
  return (
    <div className="relative -mt-px flex flex-col gap-8 overflow-hidden bg-[#fbfdff] px-5 pb-[65px] pt-[70px] lg:hidden">
      <div className="pointer-events-none absolute left-[220px] top-[-36.06px] flex size-[308.375px] items-center justify-center" aria-hidden="true">
        <Image src={`${A}/m-watermark.png`} alt="" width={260} height={260} className="size-[260px] -rotate-12 object-contain opacity-[0.04]" />
      </div>

      <div className="relative flex flex-col gap-2">
        <div className="relative top-px flex items-center gap-2">
          <span className="h-[2px] w-6 bg-[#ff5349]" />
          <p className="text-[9px] font-bold uppercase leading-[normal] text-[#ff5349]">{d.eyebrow}</p>
        </div>
        <h2 className="font-barlow relative top-px text-[31px] font-extrabold uppercase text-[#08162f]">
          <span className="block leading-[0.98]">{d.line1} {d.line2}</span>
          <span className="block leading-[0.98] text-[#086bfa]">{d.line3}</span>
        </h2>
        <p className="text-[11px] leading-[1.55] text-[#65728a]">
          {d.sub1} {d.sub2}
        </p>
      </div>

      <div className="relative flex flex-col gap-[14px]">
        {[
          { href: telHref(d.phone), icon: `${A}/m-phone.svg`, text: d.phone },
          { href: mailHref(d.email), icon: `${A}/m-mail.svg`, text: d.email },
        ].map((d) => (
          <a key={d.href} href={d.href} className="flex items-center gap-3">
            <span className="flex size-[38px] shrink-0 items-center justify-center rounded-full border border-[#90b8f9] bg-white">
              <Image src={d.icon} alt="" width={17} height={17} />
            </span>
            <span className="min-w-0 flex-1 text-[11px] font-semibold leading-[normal] text-[#12213d]">{d.text}</span>
          </a>
        ))}
      </div>

      <form
        onSubmit={f.onSubmit}
        noValidate
        className="relative flex flex-col gap-3 rounded-[22px] border border-[#e4efff] bg-white p-[18px] shadow-[0_14px_36px_rgba(10,75,165,0.12)]"
      >
        <input
          type="text"
          name="website"
          value={f.website}
          onChange={(e) => f.setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="pointer-events-none absolute -left-[9999px] size-0 opacity-0"
        />
        <div className="flex flex-col gap-1">
          <p className="font-barlow relative -left-px -top-px whitespace-nowrap text-[27px] font-extrabold leading-[normal] text-[#08162f]">{d.formTitle}</p>
          <p className="relative -left-0.5 -top-px text-[10px] leading-[1.45] text-[#65728a]">{d.formBlurb}</p>
        </div>
        <input aria-label="Your name" value={f.name} onChange={(e) => f.setName(e.target.value)} placeholder={d.namePlaceholder} autoComplete="name" className={`${field} h-[50px]`} />
        <input aria-label="Your email" type="email" value={f.email} onChange={(e) => f.setEmail(e.target.value)} placeholder={d.emailPlaceholder} autoComplete="email" className={`${field} h-[50px]`} />
        <textarea aria-label="Your message" value={f.message} onChange={(e) => f.setMessage(e.target.value)} placeholder={d.messagePlaceholder} className={`${field} h-[110px] resize-none py-3`} />
        <button
          type="submit"
          disabled={f.status === "sending"}
          className="flex h-[48px] w-full items-center justify-center rounded-lg bg-[#086bfa] pr-0.5 text-[10px] font-bold uppercase leading-[normal] text-white transition active:brightness-90 disabled:opacity-70"
        >
          {f.status === "sending" ? "Sending…" : d.sendLabel}
        </button>
        <div className="relative -left-0.5 top-px flex items-center gap-1.5">
          <Image src={`${A}/m-lock.svg`} alt="" width={11} height={11} className="shrink-0" />
          <p className="flex-1 text-[7px] leading-[normal] text-[#65728a]">
            <FormNote status={f.status} error={f.error} success={d.successMessage} fallback={d.privacy} />
          </p>
        </div>
      </form>
    </div>
  );
}

export default function Contact({ data }: { data: C }) {
  return (
    <section id="contact" className="relative">
      <MobileContact d={data} />
      <DesktopContact d={data} />
    </section>
  );
}

import Link from "next/link";
import React from "react";
import type { Article } from "@/types";

export interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  heroIcon: string;
  callout: {
    icon: string;
    title: string;
    description: string;
    variant?: "emerald" | "amber" | "blue";
  };
  articles: Article[];
  contactEmail?: string;
}

export default function LegalPageLayout({
  title,
  lastUpdated,
  heroIcon,
  callout,
  articles,
  contactEmail = "support@freshcart.com",
}: LegalPageLayoutProps) {
  const calloutStyles = {
    emerald: {
      box: "border-emerald-200 bg-emerald-50/70",
      badge: "bg-emerald-600 text-white",
      title: "text-emerald-900",
      text: "text-emerald-950/80",
    },
    amber: {
      box: "border-amber-200 bg-amber-50/60",
      badge: "bg-amber-500 text-white",
      title: "text-amber-900",
      text: "text-amber-950/80",
    },
    blue: {
      box: "border-blue-200 bg-blue-50/70",
      badge: "bg-blue-600 text-white",
      title: "text-blue-900",
      text: "text-blue-950/80",
    },
  };

  const style = calloutStyles[callout.variant || "emerald"];

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      {/* Hero Banner */}
      <section className="bg-linear-to-r from-emerald-600 via-emerald-500 to-green-500 text-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 md:py-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-white/80">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span aria-hidden className="text-white/60">/</span>
            <span aria-current="page" className="text-white font-semibold">
              {title}
            </span>
          </nav>

          {/* Title with icon badge */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm text-white shadow-inner">
              <i className={`fa-solid ${heroIcon} text-2xl`} aria-hidden />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                {title}
              </h1>
              <p className="mt-1 text-sm font-medium text-emerald-100">
                Last updated: {lastUpdated}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="mx-auto w-full max-w-7xl px-4 py-8 md:py-10">
        {/* Intro Callout Box */}
        <div className={`rounded-2xl border p-5 md:p-6 shadow-sm flex items-start gap-4 ${style.box}`}>
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm ${style.badge}`}>
            <i className={`fa-solid ${callout.icon} text-base`} aria-hidden />
          </div>
          <div>
            <h2 className={`text-base font-bold ${style.title}`}>
              {callout.title}
            </h2>
            <p className={`mt-1 text-sm leading-relaxed ${style.text}`}>
              {callout.description}
            </p>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {articles.map((article) => (
            <article
              key={article.id}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <i className={`fa-solid ${article.icon} text-base`} aria-hidden />
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100/60 rounded-md px-2 py-0.5">
                    0{article.id}
                  </span>
                  <h3 className="text-base font-bold text-gray-900">
                    {article.heading}
                  </h3>
                </div>
              </div>

              {article.items && article.items.length > 0 && (
                <ul className="mt-4 flex flex-col gap-2.5 text-sm leading-relaxed text-gray-600">
                  {article.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold select-none">•</span>
                      <span>
                        {item.lead && (
                          <strong className="text-gray-800 mr-1.5">{item.lead}</strong>
                        )}
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {article.customContent && (
                <div className="mt-4">{article.customContent}</div>
              )}
            </article>
          ))}
        </div>

        {/* Contact/Support Footer Box */}
        <div className="mt-10 rounded-2xl bg-linear-to-r from-gray-900 to-gray-800 p-6 md:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-400">
              <i className="fa-solid fa-headset text-xl" aria-hidden />
            </div>
            <div>
              <h3 className="text-lg font-bold">Have questions about this policy?</h3>
              <p className="text-sm text-gray-300">
                Our support team is here to assist you anytime.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contactus"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500 shadow-sm"
            >
              <i className="fa-solid fa-envelope text-xs" aria-hidden />
              Contact Support
            </Link>
            <a
              href={`mailto:${contactEmail}`}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              Email Us
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}


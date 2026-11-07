"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, CheckCircle2 } from "lucide-react";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* ── Top Green Hero Banner (Figma Spec) ── */}
      <section className="w-full bg-[#16A34A] text-white py-10 sm:py-14">
        <div className="w-[92%] lg:w-[80%] mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/80 font-medium mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">Contact Us</span>
          </nav>

          {/* Banner Title & Icon */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shrink-0 shadow-xs">
              <i className="fa-solid fa-headset text-2xl text-white"></i>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                Contact Us
              </h1>
              <p className="text-xs sm:text-sm text-white/90 mt-1 font-medium">
                We&apos;d love to hear from you. Get in touch with our team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content Container ── */}
      <main className="w-[92%] lg:w-[80%] mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ── Left Column (5 Cols): Contact Info Cards & Social Links ── */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* 1. Phone Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#E8F8EE] flex items-center justify-center shrink-0">
                <i className="fa-solid fa-phone text-[#16A34A] text-sm"></i>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#101828]">Phone</h3>
                <p className="text-xs text-[#6A7282] mt-0.5">
                  Mon-Fri from 8am to 6pm
                </p>
                <a
                  href="tel:+18001234567"
                  className="text-xs sm:text-sm font-semibold text-[#16A34A] hover:underline mt-1 block"
                >
                  +1 (800) 123-4567
                </a>
              </div>
            </div>

            {/* 2. Email Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#E8F8EE] flex items-center justify-center shrink-0">
                <i className="fa-solid fa-envelope text-[#16A34A] text-sm"></i>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#101828]">Email</h3>
                <p className="text-xs text-[#6A7282] mt-0.5">
                  We&apos;ll respond within 24 hours
                </p>
                <a
                  href="mailto:support@freshcart.com"
                  className="text-xs sm:text-sm font-semibold text-[#16A34A] hover:underline mt-1 block"
                >
                  support@freshcart.com
                </a>
              </div>
            </div>

            {/* 3. Office Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#E8F8EE] flex items-center justify-center shrink-0">
                <i className="fa-solid fa-location-dot text-[#16A34A] text-sm"></i>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#101828]">Office</h3>
                <address className="text-xs text-[#6A7282] not-italic mt-1 leading-relaxed">
                  123 Commerce Street
                  <br />
                  New York, NY 10001
                  <br />
                  United States
                </address>
              </div>
            </div>

            {/* 4. Business Hours Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#E8F8EE] flex items-center justify-center shrink-0">
                <i className="fa-solid fa-clock text-[#16A34A] text-sm"></i>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#101828]">
                  Business Hours
                </h3>
                <p className="text-xs text-[#6A7282] mt-1 leading-relaxed">
                  Monday - Friday: 8am - 6pm
                  <br />
                  Saturday: 9am - 4pm
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>

            {/* 5. Follow Us Card (Font Awesome Icons) */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
              <h3 className="text-sm font-bold text-[#101828] mb-3">Follow Us</h3>
              <div className="flex items-center gap-3">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-[#F3F4F6] text-[#475467] hover:bg-[#E8F8EE] hover:text-[#16A34A] flex items-center justify-center transition-colors shadow-xs"
                  aria-label="Facebook"
                >
                  <i className="fa-brands fa-facebook-f text-sm"></i>
                </a>

                {/* Twitter / X */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-[#F3F4F6] text-[#475467] hover:bg-[#E8F8EE] hover:text-[#16A34A] flex items-center justify-center transition-colors shadow-xs"
                  aria-label="Twitter"
                >
                  <i className="fa-brands fa-x-twitter text-sm"></i>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-[#F3F4F6] text-[#475467] hover:bg-[#E8F8EE] hover:text-[#16A34A] flex items-center justify-center transition-colors shadow-xs"
                  aria-label="Instagram"
                >
                  <i className="fa-brands fa-instagram text-base"></i>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-[#F3F4F6] text-[#475467] hover:bg-[#E8F8EE] hover:text-[#16A34A] flex items-center justify-center transition-colors shadow-xs"
                  aria-label="LinkedIn"
                >
                  <i className="fa-brands fa-linkedin-in text-sm"></i>
                </a>
              </div>
            </div>
          </div>

          {/* ── Right Column (7 Cols): Send us a Message & Quick Answers ── */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Send Us a Message Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs">
              {/* Header inside card */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-[#E8F8EE] flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-headset text-[#16A34A] text-sm"></i>
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#101828]">
                    Send us a Message
                  </h2>
                  <p className="text-xs text-[#6A7282] mt-0.5">
                    Fill out the form and we&apos;ll get back to you
                  </p>
                </div>
              </div>

              {/* Success Notification */}
              {isSubmitted && (
                <div className="mb-6 p-4 rounded-xl bg-[#DCFCE7] border border-[#86EFAC] text-[#15803D] flex items-start gap-3 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm font-bold">
                      Message sent successfully!
                    </strong>
                    <span className="text-xs">
                      Thank you for contacting us. We will respond within 24 hours.
                    </span>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-semibold text-[#344054] mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-[#101828] placeholder-gray-400 focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20 transition-all bg-white"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-[#344054] mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-[#101828] placeholder-gray-400 focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20 transition-all bg-white"
                    />
                  </div>
                </div>

                {/* Subject Dropdown */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-semibold text-[#344054] mb-1.5"
                  >
                    Subject
                  </label>
                  <div className="relative">
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-[#101828] focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20 transition-all bg-white appearance-none cursor-pointer pr-10"
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Order Support">Order Support</option>
                      <option value="Shipping Question">Shipping Question</option>
                      <option value="Returns & Refunds">Returns & Refunds</option>
                      <option value="Product Information">Product Information</option>
                      <option value="Feedback & Suggestions">Feedback & Suggestions</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold text-[#344054] mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-[#101828] placeholder-gray-400 focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20 transition-all bg-white resize-y"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold text-sm shadow-xs transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    <i className="fa-solid fa-paper-plane text-xs"></i>
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Looking for quick answers? Card (Figma Spec) */}
            <div className="bg-[#F0FDF4] rounded-2xl border border-[#DCFCE7] p-5 sm:p-6 flex items-start gap-4 shadow-xs">
              <div className="w-8 h-8 rounded-full bg-[#16A34A] text-white flex items-center justify-center shrink-0">
                <i className="fa-solid fa-circle-question text-base"></i>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#101828]">
                  Looking for quick answers?
                </h3>
                <p className="text-xs text-[#475467] mt-1 leading-relaxed">
                  Check out our Help Center for frequently asked questions about orders,
                  shipping, returns, and more.
                </p>
                <Link
                  href="/contactus"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16A34A] hover:underline mt-2.5"
                >
                  <span>Visit Help Center</span>
                  <i className="fa-solid fa-arrow-right text-[11px]"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

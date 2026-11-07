import React from "react";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import type { Article } from "@/types";

export const metadata = {
  title: "Privacy Policy | FreshCart",
  description: "How FreshCart collects, uses and protects your personal data.",
};

const articles: Article[] = [
  {
    id: 1,
    icon: "fa-database",
    heading: "Information We Collect",
    items: [
      { number: "1.1", lead: "Personal Data:", text: "Name, email address, phone number, and shipping address." },
      { number: "1.2", lead: "Payment Data:", text: "Credit card information processed securely through our payment providers." },
      { number: "1.3", lead: "Technical Data:", text: "IP address, browser type, device information, and access times." },
      { number: "1.4", lead: "Usage Data:", text: "Pages viewed, products browsed, and actions taken within our platform." },
    ],
  },
  {
    id: 2,
    icon: "fa-user",
    heading: "How We Use Your Information",
    items: [
      { number: "2.1", text: "To process and fulfill your orders." },
      { number: "2.2", text: "To send order confirmations and shipping updates." },
      { number: "2.3", text: "To provide customer support and respond to inquiries." },
      { number: "2.4", text: "To improve our products, services, and user experience." },
      { number: "2.5", text: "To send promotional communications (with your consent)." },
    ],
  },
  {
    id: 3,
    icon: "fa-lock",
    heading: "Data Protection",
    items: [
      { number: "3.1", text: "We implement industry-standard encryption (SSL/TLS) for all data transfers." },
      { number: "3.2", text: "Payment information is processed by PCI-compliant payment providers." },
      { number: "3.3", text: "We conduct regular security audits and vulnerability assessments." },
      { number: "3.4", text: "Access to personal data is restricted to authorized personnel only." },
    ],
  },
  {
    id: 4,
    icon: "fa-share-nodes",
    heading: "Information Sharing",
    items: [
      { number: "4.1", text: "We do not sell, trade, or rent your personal information to third parties." },
      { number: "4.2", text: "Data may be shared with trusted service providers who assist in operating our platform." },
      { number: "4.3", text: "We may disclose information when required by law or to protect our rights." },
    ],
  },
  {
    id: 5,
    icon: "fa-cookie-bite",
    heading: "Cookies & Tracking",
    items: [
      { number: "5.1", text: "We use cookies to maintain your session and remember your preferences." },
      { number: "5.2", text: "Analytics cookies help us understand how visitors interact with the site." },
      { number: "5.3", text: "You can control cookie settings through your browser preferences." },
    ],
  },
  {
    id: 6,
    icon: "fa-scale-balanced",
    heading: "Your Rights",
    items: [
      { number: "6.1", text: "Access: Request a copy of the personal data we hold about you." },
      { number: "6.2", text: "Correction: Request correction of inaccurate or incomplete data." },
      { number: "6.3", text: "Deletion: Request deletion of your personal data under certain conditions." },
      { number: "6.4", text: "Opt-out: Unsubscribe from marketing communications at any time." },
    ],
  },
  {
    id: 7,
    icon: "fa-clock-rotate-left",
    heading: "Data Retention",
    items: [
      { number: "7.1", text: "We retain personal data only as long as necessary for the purposes outlined." },
      { number: "7.2", text: "Order history is kept for accounting and legal compliance purposes." },
      { number: "7.3", text: "Inactive accounts may be deleted after a prolonged period of inactivity." },
    ],
  },
  {
    id: 8,
    icon: "fa-envelope",
    heading: "Contact Us",
    customContent: (
      <p className="text-sm text-gray-600">
        If you have any questions or concerns about this Privacy Policy, please contact our Data Protection Officer at{" "}
        <a href="mailto:privacy@freshcart.com" className="font-semibold text-emerald-600 hover:underline">
          privacy@freshcart.com
        </a>
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="February 2026"
      heroIcon="fa-shield-halved"
      callout={{
        icon: "fa-shield-halved",
        title: "Your Privacy Matters",
        description:
          "This Privacy Policy describes how FreshCart collects, uses, and protects your personal information when you use our services. We are committed to ensuring that your privacy is protected.",
        variant: "emerald",
      }}
      articles={articles}
      contactEmail="privacy@freshcart.com"
    />
  );
}

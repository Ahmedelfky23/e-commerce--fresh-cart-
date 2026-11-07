import React from "react";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import type { Article } from "@/types";

export const metadata = {
  title: "Cookie Policy | FreshCart",
  description: "How FreshCart uses cookies and similar technologies.",
};

const articles: Article[] = [
  {
    id: 1,
    icon: "fa-cookie-bite",
    heading: "What Are Cookies",
    items: [
      {
        number: "1.1",
        text: "Cookies are small text files stored on your device when you visit our website.",
      },
      {
        number: "1.2",
        text: "They help us remember your preferences, keep your session secure, and improve your shopping experience.",
      },
      {
        number: "1.3",
        text: "By using FreshCart, you agree to our use of cookies as described in this policy.",
      },
    ],
  },
  {
    id: 2,
    icon: "fa-layer-group",
    heading: "Types of Cookies We Use",
    items: [
      {
        number: "2.1",
        lead: "Essential cookies:",
        text: "Required for the site to function — keep you signed in, remember your cart, and protect checkout.",
      },
      {
        number: "2.2",
        lead: "Performance cookies:",
        text: "Collect anonymous data on page views and load times to help us improve the store.",
      },
      {
        number: "2.3",
        lead: "Preference cookies:",
        text: "Remember your language, region, and recently viewed products.",
      },
      {
        number: "2.4",
        lead: "Marketing cookies:",
        text: "Used to show relevant ads and promotions, only with your consent.",
      },
    ],
  },
  {
    id: 3,
    icon: "fa-microchip",
    heading: "How We Use Cookies",
    items: [
      {
        number: "3.1",
        text: "To authenticate your account and keep your session active while you shop.",
      },
      {
        number: "3.2",
        text: "To remember items in your cart and wishlist across visits.",
      },
      {
        number: "3.3",
        text: "To analyse traffic and troubleshoot issues so we can speed up the store.",
      },
      {
        number: "3.4",
        text: "To personalise content and show you relevant product recommendations.",
      },
    ],
  },
  {
    id: 4,
    icon: "fa-network-wired",
    heading: "Third-Party Cookies",
    items: [
      {
        number: "4.1",
        text: "Trusted service providers (analytics, payments, support) may set cookies on our behalf.",
      },
      {
        number: "4.2",
        text: "We do not allow third parties to track you across other websites without your consent.",
      },
      {
        number: "4.3",
        text: "Third-party cookies are subject to the privacy policies of their respective providers.",
      },
    ],
  },
  {
    id: 5,
    icon: "fa-sliders-h",
    heading: "Managing Cookies",
    items: [
      {
        number: "5.1",
        text: "You can accept, decline, or customise cookies through our cookie consent banner.",
      },
      {
        number: "5.2",
        text: "You may also clear or block cookies in your browser settings at any time.",
      },
      {
        number: "5.3",
        text: "Disabling essential cookies may prevent checkout and account features from working.",
      },
    ],
  },
  {
    id: 6,
    icon: "fa-check-circle",
    heading: "Your Cookie Choices",
    customContent: (
      <p className="text-sm leading-relaxed text-gray-600">
        You have the right to withdraw your consent for non-essential cookies at any time. Changing
        your cookie preferences will not affect the lawfulness of processing based on consent before
        its withdrawal.
      </p>
    ),
  },
  {
    id: 7,
    icon: "fa-history",
    heading: "Updates to This Policy",
    customContent: (
      <p className="text-sm leading-relaxed text-gray-600">
        We may update this Cookie Policy from time to time. Changes are effective when posted, and the
        &ldquo;Last updated&rdquo; date at the top of this page reflects the most recent revision.
      </p>
    ),
  },
  {
    id: 8,
    icon: "fa-envelope",
    heading: "Contact Us",
    customContent: (
      <p className="text-sm leading-relaxed text-gray-600">
        If you have questions about our use of cookies, please contact us at{" "}
        <a
          href="mailto:support@freshcart.com"
          className="font-semibold text-emerald-600 hover:text-emerald-700 underline underline-offset-2"
        >
          support@freshcart.com
        </a>
        .
      </p>
    ),
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      lastUpdated="February 2026"
      heroIcon="fa-cookie-bite"
      callout={{
        icon: "fa-circle-exclamation",
        title: "Important Notice",
        description:
          "This Cookie Policy explains how FreshCart uses cookies and similar technologies to recognise you when you visit our website. It explains what these technologies are, why we use them, and your rights to control them.",
        variant: "amber",
      }}
      articles={articles}
    />
  );
}

import React from "react";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import type { Article } from "@/types";

export const metadata = {
  title: "Terms of Service | FreshCart",
  description: "The terms that apply when you shop with FreshCart.",
};

const articles: Article[] = [
  {
    id: 1,
    icon: "fa-file-contract",
    heading: "Acceptance of Terms",
    items: [
      {
        number: "1.1",
        text: "By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms.",
      },
      {
        number: "1.2",
        text: "If you do not agree to these Terms, you must not access or use the Service.",
      },
      {
        number: "1.3",
        text: "We reserve the right to modify these Terms at any time, and such modifications shall be effective immediately upon posting.",
      },
    ],
  },
  {
    id: 2,
    icon: "fa-user-check",
    heading: "User Eligibility",
    items: [
      {
        number: "2.1",
        text: "The Service is intended for users who are at least eighteen (18) years of age.",
      },
      {
        number: "2.2",
        text: "By using the Service, you represent and warrant that you are of legal age to form a binding contract.",
      },
      {
        number: "2.3",
        text: "If you are accessing the Service on behalf of a legal entity, you represent that you have the authority to bind such entity.",
      },
    ],
  },
  {
    id: 3,
    icon: "fa-id-card",
    heading: "Account Registration",
    items: [
      {
        number: "3.1",
        text: "You may be required to create an account to access certain features of the Service.",
      },
      {
        number: "3.2",
        text: "You agree to provide accurate, current, and complete information during registration.",
      },
      {
        number: "3.3",
        text: "You are solely responsible for maintaining the confidentiality of your account credentials.",
      },
      {
        number: "3.4",
        text: "You agree to notify us immediately of any unauthorized use of your account.",
      },
    ],
  },
  {
    id: 4,
    icon: "fa-credit-card",
    heading: "Orders and Payments",
    items: [
      {
        number: "4.1",
        text: "All orders placed through the Service are subject to acceptance and availability.",
      },
      {
        number: "4.2",
        text: "Prices are subject to change without notice prior to order confirmation.",
      },
      {
        number: "4.3",
        text: "Payment must be made in full at the time of purchase through approved payment methods.",
      },
      {
        number: "4.4",
        text: "We reserve the right to refuse or cancel any order at our sole discretion.",
      },
    ],
  },
  {
    id: 5,
    icon: "fa-truck-fast",
    heading: "Shipping and Delivery",
    items: [
      {
        number: "5.1",
        text: "Shipping times are estimates only and are not guaranteed.",
      },
      {
        number: "5.2",
        text: "Risk of loss and title for items purchased pass to you upon delivery to the carrier.",
      },
      {
        number: "5.3",
        text: "We are not responsible for delays caused by carriers, customs, or other factors beyond our control.",
      },
    ],
  },
  {
    id: 6,
    icon: "fa-rotate-left",
    heading: "Returns and Refunds",
    items: [
      {
        number: "6.1",
        text: "Our return policy allows returns within 14 days of delivery for most items.",
      },
      {
        number: "6.2",
        text: "Products must be unused and in original packaging.",
      },
      {
        number: "6.3",
        text: "Refunds will be processed within 5-7 business days after receiving the returned item.",
      },
    ],
  },
  {
    id: 7,
    icon: "fa-scale-balanced",
    heading: "Limitation of Liability",
    customContent: (
      <p className="text-sm leading-relaxed text-gray-600">
        To the maximum extent permitted by applicable law, FreshCart shall not be liable for any indirect,
        incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether
        incurred directly or indirectly.
      </p>
    ),
  },
  {
    id: 8,
    icon: "fa-envelope",
    heading: "Contact Us",
    customContent: (
      <p className="text-sm leading-relaxed text-gray-600">
        If you have any questions about these Terms, please contact us at{" "}
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

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      lastUpdated="February 2026"
      heroIcon="fa-file-contract"
      callout={{
        icon: "fa-file-contract",
        title: "Terms and Conditions",
        description:
          "Please read these Terms of Service carefully before using our website. By accessing or using FreshCart, you agree to be bound by these terms.",
        variant: "blue",
      }}
      articles={articles}
    />
  );
}

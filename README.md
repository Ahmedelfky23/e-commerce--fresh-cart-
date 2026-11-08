# 🛒 FreshCart — Modern Full-Stack E-Commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Route Academy](https://img.shields.io/badge/Route_Academy-Project-16A34A?style=for-the-badge)](https://routemisr.com/)

A modern, production-ready, full-stack E-Commerce web application built with **Next.js 16 (App Router)**, **React 19**, and **TypeScript**. Designed from Figma specifications and powered by Route Academy's robust eCommerce REST API.

---

## 🌟 Live Demo & Preview

- **Live URL**: [Deploy on Vercel](https://e-commerce-fresh-cart-tau.vercel.app/)
- **Repository**: [GitHub Repository](https://github.com/Ahmedelfky23/e-commerce--fresh-cart-)

---

## 🚀 Key Features

### 🔐 1. Authentication & Security

- **Full Auth Lifecycle**: Sign In, Sign Up, and Remember Me functionality powered by **NextAuth.js**.
- **OTP Password Recovery**: Forgot password flow with email verification, 6-digit reset code verification (`verifyResetCode`), and secure password update (`resetPassword`).
- **Logged-in Password Management**: Change password directly from the user profile settings (`changeMyPassword`).
- **Route Protection**: Custom Next.js Middleware (`proxy.ts`) guarding private routes (`/profile`, `/checkout`, `/cart`, `/orders`, `/allorders`, `/wishlist`).

### 🛍️ 2. Cart & Wishlist Ecosystem

- **Persistent Global State**: React Context (`MyProvider`) synchronizing cart and wishlist counters across the entire application in real time.
- **Cart Controls**: Add items, dynamically update quantities (with debounce & loading indicators), remove items, or clear cart in one click.
- **Wishlist Toggle**: Interactive heart action to save favorite products across sessions.

### 💳 3. Multi-Payment Checkout

- **Streamlined Form State**: Clean, dependency-free input management utilizing React `useRef` for optimal rendering performance.
- **Cash on Delivery**: Submits orders directly via RouteMisr API (`POST /api/v2/orders/{{cartId}}`), triggers `aftercheckout` to zero cart state, and routes to `/orders`.
- **Stripe Online Card Payment**: Creates secure checkout sessions (`POST /api/v1/orders/checkout-session/{{cartId}}?url={{currentDomain}}`), dynamically detects the host domain (localhost / Vercel production), and redirects to Stripe with automatic `/allorders` callback resolution.
- **Saved Address Selector**: Automatically pulls saved shipping addresses from the user's profile and auto-fills fields with a single click.

### 🏷️ 4. Coupon & Discounts Engine

- **Live Promo Codes**: Real-time coupon application (`PUT /api/v2/cart/applyCoupon`).
- **Instant Calculations**: Dynamically computes discount subtotals (`totalAfterDiscount`), provides itemized discount breakdowns in Order Summary, and persists deductions to checkout.

### 📦 5. Orders Management Dashboard (Figma-Inspired)

- **Pixel-Perfect UI**: Matches Route Figma design (`Node 38-8450`) with custom collapsible accordions.
- **Status Indicators**: Real-time status badges for both Payment (`Paid`, `Cash on Delivery`, `Unpaid`) and Delivery (`Processing`, `On the way`, `Delivered`).
- **Order Details**: Displays multi-item badges (`+N`), product thumbnails, item pricing, full shipping address, and receipt summary.

### 📍 6. Delivery Address Book

- **Profile Addresses**: Add, view, and delete multiple delivery addresses from `/profile/addresses`.
- **Pre-filled Selection**: Easily choose default delivery destinations during checkout without manual retyping.

### ⭐ 7. Reviews & Ratings

- **Product Reviews**: View genuine customer reviews, average star ratings, and review dates on product detail pages.
- **Review Actions**: Authenticated users can write, edit, and delete their own reviews with live feedback.

### 🔍 8. Catalog Exploration & Search

- **Search System**: Live search by product keyword with instant category and brand filtering.
- **Layout Switching**: Toggle between Grid and List view layouts.
- **Related Products**: Responsive horizontal Swiper carousel ("You May Also Like") on product detail pages.

### 🛡️ 9. Client & Server Data Validation

- **Zod Schemas**: Strict validation on user credentials, password confirmation, and shipping details.
- **Egyptian Mobile Validation**: Enforces valid 11-digit Egyptian phone numbers (`010`, `011`, `012`, `015`) on both client forms and Server Actions.

---

## 🛠️ Tech Stack

| Category                | Technology                                             |
| :---------------------- | :----------------------------------------------------- |
| **Framework**           | Next.js 16.4.2 (App Router, Turbopack, React Compiler) |
| **Library**             | React 19.3.0                                           |
| **Language**            | TypeScript 5.0+                                        |
| **Styling**             | Tailwind CSS v4                                        |
| **Authentication**      | NextAuth.js (Credentials Provider & JWT tokens)        |
| **Validation**          | Zod (`zod` & `@hookform/resolvers`)                    |
| **Form Handling**       | React Hook Form & React `useRef`                       |
| **Carousels**           | Swiper 14                                              |
| **Icons**               | Lucide React & FontAwesome 7                           |
| **Toast Notifications** | Sonner                                                 |
| **Backend API**         | RouteMisr E-Commerce REST API                          |

---

## 📂 Project Structure

```text
src/
├── actions/             # Next.js Server Actions (cart, order, address, auth, review, wishlist)
│   ├── address.actions.ts
│   ├── auth.actions.ts
│   ├── cart.actions.ts
│   ├── checkoutaction.ts
│   ├── order.actions.ts
│   ├── paymentaction.ts
│   └── review.actions.ts
├── api/services/        # Fetch services for products, categories, and brands
├── app/                 # Next.js 16 App Router pages
│   ├── (auth)/          # Sign In & Sign Up pages
│   ├── allorders/       # Stripe payment return handler & redirect
│   ├── cart/            # Shopping cart page
│   ├── checkout/        # Checkout and payment page
│   ├── forgot-password/ # Password recovery page
│   ├── orders/          # My Orders tracking dashboard
│   ├── products/        # Product catalog & details pages
│   ├── profile/         # User profile and address book
│   ├── search/          # Search & filter products page
│   ├── verify-code/     # OTP verification page
│   ├── wishlist/        # Saved products page
│   ├── globals.css      # Tailwind v4 styles & design tokens
│   ├── layout.tsx       # Root layout with providers & navigation
│   └── page.tsx         # Homepage with Hero, Categories & Featured Products
├── components/          # Reusable modular UI components
│   ├── auth/            # Auth forms & layouts
│   ├── cart/            # CartView & item rows
│   ├── checkout/        # CheckoutView & order summaries
│   ├── home/            # HeroBanner, TrustFeatures, CategorySection, etc.
│   ├── layout/          # Navbar, Footer, TopBar, MyProvider
│   ├── orders/          # OrdersView accordion component
│   ├── products/        # ProductCard, ProductDetails, RelatedProducts
│   ├── profile/         # AddressesView, ProfileView, AccountShell
│   └── ui/              # ScrollReveal, Field, Button, Input, Sonner
├── schemas/             # Zod validation schemas (signin, signup, checkout, address)
├── types/               # TypeScript interfaces & types
├── proxy.ts             # Route protection middleware
└── utilities.ts         # JWT token decoding and session helpers
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/freshcart-ecommerce.git
cd freshcart-ecommerce
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables Setup

Create a `.env` file in the root directory and add the following:

```env
NEXTAUTH_SECRET=your_nextauth_secret_key_here
NEXTAUTH_URL=http://localhost:3000
```

> **Tip:** You can generate a secure `NEXTAUTH_SECRET` by running:
>
> ```bash
> openssl rand -base64 32
> ```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 5. Build for production

```bash
npm run build
npm run start
```

---

## 🎓 Acknowledgments

This project was developed as a graduation/milestone capstone project within the **Route Academy (Route IT Training Center)** Web Development diploma. Special thanks to our instructors and mentors for their guidance and comprehensive curriculum.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

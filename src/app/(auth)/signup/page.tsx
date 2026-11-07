import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import SocialAuth from "@/components/auth/SocialAuth";
import SignUpForm from "@/components/auth/SignUpForm";


const BENEFITS = [
  {
    icon: "fa-solid fa-leaf",
    title: "Premium Quality",
    description: "Premium quality products sourced from trusted suppliers.",
  },
  {
    icon: "fa-solid fa-truck-fast",
    title: "Fast Delivery",
    description: "Same-day delivery available in most areas",
  },
  {
    icon: "fa-solid fa-shield-halved",
    title: "Secure Shopping",
    description: "Your data and payments are completely secure",
  },
];

function SignUpAside() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl leading-10 font-bold text-[#364153]">
        Welcome to FreshCart
      </h1>
      <p className="text-xl leading-7 font-medium text-[#364153]">
        Join thousands of happy customers who enjoy fresh groceries delivered
        right to their doorstep.
      </p>

      <ul className="flex flex-col gap-6 py-6">
        {BENEFITS.map((benefit) => (
          <li key={benefit.title} className="flex gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#bbf7d0]">
              <i
                className={`${benefit.icon} text-[18px] text-brand`}
                aria-hidden
              />
            </span>
            <div>
              <h2 className="text-lg leading-7 font-semibold text-[#364153]">
                {benefit.title}
              </h2>
              <p className="text-base leading-6 font-medium text-[#4a5565]">
                {benefit.description}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="rounded-md bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/reviewer.png"
            alt="Sarah Johnson"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <h3 className="text-base leading-6 font-medium text-[#364153]">
              Sarah Johnson
            </h3>
            <div className="flex items-center gap-1 pt-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <i
                  key={index}
                  className="fa-solid fa-star text-[12px] text-[#fdc700]"
                  aria-hidden
                />
              ))}
            </div>
          </div>
        </div>
        <p className="mt-4 text-base leading-6 font-medium text-[#4a5565] italic">
          &ldquo;FreshCart has transformed my shopping experience. The quality of
          the products is outstanding, and the delivery is always on time. Highly
          recommend!&rdquo;
        </p>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <AuthShell aside={<SignUpAside />} hideAsideOnMobile={false}>
      <div className="w-full rounded-2xl bg-white px-6 py-10 shadow-[0_4px_6px_rgba(0,0,0,0.1),0_10px_15px_rgba(0,0,0,0.1)] sm:px-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-center text-3xl leading-9 font-semibold text-[#364153]">
            Create Your Account
          </h2>
          <p className="text-center text-base leading-6 font-medium text-[#364153]">
            Start your fresh journey with us today
          </p>
        </div>

        <div className="py-8">
          <SocialAuth variant="signup" />
        </div>

        <div className="flex items-center" aria-hidden>
          <span className="h-px flex-1 bg-[#d1d5dc]" />
          <span className="bg-white px-4 text-base leading-6 font-medium text-[#364153]">
            or
          </span>
          <span className="h-px flex-1 bg-[#d1d5dc]" />
        </div>

        <div className="py-2">
          <SignUpForm />
        </div>

        <p className="mt-8 border-t border-[#d1d5dc] pt-10 text-center text-base leading-6 font-medium text-[#364153]">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold text-brand transition-colors hover:text-[#15803d]"
          >
            Sign In
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}

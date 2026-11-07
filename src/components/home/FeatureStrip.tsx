const features = [
  {
    title: "Free Shipping",
    desc: "On orders over 500 EGP",
    icon: "fa-truck",
  },
  {
    title: "Easy Returns",
    desc: "14-day return policy",
    icon: "fa-rotate-left",
  },
  {
    title: "Secure Payment",
    desc: "100% secure checkout",
    icon: "fa-shield-halved",
  },
  {
    title: "24/7 Support",
    desc: "Contact us anytime",
    icon: "fa-headset",
  },
];

export default function FeatureStrip() {
  return (
    <section className="reveal-on-scroll w-full border-y border-[#dcfce7] bg-[#f0fdf4] py-6">
      <div className="mx-auto max-w-384 px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#dcfce7] text-brand">
                <i
                  className={`fa-solid ${feature.icon} text-[18px]`}
                  aria-hidden
                />
              </span>
              <div>
                <h4 className="text-sm leading-5 font-semibold text-[#101828]">
                  {feature.title}
                </h4>
                <p className="text-xs leading-4 font-medium text-[#6a7282]">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

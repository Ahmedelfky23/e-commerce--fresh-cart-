const features = [
  {
    title: "Free Shipping",
    desc: "On orders over 500 EGP",
    icon: "fa-truck",
    circle: "bg-[#fef2f2]",
    color: "text-[#2b7fff]",
  },
  {
    title: "Secure Payment",
    desc: "100% secure transactions",
    icon: "fa-shield-halved",
    circle: "bg-[#ecfdf5]",
    color: "text-[#00bc7d]",
  },
  {
    title: "Easy Returns",
    desc: "14-day return policy",
    icon: "fa-rotate-left",
    circle: "bg-[#f3f4f6]",
    color: "text-[#ff6900]",
  },
  {
    title: "24/7 Support",
    desc: "Dedicated support team",
    icon: "fa-headset",
    circle: "bg-[#f9fafb]",
    color: "text-[#ad46ff]",
  },
];

export default function TrustFeatures() {
  return (
    <section className="w-full bg-[#f9fafb] py-8">
      <div className="mx-auto max-w-384 px-4 md:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.1)]"
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${feature.circle} ${feature.color}`}
              >
                <i className={`fa-solid ${feature.icon} text-[20px]`} aria-hidden />
              </div>
              <div>
                <h3 className="text-sm leading-5 font-semibold text-[#1e2939]">
                  {feature.title}
                </h3>
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

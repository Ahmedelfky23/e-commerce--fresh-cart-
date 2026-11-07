import type { AuthStepperProps } from "@/types";

const STEPS = [
  { step: 1, icon: "fa-solid fa-envelope", label: "Email" },
  { step: 2, icon: "fa-solid fa-shield-halved", label: "Verify" },
  { step: 3, icon: "fa-solid fa-lock", label: "Reset" },
] as const;

export default function AuthStepper({ current }: AuthStepperProps) {
  return (
    <div
      className="flex items-center justify-center"
      aria-label={`Step ${current} of ${STEPS.length}`}
    >
      {STEPS.map(({ step, icon, label }, index) => {
        const isDone = step < current;
        const isActive = step === current;

        return (
          <div key={step} className="flex items-center">
            <span
              title={label}
              aria-current={isActive ? "step" : undefined}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
                isDone || isActive
                  ? "bg-[#16a34a] text-white"
                  : "bg-[#f3f4f6] text-[#99a1af]"
              } ${isActive ? "ring-4 ring-[#dcfce7]" : ""}`}
            >
              <i
                className={`${isDone ? "fa-solid fa-check" : icon} text-[13px]`}
                aria-hidden
              />
            </span>

            {index < STEPS.length - 1 && (
              <span className="flex w-20 items-center px-2" aria-hidden>
                <span
                  className={`h-0.5 w-16 ${
                    step < current ? "bg-[#16a34a]" : "bg-[#e5e7eb]"
                  }`}
                />
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

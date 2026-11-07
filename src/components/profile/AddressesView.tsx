"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  getLoggedUserAddresses,
  addAddress,
  removeAddress,
} from "@/actions/address.actions";
import { addressSchema } from "@/schemas/checkout.schema";
import type { Address, AddressPayload } from "@/types";

const EMPTY_FORM: AddressPayload = {
  name: "Home",
  city: "",
  details: "",
  phone: "",
};

export default function AddressesView() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [form, setForm] = useState<AddressPayload>(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function loadAddresses() {
    setIsLoading(true);
    try {
      const res = await getLoggedUserAddresses();
      if (res?.status === "success" && Array.isArray(res.data)) {
        setAddresses(res.data as Address[]);
      } else {
        setAddresses([]);
      }
    } catch {
      setAddresses([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadAddresses();
  }, []);

  function openAddModal() {
    setForm(EMPTY_FORM);
    setFieldErrors({});
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setFieldErrors({});
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validation = addressSchema.safeParse({
      name: form.name.trim() || "Home",
      city: form.city.trim(),
      details: form.details.trim(),
      phone: form.phone.trim(),
    });

    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.issues.forEach((err) => {
        const field = String(err.path[0]);
        if (!errors[field]) errors[field] = err.message;
      });
      setFieldErrors(errors);
      toast.error(validation.error.issues[0]?.message || "Please check address details");
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);
    try {
      const res = await addAddress({
        name: form.name.trim() || "Home",
        city: form.city.trim(),
        details: form.details.trim(),
        phone: form.phone.trim(),
      });

      if (res?.status === "success") {
        if (Array.isArray(res.data)) {
          setAddresses(res.data as Address[]);
        } else {
          await loadAddresses();
        }
        toast.success(res.message || "Address added successfully");
        closeModal();
      } else {
        toast.error(res?.message || "Failed to add address");
      }
    } catch {
      toast.error("An error occurred while adding the address");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(addressId: string) {
    setDeletingId(addressId);
    try {
      const res = await removeAddress(addressId);
      if (res?.status === "success") {
        if (Array.isArray(res.data)) {
          setAddresses(res.data as Address[]);
        } else {
          setAddresses((prev) => prev.filter((a) => a._id !== addressId));
        }
        toast.success(res.message || "Address removed successfully");
      } else {
        toast.error(res?.message || "Failed to delete address");
      }
    } catch {
      toast.error("Failed to delete address");
    } finally {
      setDeletingId(null);
    }
  }

  const inputClass =
    "h-[50px] w-full rounded-xl border border-[#e5e7eb] px-4 text-base leading-6 font-medium text-[#364153] outline-none transition-colors placeholder:text-[#99a1af] focus:border-[#16a34a]";

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl leading-7 font-bold text-[#101828]">
              My Addresses
            </h2>
            <p className="text-sm leading-5 font-medium text-[#6a7282]">
              Manage your saved delivery addresses for faster checkout
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-base leading-6 font-semibold text-white shadow-xs transition-colors hover:bg-[#15803d]"
          >
            <i className="fa-solid fa-plus text-[13px]" aria-hidden />
            <span>Add Address</span>
          </button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-gray-100 bg-white p-5 shadow-xs"
              >
                <div className="h-6 w-1/3 rounded-sm bg-gray-100 mb-3" />
                <div className="h-4 w-3/4 rounded-sm bg-gray-100 mb-2" />
                <div className="h-4 w-1/2 rounded-sm bg-gray-100" />
              </div>
            ))}
          </div>
        ) : addresses.length === 0 ? (
          <div className="rounded-2xl border border-[#f3f4f6] bg-white p-10 text-center shadow-xs">
            <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f0fdf4] text-brand">
              <i className="fa-solid fa-location-dot text-2xl" aria-hidden />
            </span>
            <h3 className="text-xl leading-7 font-bold text-[#101828]">
              No saved addresses yet
            </h3>
            <p className="mt-2 text-sm leading-5 font-medium text-[#6a7282]">
              Add a delivery address so we know where to ship your orders.
            </p>
            <button
              type="button"
              onClick={openAddModal}
              className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#15803d]"
            >
              <i className="fa-solid fa-plus text-xs" aria-hidden />
              <span>Add Your First Address</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {addresses.map((address) => {
              const isDeleting = deletingId === address._id;

              return (
                <div
                  key={address._id}
                  className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xs transition-all hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0fdf4] text-brand">
                        <i
                          className="fa-solid fa-location-dot text-[18px]"
                          aria-hidden
                        />
                      </span>

                      <div className="flex min-w-0 flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base leading-6 font-bold text-[#101828]">
                            {address.name || address.city}
                          </h3>
                          {address.name && (
                            <span className="rounded-full bg-[#f0fdf4] px-2 py-0.5 text-[11px] font-semibold text-brand">
                              {address.city}
                            </span>
                          )}
                        </div>

                        <p className="text-sm leading-5 font-medium text-[#4a5565]">
                          {address.details}
                        </p>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-sm leading-5 font-medium text-[#6a7282]">
                          <span className="flex items-center gap-1.5">
                            <i
                              className="fa-solid fa-phone text-[12px] text-brand"
                              aria-hidden
                            />
                            {address.phone}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center">
                      <button
                        type="button"
                        disabled={isDeleting}
                        onClick={() => handleDelete(address._id)}
                        aria-label={`Delete address ${address.name || address.city}`}
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-gray-50 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
                        title="Delete address"
                      >
                        {isDeleting ? (
                          <i className="fa-solid fa-circle-notch animate-spin text-[12px]" aria-hidden />
                        ) : (
                          <i className="fa-regular fa-trash-can text-[13px]" aria-hidden />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Address Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 backdrop-blur-xs sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="address-modal-title"
        >
          <div className="w-full max-w-[520px] overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-gray-100 p-5">
              <h3
                id="address-modal-title"
                className="text-lg leading-7 font-bold text-[#101828]"
              >
                Add New Delivery Address
              </h3>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close form"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200"
              >
                <i className="fa-solid fa-xmark text-[15px]" aria-hidden />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
              {/* Address Label (Home, Work, etc) */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="address-name"
                  className="text-sm font-medium text-[#364153]"
                >
                  Address Label
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Home", "Work", "Other"].map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, name: label }))}
                      className={`cursor-pointer rounded-xl border py-2 text-sm font-semibold transition-colors ${
                        form.name === label
                          ? "border-brand bg-[#f0fdf4] text-brand"
                          : "border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* City */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="address-city"
                  className="text-sm font-medium text-[#364153]"
                >
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  id="address-city"
                  type="text"
                  required
                  value={form.city}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, city: e.target.value }));
                    if (fieldErrors.city) {
                      setFieldErrors((prev) => ({ ...prev, city: "" }));
                    }
                  }}
                  placeholder="e.g. Cairo, Giza, Alexandria"
                  className={inputClass}
                />
                {fieldErrors.city && (
                  <p className="text-xs font-medium text-red-500">
                    {fieldErrors.city}
                  </p>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="address-details"
                  className="text-sm font-medium text-[#364153]"
                >
                  Street & Building Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="address-details"
                  required
                  rows={3}
                  value={form.details}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, details: e.target.value }));
                    if (fieldErrors.details) {
                      setFieldErrors((prev) => ({ ...prev, details: "" }));
                    }
                  }}
                  placeholder="Street name, building number, apartment/floor..."
                  className="min-h-[90px] w-full resize-y rounded-xl border border-[#e5e7eb] px-4 py-3 text-base leading-6 font-medium text-[#364153] outline-none transition-colors placeholder:text-[#99a1af] focus:border-brand"
                />
                {fieldErrors.details && (
                  <p className="text-xs font-medium text-red-500">
                    {fieldErrors.details}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="address-phone"
                  className="text-sm font-medium text-[#364153]"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="address-phone"
                  type="tel"
                  inputMode="tel"
                  required
                  value={form.phone}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, phone: e.target.value }));
                    if (fieldErrors.phone) {
                      setFieldErrors((prev) => ({ ...prev, phone: "" }));
                    }
                  }}
                  placeholder="e.g. 01010700700"
                  className={inputClass}
                />
                {fieldErrors.phone && (
                  <p className="text-xs font-medium text-red-500">
                    {fieldErrors.phone}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="cursor-pointer rounded-xl border border-[#e5e7eb] px-6 py-2.5 text-base font-semibold text-[#364153] transition-colors hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand px-6 py-2.5 text-base font-semibold text-white shadow-xs transition-colors hover:bg-[#15803d]"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-circle-notch animate-spin text-sm" aria-hidden />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Address</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

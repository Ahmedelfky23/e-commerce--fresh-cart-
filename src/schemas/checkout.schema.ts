import * as zod from "zod";

export const egyptianPhoneRegex = /^01[0125][0-9]{8}$/;

export const shippingAddressSchema = zod.object({
  city: zod
    .string()
    .min(2, "City name must be at least 2 characters")
    .nonempty("City is required"),
  phone: zod
    .string()
    .regex(
      egyptianPhoneRegex,
      "Please enter a valid Egyptian phone number (e.g. 01012345678)",
    )
    .nonempty("Phone number is required"),
  details: zod
    .string()
    .min(5, "Street details must be at least 5 characters (e.g. street, building #)")
    .nonempty("Street details are required"),
  postalCode: zod
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]{4,6}$/.test(val), {
      message: "Postal code must be 4 to 6 digits",
    }),
});

export const addressSchema = zod.object({
  name: zod
    .string()
    .min(2, "Address label must be at least 2 characters (e.g. Home, Work)")
    .nonempty("Address label is required"),
  city: zod
    .string()
    .min(2, "City name must be at least 2 characters")
    .nonempty("City is required"),
  phone: zod
    .string()
    .regex(
      egyptianPhoneRegex,
      "Please enter a valid Egyptian phone number (e.g. 01012345678)",
    )
    .nonempty("Phone number is required"),
  details: zod
    .string()
    .min(5, "Street details must be at least 5 characters")
    .nonempty("Street details are required"),
});

export type ShippingAddressFormValues = zod.infer<typeof shippingAddressSchema>;
export type AddressFormValues = zod.infer<typeof addressSchema>;


export interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface AddressPayload {
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface AddressApiResponse {
  status: string;
  message?: string;
  results?: number;
  data?: Address[] | Address;
}

export interface BrandType {
  _id: string;
  id?: string;
  name: string;
  slug: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface BrandsApiResponse {
  results: number;
  metadata?: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
  };
  data: BrandType[];
}

export interface SpecificBrandApiResponse {
  data: BrandType;
}

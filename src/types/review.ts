import type { ReviewType } from "./product";

export interface ReviewPayload {
  review: string;
  rating: number;
}

export interface ReviewResponse {
  results?: number;
  data: ReviewType[];
}

export interface SingleReviewResponse {
  data: ReviewType;
  message?: string;
}

export interface ProductReviewsTabProps {
  productId: string;
  ratingsAverage?: number;
  initialReviews?: ReviewType[];
}

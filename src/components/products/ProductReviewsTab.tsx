"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  getProductReviews,
  createProductReview,
  updateReview,
  deleteReview,
} from "@/actions/review.actions";
import type { ReviewType, ProductReviewsTabProps } from "@/types";

export function ProductReviewsTab({
  productId,
  ratingsAverage = 0,
  initialReviews = [],
}: ProductReviewsTabProps) {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const currentUser = session?.user;

  const [reviews, setReviews] = useState<ReviewType[]>(initialReviews);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function loadReviews() {
    setIsLoading(true);
    try {
      const res = await getProductReviews(productId);
      if (res?.status === "success" && Array.isArray(res.data)) {
        setReviews(res.data);
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadReviews();
  }, [productId]);

  function openWrite() {
    if (!isAuthenticated) return;
    setEditingId(null);
    setRating(5);
    setReviewText("");
    setIsFormOpen(true);
  }

  function openEdit(rev: ReviewType) {
    setEditingId(rev._id);
    setRating(rev.rating);
    setReviewText(rev.review);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingId(null);
    setReviewText("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please sign in to write a review");
      return;
    }

    if (!reviewText.trim()) {
      toast.error("Please write your review feedback");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingId) {
        const res = await updateReview(editingId, {
          review: reviewText.trim(),
          rating,
        });

        if (res?.status === "success") {
          toast.success(res.message || "Review updated successfully");
          closeForm();
          await loadReviews();
        } else {
          toast.error(res?.message || "Failed to update review");
        }
      } else {
        const res = await createProductReview(productId, {
          review: reviewText.trim(),
          rating,
        });

        if (res?.status === "success") {
          toast.success(res.message || "Review submitted successfully");
          closeForm();
          await loadReviews();
        } else {
          toast.error(res?.message || "Failed to submit review");
        }
      }
    } catch {
      toast.error("An error occurred while saving your review");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(reviewId: string) {
    setDeletingId(reviewId);
    try {
      const res = await deleteReview(reviewId);
      if (res?.status === "success") {
        setReviews((prev) => prev.filter((r) => r._id !== reviewId));
        toast.success(res.message || "Review deleted successfully");
      } else {
        toast.error(res?.message || "Failed to delete review");
      }
    } catch {
      toast.error("Failed to delete review");
    } finally {
      setDeletingId(null);
    }
  }

  const renderStars = (activeScore: number, interactive = false) => {
    return [1, 2, 3, 4, 5].map((starIndex) => {
      const isFilled = interactive
        ? (hoverRating || rating) >= starIndex
        : activeScore >= starIndex;

      return (
        <button
          key={starIndex}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && setRating(starIndex)}
          onMouseEnter={() => interactive && setHoverRating(starIndex)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          className={
            interactive
              ? "cursor-pointer p-0.5 text-[#fcc800] transition-transform hover:scale-110"
              : "cursor-default text-[#fcc800]"
          }
          aria-label={interactive ? `Rate ${starIndex} stars` : undefined}
        >
          <i
            className={`fa-star ${interactive ? "text-xl" : "text-sm"} ${
              isFilled ? "fa-solid" : "fa-regular text-gray-200"
            }`}
            aria-hidden
          />
        </button>
      );
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* ── Summary & Write Button ── */}
      <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-[#f9fafb] p-6 sm:flex-row">
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <span className="text-4xl font-extrabold text-[#101828] sm:text-5xl">
            {ratingsAverage || 0}
          </span>
          <div className="my-2 flex items-center gap-1">
            {renderStars(ratingsAverage || 0)}
          </div>
          <span className="text-xs font-medium text-[#6a7282]">
            Based on {reviews.length} customer {reviews.length === 1 ? "review" : "reviews"}
          </span>
        </div>

        {/* إذا كان المستخدم مسجل دخول يعرض زر كتابة مراجعة، وإذا لم يكن مسجل يعرض رابط تسجيل الدخول */}
        {!isFormOpen && (
          isAuthenticated ? (
            <button
              type="button"
              onClick={openWrite}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#15803d]"
            >
              <i className="fa-solid fa-pen-to-square text-xs" aria-hidden />
              <span>Write a Review</span>
            </button>
          ) : (
            <Link
              href="/signin"
              className="inline-flex items-center gap-2 rounded-xl border border-brand bg-[#f0fdf4] px-4 py-2.5 text-sm font-semibold text-brand shadow-2xs transition-colors hover:bg-[#dcfce7]"
            >
              <i className="fa-regular fa-user text-xs" aria-hidden />
              <span>Sign in to write a review</span>
            </Link>
          )
        )}
      </div>

      {/* ── Write / Edit Form ── */}
      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4]/50 p-5 shadow-xs"
        >
          <div className="flex items-center justify-between border-b border-[#bbf7d0]/60 pb-3">
            <h3 className="text-base font-bold text-[#101828]">
              {editingId ? "Edit Your Review" : "Write a Customer Review"}
            </h3>
            <button
              type="button"
              onClick={closeForm}
              disabled={isSubmitting}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-gray-500 hover:bg-white"
            >
              <i className="fa-solid fa-xmark text-sm" aria-hidden />
            </button>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-700">
              Your Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-1">{renderStars(rating, true)}</div>
          </div>

          <div>
            <label
              htmlFor="review-text"
              className="mb-1.5 block text-xs font-semibold text-gray-700"
            >
              Your Feedback <span className="text-red-500">*</span>
            </label>
            <textarea
              id="review-text"
              rows={3}
              required
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="What did you like or dislike about this product?"
              disabled={isSubmitting}
              className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:opacity-60"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={closeForm}
              disabled={isSubmitting}
              className="cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-brand px-5 py-2 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#15803d]"
            >
              {isSubmitting ? (
                <>
                  <i className="fa-solid fa-circle-notch animate-spin text-xs" aria-hidden />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>{editingId ? "Save Changes" : "Submit Review"}</span>
              )}
            </button>
          </div>
        </form>
      )}

      {/* ── Reviews List ── */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12 text-sm text-gray-500">
          <i className="fa-solid fa-circle-notch animate-spin mr-2 text-brand text-lg" aria-hidden />
          <span>Loading reviews...</span>
        </div>
      ) : reviews.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {reviews.map((rev) => {
            const isDeleting = deletingId === rev._id;
            const isOwner =
              Boolean(currentUser?.name && rev.user?.name === currentUser.name) ||
              Boolean(currentUser?.id && rev.user?._id === currentUser.id);

            return (
              <div
                key={rev._id}
                className={
                  isOwner
                    ? "my-4 rounded-2xl border-2 border-[#86efac] bg-linear-to-r from-[#f0fdf4] via-emerald-50/30 to-white p-5 shadow-xs transition-all"
                    : "py-5 first:pt-2 last:pb-0"
                }
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold shadow-xs ${
                        isOwner
                          ? "bg-brand text-white ring-2 ring-brand/30"
                          : "bg-brand/10 text-brand"
                      }`}
                    >
                      {rev.user?.name ? rev.user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">
                          {rev.user?.name || "Verified Customer"}
                        </span>
                        {isOwner && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-brand text-white px-2.5 py-0.5 text-[11px] font-bold shadow-2xs">
                            <i className="fa-solid fa-circle-check text-[10px]" aria-hidden />
                            <span>Your Review</span>
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">
                        {rev.createdAt
                          ? new Date(rev.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "Recently"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {renderStars(rev.rating)}
                    </div>

                    {isOwner && (
                      <div className="flex items-center gap-1.5 ml-2">
                        <button
                          type="button"
                          onClick={() => openEdit(rev)}
                          className="flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-2xs transition-all hover:border-brand hover:bg-brand hover:text-white"
                          title="Edit review"
                          aria-label="Edit review"
                        >
                          <i className="fa-solid fa-pen text-xs" aria-hidden />
                        </button>
                        <button
                          type="button"
                          disabled={isDeleting}
                          onClick={() => handleDelete(rev._id)}
                          className="flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white text-red-500 shadow-2xs transition-all hover:border-red-500 hover:bg-red-500 hover:text-white"
                          title="Delete review"
                          aria-label="Delete review"
                        >
                          {isDeleting ? (
                            <i className="fa-solid fa-circle-notch animate-spin text-xs" aria-hidden />
                          ) : (
                            <i className="fa-regular fa-trash-can text-xs" aria-hidden />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <p
                  className={`mt-2 text-sm leading-6 ${
                    isOwner
                      ? "pl-13 font-medium text-gray-900"
                      : "pl-13 text-gray-700"
                  }`}
                >
                  {rev.review}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-12 text-center">
          <i className="fa-regular fa-star mx-auto mb-3 text-4xl text-gray-300" aria-hidden />
          <h4 className="text-base font-semibold text-gray-900">No reviews yet</h4>
          <p className="mt-1 text-sm text-gray-500">
            Be the first to share your thoughts on this product!
          </p>
        </div>
      )}
    </div>
  );
}

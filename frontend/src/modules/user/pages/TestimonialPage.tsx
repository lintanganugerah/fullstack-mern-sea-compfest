import { useState } from "react";
import TestimonialCarousel from "modules/user/components/ui/TestimonialCarousel";
import TestimonialForm from "modules/user/components/ui/TestimonialForm";
import type { CreateTestimonial } from "../types/TestimonialTypes";
import { Card, CardHeader, CardTitle, CardContent } from "components/ui/Card";
import { useAuthCheck } from "hooks/auth/useAuthCheck";
import { toast } from "react-toastify";
import { useStorage } from "hooks/useStorage";
import { useAllTestimonial } from "hooks/testimonial/useTestimonial";
import { useCreateTestimonial } from "hooks/testimonial/useCreateTestimonial";

export default function TestimonialsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFormModal, setShowFormModal] = useState(false);
  const { isAuthenticated } = useAuthCheck("user");
  const { user } = useStorage();

  const {
    data: testimonials,
    isLoading,
    isError,
    refetch,
  } = useAllTestimonial();
  const { createTestimoni, isLoading: isLoadingCreate } =
    useCreateTestimonial();

  const handleWriteReviewButton = () => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to submit a review.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
      return;
    }
    setShowFormModal(true);
  };

  const handleAddTestimonial = async (testimonial: CreateTestimonial) => {
    await createTestimoni(testimonial).then(() => {
      setShowFormModal(false);
      refetch();
    });
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-poppins text-gray-800 mb-6">
          Customer Testimonials
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Hear from our satisfied customers who have transformed their eating
          habits with Sea Catering's healthy meal delivery service.
        </p>
      </div>

      <TestimonialCarousel
        testimonials={testimonials}
        currentIndex={currentIndex}
        onPrev={prevTestimonial}
        onNext={nextTestimonial}
        isLoading={isLoading}
        isError={isError}
      />

      {showFormModal && isAuthenticated && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center  px-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg max-h-[90vh] bg-white rounded-lg shadow-xl overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setShowFormModal(false)}
              aria-label="Close"
            >
              &times;
            </button>

            <div className="p-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-poppins text-primary text-center">
                    Share Your Experience
                  </CardTitle>
                  <p className="text-center text-gray-600">
                    We'd love to hear about your journey with Sea Catering's
                    meal delivery service
                  </p>
                </CardHeader>
                <CardContent>
                  <TestimonialForm
                    onSubmit={(testimonial) => {
                      handleAddTestimonial(testimonial);
                    }}
                    userFullName={user.fullName}
                    isSubmitting={isLoadingCreate}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mt-8">
        <button
          onClick={handleWriteReviewButton}
          className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
        >
          Write a Review
        </button>
      </div>

      <div className="mt-16 bg-primary/5 rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">
              {testimonials.length}
            </div>
            <div className="text-gray-600">Total Reviews</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">
              {testimonials.length > 0
                ? (
                    testimonials.reduce((sum, t) => sum + t.rating, 0) /
                    testimonials.length
                  ).toFixed(1)
                : "0"}
            </div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">
              {testimonials.filter((t) => t.rating === 5).length}
            </div>
            <div className="text-gray-600">5-Star Reviews</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">
              {testimonials.length > 0
                ? `${Math.round(
                    (testimonials.filter((t) => t.rating > 3).length /
                      testimonials.length) *
                      100
                  )}%`
                : "0%"}
            </div>
            <div className="text-gray-600">Customer Satisfaction</div>
            <p className="text-sm text-gray-500 mt-1">
              Based on ratings 4 and 5 stars
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

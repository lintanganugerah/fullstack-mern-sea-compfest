import { useState } from "react";
import TestimonialCarousel from "modules/user/components/ui/TestimonialCarousel";
import TestimonialForm from "modules/user/components/ui/TestimonialForm";
import type { Testimonial } from "../types/TestimonialTypes";
import { testimonialsMock } from "../mock/TestimonialMock";
import { Card, CardHeader, CardTitle, CardContent } from "components/ui/Card";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] =
    useState<Testimonial[]>(testimonialsMock);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAddTestimonial = (testimonial: Testimonial) => {
    setTestimonials((prev) => [testimonial, ...prev]);
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
      />

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-poppins text-primary text-center">
              Share Your Experience
            </CardTitle>
            <p className="text-center text-gray-600">
              We'd love to hear about your journey with Sea Catering's meal
              delivery service
            </p>
          </CardHeader>
          <CardContent>
            <TestimonialForm onSubmit={handleAddTestimonial} />
          </CardContent>
        </Card>
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

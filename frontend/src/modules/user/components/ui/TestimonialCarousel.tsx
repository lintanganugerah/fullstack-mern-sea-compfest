import { Button } from "components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "./TestimonialCard";
import type { Testimonial } from "modules/user/types/TestimonialTypes";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  currentIndex: number;
  isLoading: boolean;
  onPrev: () => void;
  onNext: () => void;
}

const TestimonialCarousel = ({
  testimonials,
  currentIndex,
  isLoading,
  onPrev,
  onNext,
}: TestimonialCarouselProps) => {
  const visibleTestimonials = () => {
    if (testimonials.length <= 3) return testimonials;

    const result = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      result.push(testimonials[index]);
    }
    return result;
  };

  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold font-poppins text-gray-800">
          What Our Customers Say
        </h2>
        <div className="flex space-x-2">
          <Button
            onClick={onPrev}
            variant="outline"
            size="sm"
            className="p-2"
            disabled={testimonials.length <= 3}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            onClick={onNext}
            variant="outline"
            size="sm"
            className="p-2"
            disabled={testimonials.length <= 3}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading testimonials...</p>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No testimonials yet. Be the first to share your experience!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleTestimonials().map((testimonial) => (
            <TestimonialCard key={testimonial._id} testimonial={testimonial} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialCarousel;

import type { Testimonial } from "modules/user/types/TestimonialTypes";

interface Props {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between h-full">
      <div>
        <p className="text-gray-700 mb-4">{testimonial.message}</p>
        <div className="flex items-center space-x-2 text-yellow-500 mb-2">
          {Array.from({ length: testimonial.rating }, (_, i) => (
            <span key={i}>⭐</span>
          ))}
        </div>
        <p className="text-sm text-gray-500">{testimonial.date}</p>
      </div>
      <div className="mt-4">
        <p className="font-semibold text-gray-800">- {testimonial.name}</p>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Button } from "components/ui/Button";
import type { CreateTestimonial } from "modules/user/types/TestimonialTypes";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import { CreateTestimoniSchemaZod } from "modules/user/zod/testimoniSchema";

interface Props {
  userFullName: string;
  onSubmit: (testimonial: CreateTestimonial) => void;
  isSubmitting: boolean;
}

export default function TestimonialForm({
  onSubmit,
  userFullName,
  isSubmitting,
}: Props) {
  const [formData, setFormData] = useState({
    message: "",
    rating: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const shapedData = shapeTestimonialData(formData);
    const result = CreateTestimoniSchemaZod.safeParse(shapedData);
    console.log(result);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const shapeTestimonialData = (data: typeof formData): CreateTestimonial => {
    return {
      message: data.message,
      rating: parseInt(data.rating),
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    await new Promise((res) => setTimeout(res, 1000));

    const newTestimonial = shapeTestimonialData(formData);
    onSubmit(newTestimonial);
    setFormData({ message: "", rating: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Your Name *
        </label>
        <input
          id="name"
          type="text"
          value={userFullName ?? ""}
          disabled
          className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
        />
        <span className="text-xs font-light text-gray-400">
          Fullname are derived from your account registration name
        </span>
      </div>

      <div>
        <label
          htmlFor="rating"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Rating *
        </label>
        <select
          id="rating"
          value={formData.rating}
          onChange={(e) =>
            setFormData((p) => ({ ...p, rating: e.target.value }))
          }
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.rating ? "border-red-500" : "border-gray-300"
          }`}
          required={true}
        >
          <option value="" disabled>
            Select your rating
          </option>
          <option value="5">⭐⭐⭐⭐⭐ (5 stars - Excellent)</option>
          <option value="4">⭐⭐⭐⭐ (4 stars - Very Good)</option>
          <option value="3">⭐⭐⭐ (3 stars - Good)</option>
          <option value="2">⭐⭐ (2 stars - Fair)</option>
          <option value="1">⭐ (1 star - Poor)</option>
        </select>
        {errors.rating && (
          <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Your Review *
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) =>
            setFormData((p) => ({ ...p, message: e.target.value }))
          }
          placeholder="Tell us about your experience..."
          rows={4}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
            errors.message ? "border-red-500" : "border-gray-300"
          }`}
          required={true}
        ></textarea>
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message}</p>
        )}
        <p className="text-sm text-gray-500 mt-1">
          Minimum 10 characters ({formData.message.length}/10)
        </p>
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}

import { useState } from "react";
import { Button } from "components/ui/Button";
import type { Testimonial } from "modules/user/types/TestimonialTypes";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";

interface Props {
  onSubmit: (testimonial: Testimonial) => void;
}

export default function TestimonialForm({ onSubmit }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    rating: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.message.trim()) newErrors.message = "Review is required";
    else if (formData.message.length < 10)
      newErrors.message = "Minimum 10 characters";
    if (!formData.rating) newErrors.rating = "Rating is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 1000));

    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      name: formData.name,
      message: formData.message,
      rating: parseInt(formData.rating),
      date: new Date().toISOString().split("T")[0],
    };

    onSubmit(newTestimonial);
    toast.success("Thank you for your review!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    setFormData({ name: "", message: "", rating: "" });
    setIsSubmitting(false);
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
          value={formData.name}
          onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
          placeholder="Enter your full name"
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
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

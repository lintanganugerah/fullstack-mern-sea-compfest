import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "components/ui/Dialog";
import { Badge } from "components/ui/Badge";
import { Button } from "components/ui/Button";
import { formatPrice } from "utils/priceCalculator";
import { Link } from "react-router-dom";
import type { MealPlan } from "modules/user/types/MealPlanTypes";

interface MealPlanModalProps {
  plan: MealPlan | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MealPlanModal({
  plan,
  isOpen,
  onClose,
}: MealPlanModalProps) {
  if (!plan) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <DialogTitle className="text-2xl font-poppins text-primary">
              {plan.name}
            </DialogTitle>
            <Badge className="bg-accent text-white text-lg px-3 py-1">
              {formatPrice(plan.price)}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {plan.image && (
            <img
              src={plan.image}
              alt={plan.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          )}

          <div className="bg-secondary p-4 rounded-lg">
            <p className="text-gray-600 text-lg">{plan.description}</p>
          </div>

          <div className="flex gap-3 pt-4">
            <Link to="/subscription" className="flex-1">
              <Button className="w-full bg-primary hover:bg-primary/90">
                Subscribe to {plan.name}
              </Button>
            </Link>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

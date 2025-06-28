import { formatPrice } from "utils/priceCalculator";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "components/ui/Card";
import { Button } from "components/ui/Button";
import { Badge } from "components/ui/Badge";
import type { MealPlan } from "modules/user/types/MealPlanTypes";

interface MealPlanCardProps {
  plan: MealPlan;
  onViewDetails: (plan: MealPlan) => void;
}

const MealPlanCard = ({ plan, onViewDetails }: MealPlanCardProps) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-poppins text-primary">
            {plan.name}
          </CardTitle>
          <Badge className="bg-accent text-white">
            {formatPrice(plan.price)}
          </Badge>
        </div>
        <CardDescription className="text-muted-foreground">
          {plan.description}
        </CardDescription>
      </CardHeader>

      {plan.image && (
        <img
          src={plan.image}
          alt={plan.name}
          className="w-full h-48 object-cover rounded-lg mx-auto px-4 mt-2"
        />
      )}

      <CardContent className="flex-1 flex flex-col justify-end">
        <Button
          onClick={() => onViewDetails(plan)}
          className="w-full mt-6 bg-primary hover:bg-primary/90"
        >
          See More Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default MealPlanCard;

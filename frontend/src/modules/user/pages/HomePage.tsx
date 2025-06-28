import { Link } from "react-router-dom";
import { Button } from "components/ui/Button";
import { Utensils, Truck, Leaf, Clock, MapPin, Star } from "lucide-react";
import { Card, CardContent } from "components/ui/Card";

const HomePage = () => {
  const features = [
    {
      icon: Utensils,
      title: "Meal Customization",
      description: "Choose from all major plans tailored to your needs",
    },
    {
      icon: Truck,
      title: "Delivery to Major Cities",
      description:
        "Fresh meals delivered across Indonesia with reliable service",
    },
    {
      icon: Leaf,
      title: "Detailed Nutritional Info",
      description: "Complete nutritional breakdown for every meal we prepare",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Choose your meal times and delivery days that work for you",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6">
              Sea Catering
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Healthy Meals, Anytime, Anywhere
            </p>
            <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto opacity-80">
              Experience Indonesia's premier customizable healthy meal delivery
              service. Fresh, nutritious, and delicious meals crafted by our
              expert chefs and delivered straight to your door across major
              Indonesian cities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/menu">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-3"
                >
                  Explore Our Menu
                </Button>
              </Link>
              <Link to="/subscription">
                <Button
                  size="lg"
                  variant="secondary"
                  className="border-white text-zinc-900 hover:bg-white hover:text-primary font-semibold px-8 py-3"
                >
                  Start Your Subscription
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-800 mb-6">
              About Us!
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We are Indonesia's leading customizable healthy meal delivery
              service, committed to transforming the way you eat. Our mission is
              to make nutritious, delicious meals accessible to everyone across
              Indonesia's major cities. With our team of expert nutritionists
              and chefs, we create perfectly balanced meals that cater to your
              specific dietary needs and preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                Fresh ingredients sourced daily from trusted suppliers
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Nutritionist Approved
              </h3>
              <p className="text-gray-600">
                Every meal plan designed by certified nutrition experts
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wide Coverage</h3>
              <p className="text-gray-600">
                Delivering to major cities across Indonesia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-800 mb-6">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the features that make us Indonesia's preferred healthy
              meal delivery service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary text-white rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold font-poppins mb-6">
                  Ready to Get Started?
                </h2>
                <p className="text-lg opacity-90 mb-6">
                  Contact our team today to begin your journey toward healthier
                  eating habits
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Manager:</span>
                    <span className="opacity-90">Brian</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Phone:</span>
                    <span className="opacity-90">08123456789</span>
                  </div>
                </div>
              </div>
              <div className="text-center md:text-right">
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-3"
                  >
                    Contact Us Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

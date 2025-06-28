import { Card, CardContent, CardHeader, CardTitle } from "components/ui/Card";
import { Button } from "components/ui/Button";
import { Phone, MapPin, Clock, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-poppins text-gray-800 mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get in touch with our team. We're here to help you start your
            healthy eating journey and answer any questions you might have about
            our meal delivery service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-poppins text-primary">
                  Get In Touch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                    <p className="text-gray-600">08123456789</p>
                    <p className="text-sm text-gray-500">
                      Available 24/7 for your convenience
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Manager
                    </h3>
                    <p className="text-gray-600">Brian</p>
                    <p className="text-sm text-gray-500">
                      Your dedicated point of contact
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Service Area
                    </h3>
                    <p className="text-gray-600">
                      Major Cities Across Indonesia
                    </p>
                    <p className="text-sm text-gray-500">
                      Fast and reliable delivery nationwide
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Operating Hours
                    </h3>
                    <p className="text-gray-600">Monday - Sunday</p>
                    <p className="text-sm text-gray-500">6:00 AM - 10:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-poppins text-primary">
                  Why Choose ASA?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Fresh ingredients sourced daily
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Nutritionist-approved meal plans
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Customizable to your dietary needs
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Reliable delivery across Indonesia
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Affordable pricing for premium quality
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-poppins text-primary">
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    How does delivery work?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    We deliver fresh meals to your doorstep on your selected
                    days. Our delivery team ensures your meals arrive fresh and
                    on time.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Can I customize my meals?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Absolutely! Choose from our plans, select your meal types,
                    and specify any allergies or preferences.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    What areas do you serve?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    We currently deliver to major cities across Indonesia.
                    Contact us to check if we serve your area.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    How do I cancel or modify my subscription?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Contact Manager Brian at 08123456789 at least 24 hours
                    before your next delivery to make changes to your
                    subscription.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary to-primary/80 text-white">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold font-poppins my-4">
                  Ready to Start Your Healthy Journey?
                </h3>
                <p className="mb-6 opacity-90">
                  Join thousands of satisfied customers who have transformed
                  their eating habits with ASA.
                </p>
                <Link to={"/subscription"}>
                  <Button variant="accent">Get Started Today</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for beginners",
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        "Up to $10,000 trading volume",
        "Basic analytics",
        "Email support",
        "Mobile app access",
        "2 active portfolios",
      ],
      popular: false,
    },
    {
      name: "Professional",
      description: "For serious traders",
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        "Unlimited trading volume",
        "Advanced analytics & insights",
        "Priority 24/7 support",
        "API access",
        "Unlimited portfolios",
        "Real-time notifications",
        "Custom trading bots",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For institutions",
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced security features",
        "White-label solutions",
        "SLA guarantee",
        "Custom API limits",
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your trading needs
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-lg ${!isYearly ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-primary"
            />
            <span className={`text-lg ${isYearly ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
              Yearly
              <span className="ml-2 text-primary text-sm">(Save 17%)</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`glass p-8 rounded-2xl hover:bg-card/60 transition-all duration-300 relative animate-fade-in-up ${
                plan.popular ? "border-2 border-primary glow" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-accent text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <div className="mb-2">
                  <span className="text-5xl font-bold">
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    /{isYearly ? "year" : "month"}
                  </span>
                </div>
                {isYearly && plan.monthlyPrice > 0 && (
                  <p className="text-sm text-muted-foreground">
                    ${(plan.yearlyPrice / 12).toFixed(2)}/month billed annually
                  </p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full py-6 text-lg rounded-xl ${
                  plan.popular
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground glow-hover"
                    : "glass border-primary/20 hover:bg-primary/10"
                }`}
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.monthlyPrice === 0 ? "Get Started Free" : "Get Started"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { features } from "@/data/features";
import { testimonial } from "@/data/testimonial";
import { faqs } from "@/data/faqs";
import { howItWorks } from "@/data/howItWorks";

export default function LandingPage() {
  return (
    <>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-lime-50 via-olive-50 to-emerald-50"></div>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-lime-50 text-[#2d2d2d]">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 text-[#1b3c2e]">
            Powerful Features for Your Career Growth
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 border-lime-200 hover:border-lime-400 hover:shadow-lg hover:shadow-lime-200/40 transition-all duration-300 bg-white/90 backdrop-blur-sm"
              >
                <CardContent className="pt-6 text-center flex flex-col items-center">
                  <div className="flex flex-col items-center justify-center">
                    {feature.icon}
                    <h3 className="text-xl font-bold mb-2 text-[#1b3c2e]">
                      {feature.title}
                    </h3>
                    <p className="text-[#2d2d2d]/80">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-r from-lime-50 via-emerald-50 to-lime-100 text-[#1b3c2e]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {[
              { label: "Industries Covered", value: "50+" },
              { label: "Interview Questions", value: "1000+" },
              { label: "Success Rate", value: "95%" },
              { label: "AI Support", value: "24/7" },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center justify-center space-y-2">
                <h3 className="text-4xl font-bold text-[#1b3c2e]">{stat.value}</h3>
                <p className="text-[#2d2d2d]/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-b from-white via-lime-50 to-white text-[#2d2d2d]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#1b3c2e]">How It Works</h2>
            <p className="text-[#2d2d2d]/80">
              Four simple steps to accelerate your career growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-4 p-4 rounded-xl hover:bg-lime-100/40 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-lime-100 flex items-center justify-center text-[#1b3c2e] shadow-md shadow-lime-200/50">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-xl text-[#1b3c2e]">{item.title}</h3>
                <p className="text-[#2d2d2d]/80">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-r from-lime-50 to-emerald-50 text-[#2d2d2d]">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#1b3c2e]">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonial.map((t, index) => (
              <Card
                key={index}
                className="bg-white/90 border border-lime-200 shadow-md hover:shadow-lime-200/50 transition-all duration-300"
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="relative h-12 w-12 flex-shrink-0">
                        <Image
                          width={40}
                          height={40}
                          src={t.image}
                          alt={t.author}
                          className="rounded-full object-cover border-2 border-lime-300"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-[#1b3c2e]">{t.author}</p>
                        <p className="text-sm text-[#2d2d2d]/70">{t.role}</p>
                        <p className="text-sm text-lime-700 font-medium">{t.company}</p>
                      </div>
                    </div>
                    <blockquote>
                      <p className="text-[#2d2d2d]/80 italic relative">
                        <span className="text-3xl text-lime-500 absolute -top-4 -left-2">
                          &quot;
                        </span>
                        {t.quote}
                        <span className="text-3xl text-lime-500 absolute -bottom-4">
                          &quot;
                        </span>
                      </p>
                    </blockquote>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24 bg-white text-[#2d2d2d]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#1b3c2e]">
              Frequently Asked Questions
            </h2>
            <p className="text-[#2d2d2d]/80">
              Find answers to common questions about our platform
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-lime-200"
                >
                  <AccordionTrigger className="text-left text-[#1b3c2e] hover:text-lime-700">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#2d2d2d]/80">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-r from-lime-600 via-olive-600 to-emerald-700 text-white">
        <div className="mx-auto py-24 px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Accelerate Your Career?
            </h2>
            <p className="mx-auto max-w-[600px] text-white/90 md:text-xl">
              Join thousands of professionals who are advancing their careers
              with AI-powered guidance.
            </p>
            <Link href="/dashboard" passHref>
              <Button
                size="lg"
                className="h-11 mt-5 bg-white text-[#1b3c2e] font-semibold hover:bg-lime-100 shadow-lg"
              >
                Start Your Journey Today <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

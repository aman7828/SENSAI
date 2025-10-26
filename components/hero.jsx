"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full pt-32 md:pt-44 pb-16 bg-gradient-to-b from-lime-50 via-olive-50 to-emerald-100 overflow-hidden">
      {/* soft olive gradient blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-lime-200 via-olive-200 to-emerald-200 blur-[120px] rounded-full opacity-60 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-tl from-emerald-100 via-lime-200 to-green-100 blur-[140px] rounded-full opacity-50 animate-pulse" />
      </div>

      <div className="space-y-8 text-center px-6 md:px-12">
        <div className="space-y-6 mx-auto">
          <h1 className="text-5xl font-extrabold md:text-6xl lg:text-7xl xl:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-lime-700 via-olive-600 to-emerald-700 animate-gradient drop-shadow-sm">
            Your AI Career Coach for
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-olive-600 to-lime-600">
              Professional Success
            </span>
          </h1>
          <p className="mx-auto max-w-[650px] text-olive-700 md:text-xl leading-relaxed">
            Advance your career with personalized guidance, interview prep, and
            AI-powered tools for job success.
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="px-8 rounded-2xl text-lg font-semibold bg-gradient-to-r from-lime-600 via-olive-600 to-green-700 text-white hover:from-green-700 hover:to-lime-600 transition-all duration-300 shadow-lg shadow-lime-200/50"
            >
              Get Started
            </Button>
          </Link>
        </div>

        <div className="hero-image-wrapper mt-10 md:mt-16 relative">
          <div
            ref={imageRef}
            className="hero-image transition-transform duration-700 ease-out hover:scale-[1.02]"
          >
            <Image
              src="/banner3.jpeg"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-3xl border border-lime-200 shadow-[0_0_40px_rgba(132,204,22,0.25)] mx-auto backdrop-blur-sm"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

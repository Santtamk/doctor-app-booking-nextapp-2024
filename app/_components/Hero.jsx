import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
            <Image
              alt=""
              src="/doctors.webp"
              width={800}
              height={800}
              className="absolute inset-0 h-full w-full object-cover object-top rounded-3xl"
            />
          </div>

          <div className="lg:py-24">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Find & Book
              <span className="text-primary"> Appointment </span>
              with Top
              <span className="text-primary"> Doctors </span>
              Near You
            </h2>

            <p className="mt-4 text-gray-600">
              "Your health matters. Connect with the best doctors, book
              appointments instantly, and get the care you deserve."
            </p>

            <Button className="bg-primary mt-10">Explore Now</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

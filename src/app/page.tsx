import Image from "next/image";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-50 px-8 md:px-16 flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-4xl mb-4 text-gray-800">Optimize Your Nutrition Journey with Smart Meal Planning</h1>
        <p className="text-lg text-gray-600 mb-8">Discover personalized meal plans tailored to your dietary goals and preferences</p>
        <Link href="/forms">
          <Button variant="accent" size="lg" className="font-semibold mb-40">
            Generate Meal Plan
          </Button>
        </Link>
      </section>

      {/* Start Your Journey Section */}
      <section className="py-30 px-8 md:px-16 bg-[#FEFAF8]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 flex justify-center">
            <Image src="/assets/homepage/hero-section.svg" alt="Journey Illustration" width={320} height={240} className="w-full max-w-sm" />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl md:text-3xl mb-4 text-gray-800">Start Your Healthy Journey Today!</h2>
            <p className="text-gray-600 mb-6">Easily plan your healthy diet with Dietify. Get personalized meal schedules and make your dieting journey more enjoyable.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-8 md:px-16 pb-50 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mt-30 mb-16 text-center text-gray-800">Why Choose us?</h2>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 bg-[#EAFEFC] p-4 rounded-xl shadow-md">
                <Image src="/assets/homepage/feature.svg" alt="Personalized Menu" width={64} height={64} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Personalized Menu</h3>
              <p className="text-gray-600">Food recommendations tailored to your tastes, allergies, and personal nutritional needs.</p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 bg-[#EAFEFC] p-4 rounded-xl shadow-md">
                <Image src="/assets/homepage/feature.svg" alt="Instant Access" width={64} height={64} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Instant Access</h3>
              <p className="text-gray-600">Just fill in your data and get instant results.</p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 bg-[#EAFEFC] p-4 rounded-xl shadow-md">
                <Image src="/assets/homepage/feature.svg" alt="Smart Optimization" width={64} height={64} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Smart Optimization</h3>
              <p className="text-gray-600">Your diet menu is optimized using the Particle Swarm Optimization (PSO) algorithm to match your specific diet goals.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

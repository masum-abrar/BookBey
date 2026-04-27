"use client"
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { defaultBooks } from '@/data/books';


import HeroSection from '@/components/HeroSection';
import StatsStrip from '@/components/StatsStrip';
import FeaturedGrid from '@/components/FeaturedGrid';
import JourneySection from '@/components/JourneySection';
import SpotlightSection from '@/components/SpotlightSection';
import FeaturesGrid from '@/components/FeaturesGrid';
import FAQSection from '@/components/FAQSection';


export default function HomePage() {
  const featuredBooks = defaultBooks.slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <HeroSection books={defaultBooks} />
        <StatsStrip />
        <FeaturedGrid books={featuredBooks} />
        <JourneySection />
        <SpotlightSection />
        <FeaturesGrid />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
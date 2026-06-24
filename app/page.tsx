'use client';

import { CheckoutProvider } from '@/lib/CheckoutContext';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PaymentModal } from '@/components/PaymentModal';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Audience } from '@/components/sections/Audience';
import { Skills } from '@/components/sections/Skills';
import { Program } from '@/components/sections/Program';
import { Cases } from '@/components/sections/Cases';
import { Courses } from '@/components/sections/Courses';
import { Pricing } from '@/components/sections/Pricing';
import { Payment } from '@/components/sections/Payment';
import { Reviews } from '@/components/sections/Reviews';
import { FAQ } from '@/components/sections/FAQ';
import { Contacts } from '@/components/sections/Contacts';

export default function Home() {
  return (
    <CheckoutProvider>
      <AmbientBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Audience />
        <Skills />
        <Program />
        <Cases />
        <Courses />
        <Pricing />
        <Payment />
        <Reviews />
        <FAQ />
        <Contacts />
      </main>
      <Footer />
      <PaymentModal />
    </CheckoutProvider>
  );
}

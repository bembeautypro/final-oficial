import React, { memo, lazy, Suspense } from "react";
import Header from "@/components/landing/Header";
import Manifesto from "@/components/landing/Manifesto";
import ProductSection from "@/components/landing/ProductSection";
import Footer from "@/components/landing/Footer";
import ScrollIndicator from "@/components/landing/ScrollIndicator";

// Lazy load heavy components that are below-the-fold
const CompleteTechnologySection = lazy(() => import("@/components/landing/CompleteTechnologySection"));
const AmazonIngredientsSection = lazy(() => import("@/components/landing/AmazonIngredientsSection"));
const SynergyCallout = lazy(() => import("@/components/landing/SynergyCallout"));
const BemTechSection = lazy(() => import("@/components/landing/BemTechSection"));
const DistributorSection = lazy(() => import("@/components/landing/DistributorSection"));
const FAQSection = lazy(() => import("@/components/landing/FAQSection"));
const PreFooter = lazy(() => import("@/components/landing/PreFooter"));

const Index = memo(() => {

  return (
    <div className="relative min-h-screen bg-background font-montserrat scroll-smooth">
      <ScrollIndicator />
      <main id="main-content" tabIndex={-1}>
          <Header id="inicio" />
          <Manifesto id="manifesto" />
          <ProductSection id="produto" />
          
          {/* Complete Technology Section with all 3 parts */}
          <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>}>
            <CompleteTechnologySection id="tecnologia" />
          </Suspense>
          
          <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>}>
            <AmazonIngredientsSection id="ingredientes" />
          </Suspense>

          <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>}>
            <SynergyCallout id="sinergia" />
          </Suspense>
          
          <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>}>
            <BemTechSection id="bemtech" />
          </Suspense>
          
          <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>}>
            <DistributorSection id="distributor" />
          </Suspense>
          
          <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>}>
            <FAQSection id="faq" />
          </Suspense>
          
          <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>}>
            <PreFooter id="prefooter" />
          </Suspense>
          
          <Footer id="contato" />
      </main>
    </div>
  );
});

Index.displayName = 'Index';

export default Index;

"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/navbar/nabar";
import { useEffect, useState } from "react";
import { star, code, group, tool } from "@/utils/icons";
import Feature from "@/components/feature/feature";
import Step from "@/components/works/works";
import Footer from "@/components/footer/footer";

// Image imports

import ai from "../../public/features/ai.png";
import strategy from "../../public/features/strategy.png";
import pkg from "../../public/features/package.png";
import time from "../../public/features/time.png";
import market from "../../public/features/market.png";
import support from "../../public/features/support.png";
import PricingCard from "@/components/pricing/pricing";
import Link from "next/link";
import { siteConfig } from "@/configs/site";

export default function Home() {
  const [variantIndex, setVariantIndex] = useState(0);
  const [fade, setFade] = useState("fade-in");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFade("fade-out");
      setTimeout(() => {
        setVariantIndex((prevIndex) => (prevIndex + 1) % siteConfig.variants.length);
        setFade("fade-in");
      }, 600);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [variantIndex]);

  const variant = siteConfig.variants[variantIndex];

  // Function to handle plan selection

  const handlePlanSelection = (planName: string) => {
    const baseUrl = "https://ledgeworks.gumroad.com/l/bjorge";
    window.location.href = baseUrl;
  };

  const icons = {
    ai,
    strategy,
    pkg,
    time,
    market,
    support,
  };

  // The same imports and setup remain...

  // Only copy changes in the return statement:
  return (
    <main className={styles.main}>
      <div className={styles.heroContainer}>
        <Navbar />
        <section className={styles.hero}>
          <div className={styles.heroleft}>
            <div className={styles.herolefttop}>
              <h1>
                Land your next <span className={`${styles.herovariant} ${styles[fade]}`}>{variant}</span> role easier.
              </h1>
            </div>
            <div className={styles.heroDescription}>
              <p>
                NextFit AI uses <span>AI-powered intelligence</span> to analyze your fit for jobs and maximize interview
                callbacks. Save time applying only to roles where you'll succeed.
              </p>
            </div>
            <Link
              href='/get-started'
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <button>Optimize My Resume Now</button>
            </Link>
            <div className={styles.trusted}>
              <div>
                <span>{star}</span>
                <span>{star}</span>
                <span>{star}</span>
                <span>{star}</span>
                <span>{star}</span>
              </div>
              <div>
                <p>85% higher callback rate</p>
              </div>
            </div>
          </div>
          <div className={styles.imgContainer}>
            <Image
              src={"/brain.png"}
              width={500}
              height={500}
              alt='AI Resume Optimization'
              className={styles.brainImage}
            />
          </div>
        </section>
      </div>

      <section className={styles.features}>
        <div>
          <h2>Why use NextFit AI?</h2>
        </div>
        <div className={styles.feature}>
          {siteConfig.features.map((feature) => (
            <Feature
              key={feature.id}
              {...feature.theme}
              featureIcon={icons[feature.icon]}
              title={feature.title}
              description={feature.description}
              stats={feature.stats}
            />
          ))}
        </div>
      </section>

      <section className={styles.works} id='how-it-works'>
        <div>
          <h2>How it Works</h2>
        </div>
        <div className={styles.steps}>
          {siteConfig.steps.map((step) => (
            <Step
              key={step.number}
              number={step.number}
              stepTitle={step.stepTitle}
              stepDescription={step.stepDescription}
            />
          ))}
        </div>
      </section>

      <section className={styles.pricing} id='pricing'>
        <div className={styles.pricingHeader}>
          <h2>Simple, transparent pricing</h2>
          <p>Choose the plan that's right for your job search</p>
        </div>

        <div className={styles.pricingCards}>
          {siteConfig.plans.map((plan, index) => (
            <PricingCard key={index} {...plan} onSelectPlan={() => handlePlanSelection(plan.name)} />
          ))}
        </div>

        <div className={styles.pricingFooter}>
          <div className={styles.guarantee}>
            <Image src='/guarantee.png' alt='Money Back Guarantee' width={50} height={50} />
            <p>100% Money Back Guarantee if we don't save you time and improve your callbacks</p>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <h2>Ready to land more interviews?</h2>
        <Link
          href='/get-started'
          style={{
            textDecoration: "none",
            color: "white",
          }}
        >
          <button>Optimize My Resume Now</button>
        </Link>
      </section>

      <section className={styles.footer}>
        <Footer />
      </section>
    </main>
  );
}

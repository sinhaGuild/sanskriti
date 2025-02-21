"use client"
import CharacterParallax from "@/components/home/CharacterParallax";
import Description from "@/components/home/Description";
import Intro from "@/components/home/Intro";
import Section from "@/components/home/Section";
import SmoothScrollParallax from "@/components/home/SmoothScrollParallax";
import ZoomParallax from "@/components/home/ZoomParallax";
import { getHomePageContent as prose } from "@/components/site-wide/site-config";
import { zp1, zp2 } from "@/components/site-wide/site-prose";
import { useEffect, useState } from "react";


export default function Homepage() {
  const [dimension, setDimension] = useState({ width: 0, height: 0 })

  useEffect(() => {

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    // const lenis = new Lenis()
    // function raf(time: number) {
    //   lenis.raf(time)
    //   requestAnimationFrame(raf)
    // }
    // requestAnimationFrame(raf)

    resize();

    return () => {
      window.removeEventListener('resize', resize);
    };

  }, []);


  return (

    <main className="pr-0">
      <div className="mt-[50vh]">
        <ZoomParallax images={zp1} />
      </div>
      <div className="-mt-[30vh]"></div>
      <Intro />
      <Description description={prose.hero} />
      <Section section={prose.sub} />
      <div className="h-[50vh]"></div>
      <CharacterParallax paragraph={prose.hero3} />
      <div className="-mt-[30vh]"></div>
      <SmoothScrollParallax dimension={dimension} />
      <div className="-mt-[50vh]"></div>
      <Description description={prose.sub3} />
      <div className="mt-[50vh]">
        <ZoomParallax images={zp2} />
      </div>
      <Section section={prose.hero4} />
      <div className="h-[50vh]"></div>
      <CharacterParallax paragraph={prose.hero5} variant="right" />
    </main>

  );
}

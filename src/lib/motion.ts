"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

let registered = false;
export function registerGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const isFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
export const isDesktop = () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;

/* A single shared Lenis instance — never create a second smooth-scroll system. */
let lenis: Lenis | null = null;
export const setLenis = (l: Lenis | null) => { lenis = l; };
export const getLenis = () => lenis;
export const lockScroll = () => { lenis?.stop(); document.documentElement.style.overflow = "hidden"; };
export const unlockScroll = () => { lenis?.start(); document.documentElement.style.overflow = ""; };

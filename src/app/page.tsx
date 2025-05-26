"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Home() {
  const router = useRouter();

  useEffect(()=> {
    router.replace("/reception")
  }, [])

  return null
}

import type { Viewport } from 'next'
 
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported but less commonly used
  // interactiveWidget: 'resizes-visual',
}

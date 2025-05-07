// src/lib/initSDK.ts
import {
    backButton,
    init,
    initData,
    miniApp,
    swipeBehavior,
    viewport,
  } from "@telegram-apps/sdk-react";
  
  export async function initSDK(): Promise<string> {
    init();
  
    if (!backButton.isSupported() || !miniApp.isSupported()) {
      return Promise.reject("Telegram Web App komponentlari qo‘llab-quvvatlanmayapti.");
    }
  
    setTimeout(async () => {
      if (viewport.mount.isAvailable()) {
        await viewport.mount();
        viewport.expand();
      }
      if (viewport.requestFullscreen.isAvailable()) { 
        await viewport.requestFullscreen();
      }
    }, 0);
  
    if (swipeBehavior.mount.isAvailable()) {
      await swipeBehavior.mount();
    }
  
    await backButton.mount();
    await miniApp.mount();
    initData.restore();
  
    return "done";
  }
  
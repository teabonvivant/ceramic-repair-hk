"use client";

if (import.meta.env.DEV) {
  void import("react-grab");
  void import("react-scan").then(({ scan }) => scan({ enabled: true }));
}

export function DevTools() {
  return null;
}

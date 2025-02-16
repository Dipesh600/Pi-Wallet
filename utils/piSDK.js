export const loadPiSDK = () => {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://sdk.minepi.com/pi-sdk.js";
      script.async = true;
      script.onload = () => resolve(window.Pi);
      script.onerror = () => reject(new Error("Failed to load Pi SDK"));
      document.body.appendChild(script);
    } else {
      reject(new Error("Window is not defined"));
    }
  });
};

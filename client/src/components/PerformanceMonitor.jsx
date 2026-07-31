import { useEffect } from "react";
import { onCLS, onINP, onLCP } from "web-vitals";

export default function PerformanceMonitor() {
  useEffect(() => {
    onCLS(console.log);
    onLCP(console.log);
    onINP(console.log);
  }, []);

  return null;
}

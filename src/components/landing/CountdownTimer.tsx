import { useState, useEffect } from "react";
import { WEBINAR_DATE } from "@/lib/constants";

interface TimeUnit {
  value: number;
  label: string;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([]);

  useEffect(() => {
    const calculate = () => {
      const now = new Date().getTime();
      const target = WEBINAR_DATE.getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft([
          { value: 0, label: "Days" },
          { value: 0, label: "Hours" },
          { value: 0, label: "Minutes" },
          { value: 0, label: "Seconds" },
        ]);
        return;
      }

      setTimeLeft([
        { value: Math.floor(diff / (1000 * 60 * 60 * 24)), label: "Days" },
        { value: Math.floor((diff / (1000 * 60 * 60)) % 24), label: "Hours" },
        { value: Math.floor((diff / (1000 * 60)) % 60), label: "Minutes" },
        { value: Math.floor((diff / 1000) % 60), label: "Seconds" },
      ]);
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-3 sm:gap-4 justify-center">
      {timeLeft.map((unit) => (
        <div
          key={unit.label}
          className="flex flex-col items-center bg-secondary/50 border border-border rounded-lg px-3 py-2 sm:px-5 sm:py-3 min-w-[64px] sm:min-w-[80px] backdrop-blur-sm"
        >
          <span className="text-2xl sm:text-4xl font-bold font-mono text-primary tabular-nums">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;

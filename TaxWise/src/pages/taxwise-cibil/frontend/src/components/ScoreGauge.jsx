import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";

export default function ScoreGauge({ score }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 5;
      if (current >= score) {
        current = score;
        clearInterval(interval);
      }
      setValue(current);
    }, 20);
    return () => clearInterval(interval);
  }, [score]);

  const percentage = ((value - 300) / (900 - 300)) * 100;

  let pathColor = "#22c55e"; // green default
  if (score < 600) pathColor = "#ef4444"; // red
  else if (score < 750) pathColor = "#facc15"; // yellow

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="w-40 h-40 mx-auto"
    >
      <CircularProgressbar
        value={percentage}
        text={`${value}`}
        styles={buildStyles({
          pathColor,
          textColor: "#1f2937",
          textSize: "20px",
          trailColor: "#e5e7eb",
        })}
      />
    </motion.div>
  );
}

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const images = [
  { src: "src/assets/analytics2.svg", top: 100, left: 350 },
  { src: "src/assets/schedule.svg", top: 300, left: 80 },
  { src: "src/assets/creditcard.svg", top: 700, left: 360 },
  { src: "src/assets/calender.svg", top: 100, left: window.innerWidth - 400 },
  { src: "src/assets/analytics.svg", top: 350, left: window.innerWidth - 510 },
  { src: "src/assets/wallet.svg", top: 550, left: window.innerWidth - 300 },
  { src: "src/assets/analytics1.svg", top: 20, left: window.innerWidth / 2 - 50 },
  { src: "src/assets/reports.svg", top: window.innerHeight - 120, left: window.innerWidth / 2 + 50 },
];

const FloatingImage = ({ src, alt, style }) => (
  <motion.img
    src={src}
    alt={alt}
    className="w-32 h-32 object-cover fixed"
    style={{ ...style, zIndex: -1 }}
    animate={{ opacity: [0.8, 1, 0.8], scale: [0.9, 1, 0.9] }}
    transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
  />
);

const CursorTrail = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Faster response by increasing stiffness & reducing damping
  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        position: "fixed",
        width: 15, // Smaller circle
        height: 15,
        background: "radial-gradient(circle, rgba(74, 3, 255, 0.8), rgba(155,138,255, 0.8))",
        borderRadius: "50%",
        filter: "blur(6px)", // Glow effect
        top: smoothY,
        left: smoothX,
        transform: "translate(-50%, -50%)", // Keeps cursor centered
        pointerEvents: "none",
        zIndex: 9999,
        boxShadow: "0 0 10px rgba(0, 255, 255, 0.7)", // Soft glow
      }}
    />
  );
};






const FloatingBackground = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const savedPositions = JSON.parse(localStorage.getItem("imagePositions"));

    if (savedPositions) {
      setPositions(savedPositions);
    } else {
      setPositions(images);
      localStorage.setItem("imagePositions", JSON.stringify(images));
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      localStorage.removeItem("imagePositions");
      window.location.reload();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <CursorTrail />
      <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: -1 }}>
        {positions.map((pos, index) => (
          <FloatingImage key={index} src={pos.src} alt={`Floating ${index}`} style={{ top: pos.top, left: pos.left }} />
        ))}
      </div>
    </>
  );
};

export default FloatingBackground;

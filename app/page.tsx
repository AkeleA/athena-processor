"use client";
import Image from "next/image";
import Landhere from "@/public/LandHere.jpg";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  //router for pushing to another route
  const router = useRouter();

  const lines = [
    ["Expect", "greatness"],
    ["Receive", "Excellence"],
  ];

  //using mounted for hydration errors
  const [mounted, setMounted] = useState(false);
  const [headingVisible, setHeadingVisible] = useState(false);
  const [wordStates, setWordStates] = useState(lines.flat().map(() => false));
  const [isAnimating, setIsAnimating] = useState(true);

  // Handle mounting so I avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const pushToLogin = () => {
    router.push("/login");
  };

  const pushToSignUp = () => {
    router.push("/signup");
  };

  useEffect(() => {
    // Only start animations after the component is mounted
    if (!mounted) return;

    const runAnimationCycle = () => {
      setIsAnimating(true);

      // Reset all states
      setHeadingVisible(false);
      setWordStates(lines.flat().map(() => false));

      // Animate heading first
      setTimeout(() => {
        setHeadingVisible(true);
      }, 500);

      // Animate words sequentially
      lines.flat().forEach((_, index) => {
        setTimeout(() => {
          setWordStates((prev) => {
            const newStates = [...prev];
            newStates[index] = true;
            return newStates;
          });
        }, 2000 + index * 2500);
      });

      setTimeout(() => {
        setIsAnimating(false);
      }, 12000);
    };

    const handleAnimationCycle = () => {
      runAnimationCycle();

      const intervalId = setInterval(() => {
        runAnimationCycle();
      }, 72000);

      return () => clearInterval(intervalId);
    };

    handleAnimationCycle();
  }, [mounted]); // mounted in dependency array

  // Don't render animations until after mount to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-full flex flex-row items-center justify-between h-screen bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="w-1/2 h-full relative">
          <Image
            src={Landhere}
            alt="I am Possible"
            priority
            fill
            className="object-cover"
          />
        </div>
        <div className="w-1/2 h-full flex flex-col space-y-12 justify-center items-start py-8 pl-10 pr-14">
          <h1 className="text-white text-2xl font-bold">
            AI-Powered Text Processing
          </h1>
          <p className="text-5xl space-y-2">
            <span className="block">Expect greatness</span>
            <span className="block">Receive Excellence</span>
          </p>
          <div className="flex w-8/12 items-center justify-between gap-4">
            <button className="px-6 py-3 rounded-lg bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
              Login
            </button>
            <button className="px-6 py-3 rounded-lg bg-white text-blue-900 hover:bg-white/90 transition-all duration-300 font-medium">
              Create Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-row font-outfit items-center justify-between h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      <div className="w-1/2 h-full relative">
        <Image
          src={Landhere}
          alt="I am Possible"
          priority
          fill
          className="object-cover"
        />
      </div>
      <div className="w-1/2 h-full flex flex-col space-y-12 justify-center items-start py-8 pl-10 pr-14">
        <h1
          className={`text-white text-2xl font-bold transform transition-all duration-1000 ${
            headingVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          AI-Powered Text Processing
        </h1>

        <p className="text-5xl space-y-2">
          {lines.map((line, lineIndex) => (
            <span key={lineIndex} className="block">
              {line.map((word, wordIndex) => {
                const wordStateIndex = lineIndex * 2 + wordIndex;
                return (
                  <span key={wordIndex}>
                    <span
                      className={`inline-block transform transition-all duration-700 ${
                        lineIndex === 0
                          ? "text-white/90 font-medium"
                          : "text-white font-bold"
                      } ${
                        wordStates[wordStateIndex]
                          ? "translate-y-0 opacity-100"
                          : "translate-y-4 opacity-0"
                      }`}
                    >
                      {word}
                    </span>
                    {/* Add space between words, but not after the last word in a line */}
                    {wordIndex < line.length - 1 && (
                      <span className="inline-block mx-2"> </span>
                    )}
                  </span>
                );
              })}
            </span>
          ))}
        </p>

        <div
          className={`flex w-8/12 items-center justify-between gap-4 transform transition-all duration-700 ${
            isAnimating
              ? "translate-y-4 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          <button
            onClick={() => pushToLogin()}
            className="px-6 py-3 rounded-lg bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
          >
            Login
          </button>
          <button
            onClick={() => pushToSignUp()}
            className="px-6 py-3 rounded-lg bg-white text-blue-900 hover:bg-white/90 transition-all duration-300 font-medium"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

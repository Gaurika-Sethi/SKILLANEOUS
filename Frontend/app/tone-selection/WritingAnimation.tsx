"use client";

import { useEffect, useState } from "react";

export default function WritingAnimation() {
  const [textLength, setTextLength] = useState(0);
  const [maxLength, setMaxLength] = useState(30);
  const [isCrampling, setIsCrampling] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [cycle, setCycle] = useState(0);

  const sampleTexts = [
    "Crafting your professional narrative",
    "Fine-tuning your career story",
    "Optimizing your achievements",
    "Polishing your resume",
    "Tailoring your experience",
    "Highlighting your strengths",
    "Refining your skills section",
    "Perfecting your qualifications",
  ];

  // Start a new writing cycle
  useEffect(() => {
    const randomText =
      sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setMaxLength(randomText.length);
    setDisplayText(randomText);
    setTextLength(0);
    setIsCrampling(false);

    // Typing animation with random speed
    const typingSpeed = 20 + Math.random() * 20; // 20-40ms per character
    const typer = setInterval(() => {
      setTextLength((prev) => {
        if (prev < randomText.length) {
          return prev + 1;
        } else {
          clearInterval(typer);
          // Start crumpling after typing is done
          setTimeout(() => setIsCrampling(true), 600);
          return prev;
        }
      });
    }, typingSpeed);

    return () => clearInterval(typer);
  }, [cycle]);

  // Handle crumpling and reset for next cycle
  useEffect(() => {
    if (isCrampling) {
      const crumplingTimer = setTimeout(() => {
        // Trigger next cycle
        setCycle((prev) => prev + 1);
      }, 1400); // Duration of crumpling animation + delay before next cycle

      return () => clearTimeout(crumplingTimer);
    }
  }, [isCrampling]);

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="relative w-full max-w-2xl px-6">
        {/* Animated notebook/paper effect */}
        <div className="relative h-64">
          {/* Paper background with enhanced styling */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 rounded-2xl p-12 shadow-2xl transition-all duration-700 ${
              isCrampling
                ? "scale-[0.82] rotate-12 opacity-5 blur-sm"
                : "scale-100 rotate-0 opacity-100 blur-0"
            }`}
          >
            {/* Lined paper effect */}
            <div className="space-y-4 h-full">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent transition-opacity duration-700`}
                  style={{
                    opacity: isCrampling ? 0 : 0.6,
                  }}
                />
              ))}
            </div>

            {/* Typing text with better positioning */}
            <div className="absolute inset-12 flex items-center font-serif text-2xl text-gray-800 leading-relaxed">
              <span
                className={`inline-block transition-all duration-700 ${
                  isCrampling
                    ? "scale-75 opacity-0 blur-md"
                    : "scale-100 opacity-100 blur-0"
                }`}
              >
                {displayText.substring(0, textLength)}
              </span>
              {/* Blinking cursor - smooth animation */}
              {!isCrampling && textLength < maxLength && (
                <span 
                  className="inline-block w-0.5 h-8 bg-gray-700 ml-1" 
                  style={{
                    animation: "blink 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                  }}
                />
              )}
              {/* Cursor after text completes */}
              {!isCrampling && textLength === maxLength && (
                <span 
                  className="inline-block w-1 h-8 bg-cyan-500 ml-2" 
                  style={{
                    animation: "pulse-cursor 1.5s ease-in-out infinite",
                  }}
                />
              )}
            </div>
          </div>

          {/* Crumpling particles effect - enhanced */}
          {isCrampling && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(12)].map((_, i) => {
                const startX = 50 + Math.random() * 30 - 15;
                const startY = 50 + Math.random() * 30 - 15;
                const endX = startX + (Math.random() * 100 - 50);
                const endY = startY - (60 + Math.random() * 40);
                
                return (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full"
                    style={{
                      left: `${startX}%`,
                      top: `${startY}%`,
                      animationName: "float-away",
                      animationDuration: `${0.9 + Math.random() * 0.6}s`,
                      animationTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                      animationFillMode: "forwards",
                      animationDelay: `${i * 0.04}s`,
                      boxShadow: "0 0 6px rgba(253, 224, 71, 0.5)",
                    }}
                  />
                );
              })}
            </div>
          )}

          {/* Glow effect behind paper */}
          <div
            className={`absolute inset-0 rounded-2xl blur-3xl transition-opacity duration-700 pointer-events-none ${
              isCrampling ? "opacity-0" : "opacity-40"
            }`}
            style={{
              background: "radial-gradient(circle, rgba(253, 224, 71, 0.3) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Status text with animations */}
        <div className="text-center mt-16">
          <p className="text-lg font-medium bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
            {isCrampling ? "Refining..." : "Composing..."}
          </p>
          <p className="text-gray-400 text-sm mt-3 font-light">
            Your resume is being tailored to perfection
          </p>

          {/* Animated dots - improved design */}
          <div className="flex justify-center gap-2 mt-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-full shadow-lg shadow-cyan-500/50"
                style={{
                  animationName: "bounce",
                  animationDuration: "1.4s",
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Enhanced CSS animations */}
        <style>{`
          @keyframes float-away {
            0% {
              opacity: 1;
              transform: translate(0, 0);
              filter: blur(0);
            }
            100% {
              opacity: 0;
              transform: translate(var(--tx), var(--ty));
              filter: blur(4px);
            }
          }

          @keyframes blink {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.3;
            }
          }

          @keyframes pulse-cursor {
            0%, 100% {
              box-shadow: 0 0 0 0 rgba(0, 188, 212, 0.7);
            }
            50% {
              box-shadow: 0 0 0 8px rgba(0, 188, 212, 0);
            }
          }

          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
              opacity: 1;
            }
            50% {
              transform: translateY(-12px);
              opacity: 0.7;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

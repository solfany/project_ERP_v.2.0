import React, { useRef, useEffect } from "react";
import { gsap, Elastic } from "gsap";
import DownBtn from "./DownBtn.css";

function DownloadButton() {
  const buttonsRef = useRef(null);

  useEffect(() => {
    const buttons = buttonsRef.current.childNodes;

    buttons.forEach((button) => {
      const duration = 3000;
      const svg = button.querySelector("svg");

      const svgPath = new Proxy(
        {
          y: 20,
          smoothing: 0,
        },
        {
          set(target, key, value) {
            target[key] = value;
            if (target.y !== null && target.smoothing !== null) {
              svg.innerHTML = getPath(target.y, target.smoothing, null);
            }
            return true;
          },
        }
      );

      button.style.setProperty("--duration", duration);

      button.addEventListener("click", (e) => {
        e.preventDefault();

        if (!button.classList.contains("loading")) {
          button.classList.add("loading");

          gsap.to(svgPath, {
            smoothing: 0.3,
            duration: (duration * 0.065) / 1000,
          });

          gsap.to(svgPath, {
            y: 12,
            duration: (duration * 0.265) / 1000,
            delay: (duration * 0.065) / 1000,
            ease: Elastic.easeOut.config(1.12, 0.4),
          });

          setTimeout(() => {
            svg.innerHTML = getPath(0, 0, [
              [3, 14],
              [8, 19],
              [21, 6],
            ]);
          }, duration / 2);
        }
      });
    });
  }, []);

  return (
    <div className="container" ref={buttonsRef}>
      <a href="#" className="button">
        <ul>
          <li>&#68;ownload</li>
          <li>&#68;ownloading</li>
          <li>Open File</li>
        </ul>
        <div>
          <svg viewBox="0 0 24 24"></svg>
        </div>
      </a>
      {/* ... Remaining buttons */}
      <a
        href="https://dribbble.com/shots/7299868-Download-Buttons"
        className="dribbble"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://cdn.dribbble.com/assets/dribbble-ball-mark-2bd45f09c2fb58dbbfb44766d5d1d07c5a12972d602ef8b32204d28fa3dda554.svg"
          alt="Dribbble"
        />
      </a>
    </div>
  );
}

// ... getPoint and getPath functions go here ...

export default DownloadButton;

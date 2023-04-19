import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./styles.css";

const ParallaxGallery = () => {
  const galleryRef = useRef(null);
  const blocksRef = useRef([]);

  useEffect(() => {
    const blocks = blocksRef.current;

    blocks.forEach((block, index) => {
      let b = block.getBoundingClientRect();
      block.cx = b.left + b.width / 2 + window.pageXOffset;
      block.cy = b.top + b.height / 2 + window.pageYOffset;

      block.tween = gsap
        .to(block, { scale: 3, ease: "power1.in", paused: true })
        .progress(1)
        .progress(0);
    });

    const handleMouseMove = (e) => {
      let i = blocks.length,
        dx,
        dy,
        block;
      while (i--) {
        block = blocks[i];
        dx = (block.cx - e.pageX) ** 2;
        dy = (block.cy - e.pageY) ** 2;
        block.tween.progress(1 - (dx + dy) / (300 * 300));
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleGalleryMouseMove = (e) => {
    const gallery = galleryRef.current;
    const mouseX = e.clientX,
      mouseY = e.clientY;

    const xDecimal = mouseX / window.innerWidth,
      yDecimal = mouseY / window.innerHeight;

    const maxX = gallery.offsetWidth - window.innerWidth,
      maxY = gallery.offsetHeight - window.innerHeight;

    const panX = maxX * xDecimal * -1,
      panY = maxY * yDecimal * -1;

    gallery.animate(
      {
        transform: `translate(${panX}px, ${panY}px)`,
      },
      {
        duration: 4000,
        fill: "forwards",
        easing: "ease",
      }
    );
  };

  return (
    <>
      <h1 id="margin">Jamie HUghes</h1>
      <div id="gallery" ref={galleryRef} onMouseMove={handleGalleryMouseMove}>
        {Array(30)
          .fill()
          .map((_, index) => (
            <div
              key={index}
              className="block"
              ref={(el) => (blocksRef.current[index] = el)}
            ></div>
          ))}
      </div>
    </>
  );
};

export default ParallaxGallery;

import React, { useEffect, useRef, useState } from "react";

function Solution() {
  // Inline komponent for hvert ikon med tilhørende tekst
  const IconItem = ({ imgSrc, alt, title, description }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Stopp observering når elementet er synlig
          }
        },
        { threshold: 0.75 } // 50% av elementet må være synlig
      );
      if (ref.current) {
        observer.observe(ref.current);
      }
      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, []);

    return (
      <div ref={ref}>
        <img src={imgSrc} alt={alt} />
        <h3 className="icon-text">{title}</h3>
        {/* Legg til klassen "visible" hvis isVisible er true */}
        <p className={isVisible ? "visible" : ""}>{description}</p>
      </div>
    );
  };

  return (
    <section id="solution">
      <h2>Solution</h2>
      <p>
        At PlantPoly, we believe sustainability shouldn’t come at the cost of
        quality. Our innovative fabric is designed to reduce waste, lower
        emissions, and offer a true alternative to traditional polyester—without
        compromising performance. Here’s what sets us apart:
      </p>
      <div className="icon">
        <IconItem 
          imgSrc="./assets/recycle-icon.png"
          alt="Recycle icon"
          title="Recycled Food"
          description="Our fabric is made from vegetable waste that would otherwise end up in landfills, giving new life to food byproducts."
        />
        <IconItem 
          imgSrc="./assets/leaf-icon.png"
          alt="Leaf icon"
          title="Bio-Based Material"
          description="Our fabric is 80% bio-based, and we are actively developing a 100% plant-based solution through ongoing research and innovation."
        />
        <IconItem 
          imgSrc="./assets/scale-icon.png"
          alt="Scale icon"
          title="Carbon-Neutral"
          description="We are carbon neutral, providing a sustainable alternative to recycled polyester, which still has a significant carbon footprint."
        />
        <IconItem 
          imgSrc="./assets/world-icon.png"
          alt="World icon"
          title="Eco-Friendly"
          description="We are committed to making the world a greener place, one garment at a time."
        />
        <IconItem 
          imgSrc="./assets/check-icon.png"
          alt="Check icon"
          title="Quality Assured"
          description="Our fabric offers the same technical performance as traditional polyester, without the environmental impact."
        />
      </div>
    </section>
  );
}

export default Solution;

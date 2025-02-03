import React from "react";

function Solution() {
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
       
        <div>
          <img src="/src/assets/recycle-icon.png" alt="Recycle icon" />
          <h3 className="icon-text">Recycled Food</h3>
          <p>
            Our fabric is made from vegetable waste that would otherwise end up
            in landfills, giving new life to food byproducts.
          </p>
        </div>
        <div>
          <img
            className="icon-leaf"
            src="/src/assets/leaf-icon.png"
            alt="Leaf icon"
          />
          <h3 className="icon-text">Bio-Based Material</h3>
          <p>
            Our fabric is 80% bio-based, and we are actively developing a 100%
            plant-based solution through ongoing research and innovation.
          </p>
        </div>
        <div>
          <img src="/src/assets/scale-icon.png" alt="Scale icon" />
          <h3 className="icon-text">Carbon-Neutral</h3>
          <p>
            We are carbon neutral, providing a sustainable alternative to
            recycled polyester, which still has a significant carbon footprint.
          </p>
        </div>
        <div>
        <img src="/src/assets/world-icon.png" alt="World icon" />
          <h3 className="icon-text">Eco-Friendly</h3>
          <p>
            We are committed to making the world a greener place, one garment at
            a time.
          </p>
        </div>
        <div>
          <img src="/src/assets/check-icon.png" alt="Check icon" />
          <h3 className="icon-text">Quality Assured</h3>
          <p>
            Our fabric offers the same technical performance as traditional
            polyester, without the environmental impact.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Solution;

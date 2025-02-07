import React from 'react';

function Problem() {
  return (
    <section id="problem">
      <h2>Problem</h2>
      <p>Polyester might be cheap and convenient, but it comes at a massive environmental cost. Every thread is tied to fossil fuels, plastic pollution, and carbon emissions—all for the sake of fast fashion. </p>
 <p>From oil rigs to ocean waste, here’s what the industry doesn’t want you to see.</p>
      <div className="image-container">
        <div className="image-box">
          <img src="./assets/plants-blogg.png" alt="Bilde 1" className="image" />
          <div className="image-text">Oil: Every year, over 70 million barrels of oil are used to produce polyester fabric. Fast fashion fuels this demand, making synthetic textiles one of the most oil-dependent industries on the planet.</div>
        </div>
        <div className="image-box">
          <img src="./assets/plants-blogg.png" alt="Bilde 2" className="image" />
          <div className="image-text">Plastic: Each wash of polyester clothing releases thousands of microplastic fibers into our water systems. These fibers end up in our oceans, harming marine life and even entering our food chain.</div>
        </div>
        <div className="image-box">
          <img src="./assets/plants-blogg.png" alt="Bilde 3" className="image" />
          <div className="image-text">Carbon emission: The production of polyester emits up to three times more CO₂ than natural fibers. With fashion responsible for 10% of global emissions, it's time for a change.</div>
        </div>
      </div>
    </section>
  );
}

export default Problem;

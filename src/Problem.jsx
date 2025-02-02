import React from 'react';

function Problem() {
  return (
    <section id="problem">
      <h2>The Problem</h2>
      <p>Markedet for polyester er verdt 77 milliarder USD, og vi er i en raskt voksende bransje som krever bærekraftige alternativer.</p>
      <div className="image-container">
        <div className="image-box">
          <img src="/src/assets/plants-blogg.png" alt="Bilde 1" className="image" />
          <div className="image-text">Tekst for bilde 1</div>
        </div>
        <div className="image-box">
          <img src="/src/assets/plants-blogg.png" alt="Bilde 2" className="image" />
          <div className="image-text">Tekst for bilde 2</div>
        </div>
        <div className="image-box">
          <img src="/src/assets/plants-blogg.png" alt="Bilde 3" className="image" />
          <div className="image-text">Tekst for bilde 3</div>
        </div>
      </div>
    </section>
  );
}

export default Problem;

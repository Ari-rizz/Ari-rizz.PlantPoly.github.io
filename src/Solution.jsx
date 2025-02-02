import React from 'react';

function Solution() {
  return (
    <section id="solution">
      <h2>Løsningen</h2>
      <p>Vi skaper polyester fra 80% resirkulert matavfall. Vårt materiale er karbonnøytralt og biobasert, og tilbyr samme tekniske ytelse som tradisjonell polyester.</p>
      <div className="icon"> {/* Bruk className i stedet for class */}
        <img src="/src/assets/recycle-icon.png" alt="Recycle icon" />
        <img src="/src/assets/leaf-icon.png" alt="Leaf icon" />
        <img src="/src/assets/scale-icon.png" alt="Scale icon" />
        <img src="/src/assets/check-icon.png" alt="Check icon" />
        <img src="/src/assets/world-icon.png" alt="World icon" />
      </div>
    </section>
  );
}

export default Solution;

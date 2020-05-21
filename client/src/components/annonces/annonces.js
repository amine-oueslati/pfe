import React from "react";
import AnnoncesDesktop from "./responsive/annoncesDesktop";
import AnnoncesMobile from "./responsive/annoncesMobile";
const Annonces = () => {
  return (
    <div>
      <AnnoncesDesktop />
      <AnnoncesMobile/>
    </div>
  );
};
export default Annonces;

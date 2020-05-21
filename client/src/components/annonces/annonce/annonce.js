import React from "react";

import AnnonceDesktop from "./responsive/annonceDesktop";
import AnnonceMobile from "./responsive/annonceMobile";

const Annonce = (props) => {
  return (
    <div>
      <AnnonceDesktop {...props} />
      <AnnonceMobile {...props} />
    </div>
  );
};
export default Annonce;

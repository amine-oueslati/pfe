import React from "react";

import { Tab } from "semantic-ui-react";

import AjoutAnnonce from "./ajout/ajoutAnnonce";
import SuppAnnonce from "./supp/suppAnnonce";

const choixGestionAnnonces = [
  {
    menuItem: "Ajouter une annonce",
    render: () => (
      <Tab.Pane>
        <AjoutAnnonce />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Supprimer une annonce",
    render: () => (
      <Tab.Pane>
        <SuppAnnonce />
      </Tab.Pane>
    ),
  }
];

const gestionAnnonces = () => {
  return (
    <div>
      <Tab menu={{ borderless: true,tabular: false, attached: false }} panes={choixGestionAnnonces} />
    </div>
  );
};

export default gestionAnnonces;

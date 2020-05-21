import React from "react";

import { Tab } from "semantic-ui-react";

import AjoutMarque from "./ajout/ajoutMarque";
import SuppMarque from "./supp/suppMarque";

const choixGestionMarques = [
  {
    menuItem: "Ajouter une marque",
    render: () => (
      <Tab.Pane>
        <AjoutMarque />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Supprimer une marque",
    render: () => (
      <Tab.Pane>
        <SuppMarque />
      </Tab.Pane>
    ),
  }
];

const gestionMarques = () => {
  return (
    <div>
      <Tab menu={{ borderless: true,tabular: false, attached: false }} panes={choixGestionMarques} />
    </div>
  );
};

export default gestionMarques;

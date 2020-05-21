import React, { Component } from "react";

import { Segment } from "semantic-ui-react";

import HeaderHome from "../header/header";
import Footer from "../../HOC/footer";

import Vente from "./component/vente/vente";
import Local from "./component/local/local";
import Contact from "./component/contact/contact";

class Home extends Component {
  render() {
    return (
      <div>
        {/* header responsive avec l'image et le menu */}
        <HeaderHome />

        {/* segment de vente de voiture */}
        <Segment style={{ padding: "6em 0em" }} vertical>
          <Vente />
        </Segment>

        {/* segment du Map */}
        <Segment style={{ padding: "0em", marginBottom: "2em" }} vertical>
          <Local />
        </Segment>
        
        {/* segment Contact*/}
        <Segment vertical>
          <Contact />
        </Segment>

        {/* footer */}
        <Footer />
      </div>
    );
  }
}

export default Home;

import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from "./components/home/home";
import Annonces from "./components/annonces/annonces";
import Comparateur from "./components/comparateur/responsiveComparateur";
import Contact from "./components/contact/contact";
import Login from "./components/login/login";
import Admin from "./components/admin/admin";
import AnnonceView from "./components/annonces/annonceView/annonceView";
import NotFoundPage from './404/notFoundPage'
import Auth from "./HOC/auth";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/annonces" exact component={Annonces} />
      <Route path="/annonce/:id" exact component={AnnonceView} />
      <Route path="/comparateur" exact component={Comparateur} />
      <Route path="/contact" exact component={Contact} />
      <Route path="/login" exact component={Auth(Login, false)} />
      <Route path="/admin" exact component={Auth(Admin, true)} />
      <Route path="/404" component={NotFoundPage} />
      <Redirect to="/404" />
    </Switch>
  );
};

export default Routes;

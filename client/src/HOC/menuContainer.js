import React from "react";

import DesktopContainer from "./responsive/desktopContainer";
import MobileContainer from "./responsive/mobileContainer";

const MenuContainer = props => {
  return (
    <div>
      <DesktopContainer active={props.active}>
        {props.children}
      </DesktopContainer>
      <MobileContainer active={props.active}>
        {props.children}
      </MobileContainer>
    </div>
  );
};
export default MenuContainer;

import React from 'react';
import PropTypes from 'prop-types';
import DesktopHomeHeader from './responsive/desktopHomeHeader';
import MobileHomeHeader from './responsive/mobileHomeHeader';




const HeaderHome = () => (
    <div>
        <DesktopHomeHeader/>
        <MobileHomeHeader/>
    </div>
)

HeaderHome.propTypes = {
    children: PropTypes.node,
}
  
export default HeaderHome;
import React from 'react'
import MenuContainer from '../HOC/menuContainer'
import Footer from '../HOC/footer'


import { Header } from "semantic-ui-react";



const NotFoundPage = () => {
    return (
        <div>
            <MenuContainer>
                <Header>404</Header>
            </MenuContainer>
            <Footer />
        </div>
    )
}
export default NotFoundPage
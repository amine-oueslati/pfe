import React from 'react'
import MenuContainer from '../HOC/menuContainer'
import Footer from '../HOC/footer'


import { Header, Icon } from "semantic-ui-react";



const NotFoundPage = () => {
	return (
		<div>
			<MenuContainer>
				
				<Header style={{fontSize : "10em" , marginTop: "1em"}} textAlign='center' as="h1" icon>
					404 :(
				</Header>

				<Header style= {{marginBottom : "5em"}} textAlign='center' as="h1" icon>
					Oops ! La page que vous cherchez n'existe pas.
				</Header>
			</MenuContainer>
			<Footer />
		</div>
	)
}
export default NotFoundPage
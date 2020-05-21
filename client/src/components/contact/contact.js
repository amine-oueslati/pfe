import React from 'react';
import MenuContainer from '../../HOC/menuContainer'
import Footer from '../../HOC/footer'
import ContactForm from './contactForm/contactForm'

import { Header, Icon, Segment } from 'semantic-ui-react'




const Contact = () => {

	return (
		<div>
			<MenuContainer active="contact">
				<Header textAlign='center' as='h2' icon>
					<Icon name='envelope open outline' />
    			Nous Contacter
				<Header.Subheader>
						dites nous tout ce que vous voulez
				</Header.Subheader>
				</Header>
				<Segment>
					<ContactForm defaultMessage="" />
				</Segment>

			</MenuContainer>
			<Footer />
		</div>
	)
}

export default Contact;
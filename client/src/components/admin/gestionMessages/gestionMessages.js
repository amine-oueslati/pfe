
import React, { Component } from "react";

import { Tab } from "semantic-ui-react";
import axios from "axios";


import Message from './message/message'


class GestionMessages extends Component {

	state = {
		reclamations: [],
		annonces: []
	}


	componentWillMount = () => {
		axios.get("api/getMessages").then(response => {
			response.data.map(message => {
				if (message.idAnnonce)
					this.setState({ annonces: [message, ... this.state.annonces] })
				else
					this.setState({ reclamations: [message, ... this.state.reclamations] })
			})
		})
	}

	deleteMsg = (id) => {
		axios.delete("api/deleteMessage", {
			data: {
				id
			}
		}).then(response => {
			console.log(response.data)
			if (response.data.doc._id) {
				axios.get("api/getMessages").then(response => {
					this.setState({
						reclamations: [],
						annonces: []
					})
					response.data.map(message => {
						if (message.idAnnonce)
							this.setState({ annonces: [message, ... this.state.annonces] })
						else
							this.setState({ reclamations: [message, ... this.state.reclamations] })
					})
				})
			}
		})
	}


	render() {
		const choixGestionMessages = [
			{
				menuItem: "Concernant une annonce",
				render: () => (
					<Tab.Pane>
						<Message deleteMsg={this.deleteMsg} messages={this.state.annonces} />
					</Tab.Pane>
				),
			},
			{
				menuItem: "Réclamation ",
				render: () => (
					<Tab.Pane>
						<Message deleteMsg={this.deleteMsg} messages={this.state.reclamations} />
					</Tab.Pane>
				),
			}
		];

		return (
			<Tab menu={{ borderless: true, tabular: false, attached: false }} panes={choixGestionMessages} />
		)
	}


} export default GestionMessages
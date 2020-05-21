	/*import React, {Component} from 'react';




	class Map extends Component {
	
	state = {
		viewport: {
		width: "100%",
		height: "100%",
		latitude: 36.806496,
		longitude: 10.181532,
		zoom: 8
		},
		localID:this.props.localID,
		local: {
			latitude:36.806496,
			longitude: 10.181532,
			address: 'adresse bla bla bla bla',
			title: 'local 1 '
		}
	};
	
	
	
	

	PopupMap(){
		return(
			<Popup
				latitude={36.806496}
				longitude={10.181532}
				
			>
				<div>
				<h2>local</h2>
				<p>adresse bla bla bla bla</p>
				</div>
			</Popup>
		)
	}
		


	
	
	render() {
		console.log(this.state.localID)
		return (
			
			<ReactMapGL  
			mapStyle="mapbox://styles/oueslatiamine35/ck7iklm121exv1pqjzqu5otoy"
			mapboxApiAccessToken = {'pk.eyJ1Ijoib3Vlc2xhdGlhbWluZTM1IiwiYSI6ImNrN2lqaDFxODBrOXIzZW1vOHljc25kZnoifQ.SSaFEd5hfgEbYosz9BxvYw'}
			{...this.state.viewport}
			onViewportChange={(viewport) => this.setState({viewport})}
			>
			<Marker
				latitude = {36.806496}
				longitude= {10.181532}
			>
				<button 
				onClick={e => {
					e.preventDefault();
					
				}}>FUCK </button>
			</Marker>
			</ReactMapGL>
	
		);
	}
	}

	export default Map

		*/
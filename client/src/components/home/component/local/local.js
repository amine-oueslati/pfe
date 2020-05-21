import React  , {Component }from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import {
    Icon,
    Form, 
    Radio,
    Grid,
    Header,
} from 'semantic-ui-react';

import { LOCAUX } from '../../../../config';


class Local extends Component{

    state = {
        viewport: {
            width: "100%",
            height: "100%",
            latitude: 36.806496,
            longitude: 10.181532,
            zoom: 11
        },
        value: '0',
        local: LOCAUX[0],
        selectedLocal: null
    }

    handleChange = (e, { value }) => {
        this.setState({
            value ,
            local : LOCAUX[parseInt(value)],
            viewport:{
                width: "100%",
                height: "100%",
                latitude: LOCAUX[parseInt(value)].latitude,
                longitude:LOCAUX[parseInt(value)].longitude,
                zoom: 11
            },
            selectedLocal: null
        })
        
    }




    render(){
        
        return(
            <Grid celled='internally' columns='equal' stackable>
                <Grid.Row>
                    <Grid.Column width={6} style={{ paddingBottom: '5em', paddingTop: '7em' }}>
                        <Header as='h3' style={{ fontSize: '2em', textAlign:'center' }}>
                            Nos locaux 
                        </Header>
                        <Form>
                            <Form.Field style={{textAlign:'center'}}>
                            {this.state.local.adresse}
                            </Form.Field>
                            <Form.Field style={{marginLeft:'4em'}}>
                            <Radio slider
                                label = {LOCAUX[0].titre }
                                name='radioGroup'
                                value= '0'
                                checked={this.state.value === '0'}
                                onChange={this.handleChange}
                            />
                            </Form.Field>
                            <Form.Field style={{marginLeft:'4em'}}>
                            <Radio slider
                                label={LOCAUX[1].titre}
                                name='radioGroup'
                                value='1'
                                checked={this.state.value === '1'}
                                onChange={this.handleChange}
                            />
                            </Form.Field>
                            <Form.Field style={{marginLeft:'4em'}}>
                            <Radio slider
                                label={LOCAUX[2].titre}
                                name='radioGroup'
                                value='2'
                                checked={this.state.value === '2'}
                                onChange={this.handleChange}
                            />
                            </Form.Field>
                        </Form>

                    </Grid.Column>
                    <Grid.Column
                    width={10} 
                    style={{
                        padding:'0' ,
                        minHeight: '400px',
                        width: 'inherit',
                    }}
                    >
                        <ReactMapGL  
                        mapStyle="mapbox://styles/oueslatiamine35/ck7iklm121exv1pqjzqu5otoy"
                        mapboxApiAccessToken = {'pk.eyJ1Ijoib3Vlc2xhdGlhbWluZTM1IiwiYSI6ImNrN2lqaDFxODBrOXIzZW1vOHljc25kZnoifQ.SSaFEd5hfgEbYosz9BxvYw'}
                        {...this.state.viewport}
                        onViewportChange={(viewport) => this.setState({viewport})}
                        >
                            <Marker
                                latitude = {this.state.viewport.latitude}
                                longitude= {this.state.viewport.longitude}
                            >
                                <button 
                                    style = {{
                                        backgroundColor: 'Transparent',
                                        backgroundRepeat:'no-repeat',
                                        border: 'none',
                                        cursor:'pointer',
                                        overflow: 'hidden',
                                        outline:'none',
                                    }}
                                onClick={e => {
                                    e.preventDefault();
                                    this.setState({selectedLocal: this.state.local})
                                    
                                    
                                }}
                                >
                                    <Icon loading  size='big' name='certificate' color='red'/>
                                </button>
                            </Marker>

                            {this.state.selectedLocal ? (
                                <Popup
                                latitude={this.state.viewport.latitude}
                                longitude={this.state.viewport.longitude}
                                onClose={() => {
                                this.setState({selectedLocal: null})
                                }}
                                >
                                    <div>
                                        <h2>{this.state.local.titre}</h2>
                                        <p>{this.state.local.adresse}</p>
                                    </div>
                                </Popup>
                              ) : null}
                        </ReactMapGL>
        
                    </Grid.Column>
            </Grid.Row>
        </Grid>
        )
    }
    
}

export default Local;

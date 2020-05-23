import React from 'react'
import { Segment, Header, Container, Button, Icon } from 'semantic-ui-react'



const Message = (props) => {

  const formatMsg = (text) => {
    let formattedText = text.split("\n").map((item, index) =>
      <span key={index}>
        {item}
        <br />
      </span>
    )
    return formattedText
  }

  const deleteMessage = (id) => {
    props.deleteMsg(id)
    
  }

  const renderMsg = () => {
    let temp = props.messages.map(message => (
      <Segment key={message._id}>
        <Header block as='h2'>
          {message.nom} {message.prenom}
          <Header.Subheader>
            {message.email}
          </Header.Subheader>
          <Header.Subheader>
            {message.tel}
          </Header.Subheader>
        </Header>

        <Segment>
          <Container>
            {formatMsg(message.msg)}
          </Container>

          <div style={{ marginTop: "1em " }}>
            <Button.Group fluid>
              {message.idAnnonce ?
                <Button positive animated="fade">
                  <Button.Content visible>Consulter l'annonce</Button.Content>
                  <Button.Content hidden>
                    <Icon name='arrow right' />
                  </Button.Content>
                </Button>
                :
                null
              }
              {message.idAnnonce ?
                <Button.Or text='ou' />
                :
                null
              }
              <Button onClick= { ()=> deleteMessage(message._id)} negative animated="fade">
                <Button.Content visible>Supprimer le message</Button.Content>
                <Button.Content hidden>
                  <Icon name='trash' />
                </Button.Content>
              </Button>
            </Button.Group>
          </div>
        </Segment>
      </Segment>
    ))
    return temp
  }


  return (
    renderMsg()
  )
}
export default Message
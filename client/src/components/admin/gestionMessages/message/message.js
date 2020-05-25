import React from 'react'
import { Segment, Header, Container, Button, Icon, Responsive } from 'semantic-ui-react'



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
            {/* mobile  */}
            <Responsive {...Responsive.onlyMobile}>
              {message.idAnnonce ?
                <Button fluid as='a' href={`/annonce/${message.idAnnonce}`} positive >
                  Consulter l'annonce
                </Button>
                :
                null
              }
              <Button fluid onClick={() => deleteMessage(message._id)} negative style={{marginTop: "1em"}}>
                Supprimer le message
              </Button>
            </Responsive>

            {/* Desktop */}
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
              <Button.Group fluid>
                {message.idAnnonce ?
                  <Button as='a' href={`/annonce/${message.idAnnonce}`} positive animated="fade">
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
                <Button onClick={() => deleteMessage(message._id)} negative animated="fade">
                  <Button.Content visible>Supprimer le message</Button.Content>
                  <Button.Content hidden>
                    <Icon name='trash' />
                  </Button.Content>
                </Button>
              </Button.Group>

            </Responsive>

          </div>
        </Segment>
      </Segment >
    ))
    return temp
  }


  return (
    renderMsg()
  )
}
export default Message
import '../../App.css'

import { Card, Header, Image, Rating } from 'semantic-ui-react'

const HorizontalItem = ({ Id, Name, ImageStorages, CurrentPrice }) => (
  <Card href={'/Product/' + Id}>
    <Card.Content textAlign='left'>
      <Image src={ImageStorages[0].ImageUrl} size='tiny' floated='right' />

      <Card.Header>
        <Header as='h6'>
          {Name}
          <Header as='h6' color='red'>
            {CurrentPrice},000 vnd
          </Header>
          <Rating icon='star' defaultRating={5} maxRating={5} disabled />
        </Header>
      </Card.Header>
    </Card.Content>
  </Card>
)

export default HorizontalItem

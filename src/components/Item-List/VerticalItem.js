import '../../App.css'
import { Link } from 'react-router-dom'
import {
  Card,
  Icon,
  Image,
  Rating,
  Header,
  Reveal,
  Button
} from 'semantic-ui-react'

const VerticalItem = ({
  Id,
  Name,
  Price,
  Quantity,
  Star,
  Description,
  Code,
  CurrentPrice,
  CategoryId,
  Status,
  ImageStorages
}) => (
  <Card as='a'>
    <Card.Content textAlign='left' href={'/Product/' + Id}>
      <Image src={ImageStorages[0].ImageUrl} size='small' />

      <Card.Header>{Name}</Card.Header>
      <Card.Meta>
        {CurrentPrice === Price ? null : (
          <>
            <span style={{ textDecoration: 'line-through' }}>
              {Price},000 vnd
            </span>
            <span>-{(CurrentPrice / Price) * 100}%</span>
          </>
        )}
      </Card.Meta>
      <Card.Description>
        <Header as='h3' color='red'>
          {CurrentPrice},000 vnd
        </Header>
      </Card.Description>
    </Card.Content>
    <Card.Content textAlign='left' extra>
      <Rating icon='star' defaultRating={5} maxRating={5} disabled />
    </Card.Content>
    <Card.Content extra>
      <Button basic size='mini' color='green'>
        <Icon name='shopping cart' />
      </Button>
      <Button basic size='mini' color='red'>
        <Icon name='heart' />
      </Button>
    </Card.Content>
  </Card>
)

export default VerticalItem

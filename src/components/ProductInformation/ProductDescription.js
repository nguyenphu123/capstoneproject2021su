import { Container, Tab, Header } from 'semantic-ui-react'
import Title from '../../Assets/Title'

function ProductDescription ({ Description }) {
  return (
    <Tab.Pane>
      <Container text>
        <Title Name='Description' />

        <p>{Description}</p>
      </Container>
    </Tab.Pane>
  )
}
export default ProductDescription

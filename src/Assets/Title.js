import { Header } from 'semantic-ui-react'

function Title ({ Name }) {
  function handleSubmit () {}
  return (
    <div class='section-title' style={{marginTop:'15px'}}>
      <Header textAlign='left' as='h1' color='black'>
        <h4>{Name}</h4>
      </Header>
    </div>
  )
}

export default Title

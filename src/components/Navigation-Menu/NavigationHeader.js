import '../../App.css'
import { Link } from 'react-router-dom'
import { Container, Dropdown, Image, Menu, Search } from 'semantic-ui-react'

const fixedMenuStyle = {
  backgroundColor: '#eeb6a2'
}
const DropdownTheme = {
  backgroundColor: '#eeb6a2'
}

function NavigationHeader () {
  return (
    <>
      <Menu fixed='top' style={fixedMenuStyle} inverted>
        <Container>
          <Menu.Item header>
            <Link to='/'>
              <Image
                size='mini'
                src='assets/img/logo.png'
                style={{ marginRight: '1.5em', width: '100px' }}
              />
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/'>Home</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/'>About Us</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/'>Our Store</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/ImageUploading'>Search With Image</Link>
          </Menu.Item>

          <Dropdown text='Shopping' item simple>
            <Dropdown.Menu style={DropdownTheme}>
              <Dropdown.Item>
                <Link to='/Category1'>Category1</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to='/Category2'>Category2</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to='/'>Home</Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item>
            <Search
            // loading={loading}
            // onResultSelect={(e, data) =>
            //   dispatch({
            //     type: 'UPDATE_SELECTION',
            //     selection: data.result.title
            //   })
            // }
            // onSearchChange={handleSearchChange}
            // results={results}
            // value={value}
            />
          </Menu.Item>

          <Menu.Item>
            <Link to='/Login'>Login</Link>
          </Menu.Item>

          <Menu.Item>
            <Link to='/'>Register</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/'>
              <span class='icon_heart_alt'></span>
              <div class='tip'>2</div>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/Cart'>
              <span class='icon_bag_alt'></span>
              <div class='tip'>2</div>
            </Link>
          </Menu.Item>
        </Container>
      </Menu>
    </>
  )
}

export default NavigationHeader

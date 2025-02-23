import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Menu = () => {
  const Navigation = styled.div`
    background: BurlyWood;
    padding: 1em;
  `
  const padding = {
    paddingRight: 5,
    margin: 5,
  }
  return (
    <Navigation>
      <Link style={padding} to="/">
        Anecdotes
      </Link>
      <Link style={padding} to="/create">
        Create New
      </Link>
      <Link style={padding} to="/about">
        About
      </Link>
    </Navigation>
  )
}

export default Menu

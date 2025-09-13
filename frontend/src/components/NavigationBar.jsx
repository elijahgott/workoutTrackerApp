import { Link } from "react-router"

const NavigationBar = () => {
  return(
    <ul style={{listStyle: 'none', display: 'flex'}}>
      <li style={{margin: 8}} key={'home'}><Link to='/'>Home</Link></li>
      <li style={{margin: 8}} key={'create'}><Link to='/create'>Create</Link></li>
    </ul>
  )
}

export default NavigationBar
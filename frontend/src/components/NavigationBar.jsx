import { Link } from "react-router"

const NavigationBar = ({ currentUser, setCurrentUser }) => {
  return(
    <>
      {/* <ul style={{listStyle: 'none', display: 'flex'}}>
        <li style={{margin: 8}} key={'home'}><Link to='/'>Home</Link></li>
        <li style={{margin: 8}} key={'create'}><Link to='/create'>Create</Link></li>
      </ul> */}
      <p>Signed in as: {currentUser.username}
        <button onClick={() => {
          window.localStorage.removeItem('loggedInWorkoutAppUser')
          setCurrentUser(null)
        }}>Log Out</button>
      </p>
    </>
  )
}

export default NavigationBar
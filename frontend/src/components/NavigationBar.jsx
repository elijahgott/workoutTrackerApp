import styled from 'styled-components'

const NavBorder = styled.div`
  background: linear-gradient(90deg,rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%);
  padding: 4px;
  border-radius: 20px;
`

const NavBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
  color: white;
  border-radius: 16px;
  padding: 12px;
`

const NavItems = styled.div`
  width: 100%;
  max-width: 1400px;
  display: flex;
  justify-content: space-between;
`

const NavigationBar = ({ currentUser, setCurrentUser }) => {
  return(
    <NavBorder>
      <NavBar>
        <NavItems>
          <p><strong>Workout Tracker</strong></p>
          <p>Signed in as: <strong>{currentUser.username}</strong>
            <button onClick={() => {
              window.localStorage.removeItem('loggedInWorkoutAppUser')
              setCurrentUser(null)
            }}>Log Out</button>
          </p>
        </NavItems>
      </NavBar>
    </NavBorder>
  )
}

export default NavigationBar
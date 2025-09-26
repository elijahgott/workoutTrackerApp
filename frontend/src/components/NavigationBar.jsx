import styled from 'styled-components'
import { MdLogout } from 'react-icons/md'

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
  background-color: white;
  border-radius: 16px;
  padding: 12px;
`

const NavItems = styled.div`
  width: 100%;
  max-width: 1400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Button = styled.button`
  aspect-ratio: 1 / 1;
  height: 100%;
  padding: 4px;
  margin: 4px;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  font-size: 20px;
  transition: 0.3s;

  &:hover{
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`

const NavigationBar = ({ currentUser, setCurrentUser }) => {
  return(
    <NavBorder>
      <NavBar>
        <NavItems>
          <p style={{ fontSize: 24 }}><strong>Workout Tracker</strong></p>
          <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Signed in as: <strong>{currentUser.username}</strong>
            <Button onClick={() => {
              window.localStorage.removeItem('loggedInWorkoutAppUser')
              setCurrentUser(null)
            }}>
              <MdLogout />
            </Button>
          </p>
        </NavItems>
      </NavBar>
    </NavBorder>
  )
}

export default NavigationBar
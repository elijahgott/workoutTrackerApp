import styled from 'styled-components'

const StyledNotification = styled.div`
  margin-left: -24px;
  margin-top: 4px;
  font-weight: bold;
  color: white;
`

const EmptyDiv = styled.div`
  height: 20px;
`

const Notification = ({ message }) => {
  if(!message) return <EmptyDiv />
  return(
    <StyledNotification>
      <p>{message}</p>
    </StyledNotification>
  )
}

export default Notification
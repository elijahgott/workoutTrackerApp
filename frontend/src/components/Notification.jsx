import styled from 'styled-components'

const StyledNotification = styled.div`
  width: 100%;
  text-align: center;
  margin-left: -24px;
  margin-top: 4px;
  font-weight: bold;
`

const EmptyDiv = styled.div`
  height: 20px;
`

const Notification = ({ textColor, message }) => {
  const color = textColor || 'white';
  if(!message) return <EmptyDiv />
  return(
    <StyledNotification>
      <p style={{ color: color }}>{message}</p>
    </StyledNotification>
  )
}

export default Notification
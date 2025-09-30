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

const Notification = ({ isDark, textColor, message }) => {
  const color = textColor || 'white';
  if(!message) return <EmptyDiv />
  return(
    <StyledNotification style={{ backgroundColor: 'transparent'}}>
      <p style={{ color: color, backgroundColor: 'transparent' }}>{message}</p>
    </StyledNotification>
  )
}

export default Notification
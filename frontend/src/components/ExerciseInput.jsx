import styled from "styled-components"

// styles
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin: 4px;
  border: 1px solid white;
  border-radius: 8px;
`

const InputDark = styled.input`
  width: 100%;
  padding: 8px;
  margin: 4px;
  border: 1px solid black;
  border-radius: 8px;
  background-color: rgb(25, 25, 25);
  color: white;

  &::placeholder{
    color: white;
  }
`

const ExerciseInput = ({ isDark, exerciseName, setExerciseName,
    sets, setSets,
    reps, setReps,
    weight, setWeight,
    }) => {

    if( isDark ) {
      return(
        <Container style={{ backgroundColor: 'transparent' }} >
          <Row style={{ backgroundColor: 'transparent' }}>
            <InputDark type="text" id='exercisename' name='exercisename' value={exerciseName} onChange={({target}) => setExerciseName(target.value)} placeholder="Exercise Name (e.g. Squat)" required />
          </Row>
            
          <Row style={{ backgroundColor: 'transparent' }}>
            <InputDark type="number" name='sets' id='sets' value={sets} onChange={({target}) => setSets(target.value)} placeholder="# of Sets" required />
          </Row>

          <Row style={{ backgroundColor: 'transparent' }}>
            <InputDark type="number" name='reps' id='reps' value={reps} onChange={({target}) => setReps(target.value)} placeholder="# of Reps" required />
          </Row>

          <Row style={{ backgroundColor: 'transparent' }}>
            <InputDark type="number" name='weight' id='weight' value={weight} onChange={({target}) => setWeight(target.value)} placeholder="Weight (in lbs)" required />
          </Row>
        </Container>
      )
    }
    return(
        <Container >
          <Row>
            <Input type="text" id='exercisename' name='exercisename' value={exerciseName} onChange={({target}) => setExerciseName(target.value)} placeholder="Exercise Name (e.g. Squat)" required />
          </Row>
            
          <Row>
            <Input type="number" name='sets' id='sets' value={sets} onChange={({target}) => setSets(target.value)} placeholder="# of Sets" required />
          </Row>

          <Row>
            <Input type="number" name='reps' id='reps' value={reps} onChange={({target}) => setReps(target.value)} placeholder="# of Reps" required />
          </Row>

          <Row>
            <Input type="number" name='weight' id='weight' value={weight} onChange={({target}) => setWeight(target.value)} placeholder="Weight (in lbs)" required />
          </Row>
        </Container>
    )
}

export default ExerciseInput
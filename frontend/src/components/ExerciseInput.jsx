import styled from "styled-components"

// styles
const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const Input = styled.input`
  padding: 4px;
  margin: 4px;
  border: none;
  border-bottom: 2px solid black;
`

const ExerciseInput = ({ exerciseName, setExerciseName,
    sets, setSets,
    reps, setReps,
    weight, setWeight,
    }) => {

    return(
        <>
          <Row>
            <label htmlFor='exercisename'>Exercise Name:</label>
            <Input type="text" id='exercisename' name='exercisename' value={exerciseName} onChange={({target}) => setExerciseName(target.value)} required />
          </Row>
            
          <Row>
            <label htmlFor='sets'>No. of Sets:</label>
            <Input type="number" name='sets' id='sets' value={sets} onChange={({target}) => setSets(target.value)} required />
          </Row>

          <Row>
            <label htmlFor='reps'>No. of Reps:</label>
            <Input type="number" name='reps' id='reps' value={reps} onChange={({target}) => setReps(target.value)} required />
          </Row>

          <Row>
            <label htmlFor='weight'>Weight (in lbs):</label>
            <Input type="number" name='weight' id='weight' value={weight} onChange={({target}) => setWeight(target.value)} required />
          </Row>
        </>
    )
}

export default ExerciseInput
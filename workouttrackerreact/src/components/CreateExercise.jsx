import { useState } from 'react'

const CreateExercise = ({ workouts, setWorkouts }) => {
  const [workoutName, setWorkoutName] = useState('')
  const [exerciseName, setExerciseName] = useState('')
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [weight, setWeight] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()

    if(workoutName && exerciseName && sets && reps && weight){
      const exercise = {
        name: exerciseName,
        sets: parseInt(sets),
        reps: parseInt(reps),
        weight: parseInt(weight)
      }
      
      const workout = workouts.find(w => w.name === workoutName)
      workout.exercises.push(exercise)
      
      const updatedWorkouts = workouts.map(w => w.name === workoutName ? workout : w)
      setWorkouts(updatedWorkouts)
      
    }
    else{
      console.error('Error submitting exercise')
    }
  }

  return(
    <>
      <h1>Add New Exercise</h1>
      <form onSubmit={handleSubmit}>
        <select defaultValue={''} onChange={ ({ target }) => setWorkoutName(target.value) }>
          <option value=''>Select a Workout</option>
          {workouts.map(w => <option key={ w.name } value={ w.name }>{ w.name }</option>)}
        </select>

        <label htmlFor='exercisename'>Exercise Name:</label>
        <input type="text" id='exercisename' name='exercisename' value={exerciseName} onChange={({target}) => setExerciseName(target.value)} />

        <label htmlFor='sets'>No. of Sets:</label>
        <input type="number" name='sets' id='sets' onChange={({target}) => setSets(target.value)} />

        <label htmlFor='sets'>No. of Reps:</label>
        <input type="number" name='reps' id='reps' onChange={({target}) => setReps(target.value)} />

        <label htmlFor='sets'>Weight (in lbs):</label>
        <input type="number" name='weight' id='weight' onChange={({target}) => setWeight(target.value)} />

        <button type='submit'>Add Exercise</button>
      </form>
    </>
  )
}

export default CreateExercise
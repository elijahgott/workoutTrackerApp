import CreateWorkout from './CreateWorkout'
import CreateExercise from './CreateExercise'

const CreateNew = ({ currentUser, setCurrentUser, workouts, setWorkouts }) => {
  return(
    <>
      <CreateWorkout currentUser={currentUser} setCurrentUser={setCurrentUser} workouts ={workouts} setWorkouts={setWorkouts} />
      {workouts.length === 0 ? null 
      :
      <CreateExercise currentUser={currentUser} setCurrentUser={setCurrentUser} workouts={workouts} setWorkouts={setWorkouts} />
      }
    </>
  )
}

export default CreateNew
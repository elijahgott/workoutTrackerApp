import CreateWorkout from './CreateWorkout'
import CreateExercise from './CreateExercise'

const CreateNew = ({ currentUser, workouts, setWorkouts }) => {
  // I think this works properly rn, but page gets refreshed when going to index page and added data gets cleared
  // once I connect to DB i will use this
  return(
    <>
      <CreateWorkout currentUser={currentUser} workouts ={workouts} setWorkouts={setWorkouts} />
      <CreateExercise workouts={workouts} setWorkouts={setWorkouts} />
    </>
  )
}

export default CreateNew
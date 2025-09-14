import { useState } from 'react'

const ExerciseInput = ({ exerciseName, setExerciseName,
    sets, setSets,
    reps, setReps,
    weight, setWeight,
    origName, origSets, origReps, origWeight
    }) => {

    // setExerciseName(origName)
    // setSets(origSets)
    // setReps(origReps)
    // setWeight(origWeight)
    return(
        <>
            <label htmlFor='exercisename'>Exercise Name:</label>
            <input type="text" id='exercisename' name='exercisename' value={exerciseName} onChange={({target}) => setExerciseName(target.value)} />

            <label htmlFor='sets'>No. of Sets:</label>
            <input type="number" name='sets' id='sets' value={sets} onChange={({target}) => setSets(target.value)} />

            <label htmlFor='reps'>No. of Reps:</label>
            <input type="number" name='reps' id='reps' value={reps} onChange={({target}) => setReps(target.value)} />

            <label htmlFor='weight'>Weight (in lbs):</label>
            <input type="number" name='weight' id='weight' value={weight} onChange={({target}) => setWeight(target.value)} />
        </>
    )
}

export default ExerciseInput
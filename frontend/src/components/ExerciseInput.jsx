const ExerciseInput = ({ exerciseName, setExerciseName,
    sets, setSets,
    reps, setReps,
    weight, setWeight,
    }) => {

    return(
        <>
            <label htmlFor='exercisename'>Exercise Name:</label>
            <input type="text" id='exercisename' name='exercisename' value={exerciseName} onChange={({target}) => setExerciseName(target.value)} required />

            <label htmlFor='sets'>No. of Sets:</label>
            <input type="number" name='sets' id='sets' value={sets} onChange={({target}) => setSets(target.value)} required />

            <label htmlFor='reps'>No. of Reps:</label>
            <input type="number" name='reps' id='reps' value={reps} onChange={({target}) => setReps(target.value)} required />

            <label htmlFor='weight'>Weight (in lbs):</label>
            <input type="number" name='weight' id='weight' value={weight} onChange={({target}) => setWeight(target.value)} required />
        </>
    )
}

export default ExerciseInput
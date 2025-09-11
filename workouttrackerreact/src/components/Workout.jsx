const Workout = ({ workouts }) => {
  return(
    <>
      {workouts.map(w => {
        return(
          <div key={w.name}>
            <h1>{w.name}</h1>
            <table>
              <tbody>
                {w.exercises.map((e, index) => {
                  return(
                    <tr key={index}>
                      <td>{e.name}</td>
                      <td>{e.sets} x {e.reps}</td>
                      <td>{e.weight} lbs</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )
      })}
    </>
  )
}

export default Workout
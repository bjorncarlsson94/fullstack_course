import Part from './Part'

const Content = ({ content }) => {
  console.log(content)
  return (
    <div>
      <div>
        {content.map((content) => (
          <Part
            key={content.id}
            name={content.name}
            exercises={content.exercises}
          />
        ))}
      </div>

      <div>
        <strong>
          <Part
            name="total"
            exercises={content.reduce(
              (accumulator, currentValue) =>
                accumulator + currentValue.exercises,
              0
            )}
          />
        </strong>
      </div>
    </div>
  )
}

export default Content

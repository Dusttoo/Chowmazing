import Image from 'next/image';

export const RecipeResults = ({answers}) => {
    return (
        <div>
            {answers.map(recipe => {
                console.log(recipe)

                return (
                <div>
                    <h1>{recipe.title}</h1>
                    <a href={recipe.link}>Link</a>
                    <p>{recipe.source}</p>
                    <Image 
                    src={recipe.thumbnail} 
                    width='150px'
                    height='150px'/>
                    <p>{recipe.total_time}</p>
                </div>)
                })}
        </div>
    )
  }


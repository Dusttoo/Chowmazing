import { useState } from 'react';
import { useRouter } from 'next/router';
import { RecipeResults } from './recipeResults';

export const IngredientQuestions = ({user}) => {
    const [questionNumber, setQuestionNumber] = useState(1)
    const [answers, setAnswers] = useState([])
    const router = useRouter()
    const handleNext = () => {
        setQuestionNumber(questionNumber + 1)
    }

    const updateOptions = (e) => {
        console.log(answerResponses[questionNumber]['answer'])
        answerResponses[questionNumber]['answer'].push(e.target.value)
        console.log(answerResponses[questionNumber]['answer'])
    }
    const calculateResults = async () => {
        // This function makes the call to google crawl
        // Then sets answers to the response
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/search?search_params=toast`);
        const json = await res.json()
        console.log(json)
        setAnswers(json)
        console.log(answers)
    }
    console.log(answers)
    return (
        
        <div className='bg-white h-auto p-4 rounded'>
            {user ? 
                <>
                {answers.length < 1 ?
                    <>
                <h2>Question {questionNumber}</h2>
                <div>
                    <label>{questions[questionNumber]['Question']}</label>
                    <div className='flex flex-col'>
                        <div>
                            {questions[questionNumber]['Options'].map(option => {
                                return (
                                <div
                                key={`${questionNumber}${option.option}`}>
                                    <input
                                    id={`question-${questionNumber}`}
                                    name={`question-${questionNumber}`}
                                    type='checkbox'
                                    className=''
                                    value={option.choice}
                                    onChange={(e) => {updateOptions(e)}}
                                    />
                                    <label>{option.choice}</label>
                                </div>
                                )
                            })}
                            
                        </div>
                    </div>
                </div>
                    {questions[questionNumber + 1] ? 
                    <button
                    type='button'
                    className=""
                    onClick={() => handleNext()}
                    >
                    Next
                    </button> : 
                    <button
                    onClick={() => calculateResults()}
                    className=""
                    >
                    Get your results
                    </button>
                    }
                </> : 
                <RecipeResults answers={answers}/>
                }
                </>
                 :
                <h2>Please log in</h2>
    }
           
        </div>
    )
  }

const questions = {
    1: {'Question': 'text',
        'Options': [
            {'option': 'a', 'choice' : 'choice'},
            {'option': 'b', 'choice' : 'choice'},
            {'option': 'c', 'choice' : 'choice'},
            {'option': 'd', 'choice' : 'choice'}
        ]},
    2: {'Question': 'text',
        'Options': [
            {'option': 'a', 'choice' : 'choice'},
            {'option': 'b', 'choice' : 'choice'},
            {'option': 'c', 'choice' : 'choice'},
            {'option': 'd', 'choice' : 'choice'}
        ]},
    3: {'Question': 'text',
        'Options': [
            {'option': 'a', 'choice' : 'choice'},
            {'option': 'b', 'choice' : 'choice'},
            {'option': 'c', 'choice' : 'choice'},
            {'option': 'd', 'choice' : 'choice'}
        ]}
}

const answerResponses = {
    1: {'answer': []},
    2: {'answer': []},
    3: {'answer': []},
}
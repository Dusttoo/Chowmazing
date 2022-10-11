import Link from 'next/link'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { RecipeResults } from './recipeResults';

export const IngredientQuestions = ({user}) => {
    const [questionNumber, setQuestionNumber] = useState(1)
    const [answers, setAnswers] = useState([])
    const [results, setResults] = useState([])
    const router = useRouter()
    const handleNext = () => {
        setQuestionNumber(questionNumber + 1)
    }

    const updateOptions = (e) => {
        if(answerResponses[questionNumber]['answer'].includes(e.target.value)) {
            answerResponses[questionNumber]['answer'].splice(answerResponses[questionNumber]['answer'].indexOf(e.target.value), 1)
        } else {
            answerResponses[questionNumber]['answer'].push(e.target.value)
        }
    }

    const calculateResults = async () => {
        // This function makes the call to google crawl
        // Then sets answers to the response
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/search?search_params=toast`);
        const json = await res.json()
        setResults(json)
        setAnswers(answerResponses)
    }

    return (
        
        <div className='bg-white h-auto p-4 rounded text-center '>
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
                                    className='m-2'
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
                    className="bg-main-1 m-4 text-white px-4 rounded-lg hover:text-main-1 hover:bg-white"
                    onClick={() => handleNext()}
                    >
                    Next
                    </button> : 
                    <button
                    onClick={() => calculateResults()}
                    className="bg-main-1 m-4 text-white px-4 rounded-lg hover:text-main-1 hover:bg-white"
                    >
                    Get your results
                    </button>
                    }
                </> : 
                <RecipeResults answers={results}/>
                }
                </>
                 :
                 <>
                    <Link href='/auth/login'>
                        <a>Please log in</a>
                    </Link>
                 </>
    }
           
        </div>
    )
  }


const questions = {
    1: {'Question': 'What proteins do you have?',
        'Options': [
            {'option': 'a', 'choice' : 'Chicken'},
            {'option': 'b', 'choice' : 'Pork'},
            {'option': 'c', 'choice' : 'Fish'},
            {'option': 'd', 'choice' : 'Beef'}
        ]},
    2: {'Question': 'What vegetables do you have?',
        'Options': [
            {'option': 'a', 'choice' : 'Corn'},
            {'option': 'b', 'choice' : 'Green Beans'},
            {'option': 'c', 'choice' : 'Mashed Potaatoes'},
            {'option': 'd', 'choice' : 'Carrots'}
        ]},
    3: {'Question': 'What condiments do you have?',
        'Options': [
            {'option': 'a', 'choice' : 'Ketchup'},
            {'option': 'b', 'choice' : 'Mayonaise'},
            {'option': 'c', 'choice' : 'Mustard'},
            {'option': 'd', 'choice' : 'BBQ Sauce'}
        ]}
}

const answerResponses = {
    1: {'answer': []},
    2: {'answer': []},
    3: {'answer': []},
}
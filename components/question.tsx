import { Checkbox } from "@radix-ui/react-checkbox"
import { useState } from "react"
import { Button } from "./ui/button"
import Link from "next/link"


interface QuestionProps {
    question: string,
    difficulty: string,
    solution: string,
    link: string,
    userId: string 
}
export const Question: React.FC<QuestionProps> = ({userId}) => {

    
    const [questionId, setQuestionId] = useState("")
    const [question, setQuestion] = useState("")
    const [completed, setCompleted] = useState(false)
    const [difficulty, setDifficulty] = useState('')
    const [solution, setSolution ] = useState('')
    const [link, setLink] = useState('')

    const updateQuestionStatus = (questionId: string, userId: string) => {
        //the post request would be here where given the user id and the question id, you have 
        


    }

    return (
        <form action="">
            <div className="flex justify-between border-b border-gray-300 py-2">
                <div>
                    <Checkbox checked={completed} id="question" onClick={() => updateQuestionStatus(questionId, userId)}/>
                </div>
                <div>
                    <label htmlFor="question" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><Link href={link}>{question}</Link></label>
                </div>
                <div>
                    <div>{difficulty}</div>
                </div>
                <div>
                    <div><Link href={solution}>Video</Link></div>
                </div>
            </div>
            
        </form>
    )
}
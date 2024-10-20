import { Question } from "./question";

interface QuestionsProps {
    questions: any,
    userId: string
}

export const Questions: React.FC<QuestionsProps> = ({questions, userId}) => {   
    return (
        <>
            {questions.map((question: any) => (
                <Question key={question._id} question={question.question} difficulty={question.difficulty} solution={question.solution} link={question.link} userId={userId}/>
            ))}
        </>
    )
}
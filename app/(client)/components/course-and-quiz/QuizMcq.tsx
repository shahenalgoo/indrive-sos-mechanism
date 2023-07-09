'use client';

// React
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

// Typings
import { QuizSchema } from "@/types/typings";

// Components
import toast from "react-hot-toast";

// Quiz
import NextButton from "./NextButton";
import RadioCard from "./RadioCard";




interface QuizMcqProps {
    questionData: QuizSchema;
    setScore: Dispatch<SetStateAction<number>>;
    onNextQuestion: () => void;
}

const QuizMcq: FC<QuizMcqProps> = ({ questionData, setScore, onNextQuestion }) => {

    // States
    //
    const [selectedOption, setSelectedOption] = useState<number | null>(null);


    // Option selector
    //
    const onOptionChange = (index: number) => {
        setSelectedOption(index);
    };


    // Check correct answer before proceeding
    //
    const checkWin = () => {
        if (selectedOption === null) {
            toast.error("Please choose an option");
            return;
        }

        if (selectedOption === questionData.correct_answer) {
            setScore((prev) => prev + 1);
        }

        onNextQuestion();
    };


    useEffect(() => {

        setSelectedOption(null);

    }, [questionData?.question]);

    return (
        <>
            <div className="flex flex-col gap-4">
                {questionData.options.map((option: any, index: any) => (
                    <RadioCard
                        key={index}
                        checked={selectedOption === index}
                        onChange={() => onOptionChange(index)}
                        className=""
                    >
                        {option}
                    </RadioCard>
                ))}
            </div>

            <NextButton onClick={checkWin} />
        </>
    );
}

export default QuizMcq;
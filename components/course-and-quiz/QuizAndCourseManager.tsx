'use client';

// React
import { FC, useEffect, useState } from "react";

// Typings
import { CourseAndQuizSchema } from "@/types/typings";
import { Button, buttonVariants } from "../ui/button";
import QuizMcq from "./QuizMcq";
import NextButton from "./NextButton";
import { useUser } from "@/context/SessionContext";
import Link from "next/link";

interface CourseAndQuizManagerProps {
    courseAndQuizData: CourseAndQuizSchema[]
}

const CourseAndQuizManager: FC<CourseAndQuizManagerProps> = ({ courseAndQuizData }) => {

    const sections: CourseAndQuizSchema[] = courseAndQuizData;
    const totalSections = sections.length;

    const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
    const [currentSection, setCurrentSection] = useState<CourseAndQuizSchema>(sections[0]);

    const [score, setScore] = useState<(number)>(0);
    const [quizEnded, setQuizEnded] = useState<boolean>(false);

    const [totalQuestions, setTotalQuestions] = useState<(number)>(0);


    // Go to next section or end quiz
    const onNextSection = () => {
        if (currentSectionIndex + 1 < totalSections) {
            setCurrentSection(sections[currentSectionIndex + 1]);
            setCurrentSectionIndex(currentSectionIndex + 1);
        } else {
            setQuizEnded(true);
        }
    }


    // Restart
    const onRestart = () => {
        if (!sections) return;

        setCurrentSectionIndex(0);
        setCurrentSection(sections[0]);
        setScore(0);
        setQuizEnded(false);
    };


    // Calculate total number of quizzes
    const calculateTotalQuestions = () => {
        let total = 0;
        sections.forEach(element => {
            if (element.quiz) {
                total++;
            }
        });

        setTotalQuestions(total);
    }

    const { prefs, updatePrefs } = useUser();

    const awardBadge = () => {
        // If score not 100%, no badge
        if (score !== totalQuestions) {
            console.log("No badge awarded");
            return;
        }

        // Update in DB
        updatePrefs({
            moodprefs: prefs.moodprefs,
            safety_badge: true
        });

        console.log("Badge awarded");

    }


    // Calculate total questions
    useEffect(() => {
        calculateTotalQuestions();
    }, []);


    // Award Badge
    useEffect(() => {
        if (!quizEnded) return;
        awardBadge();
    }, [quizEnded]);


    const courseAndQuiz = () => {

        return (
            <>
                {currentSection && currentSection.course &&
                    <>
                        <h1 className="scroll-m-20 text-center text-lg sm:text-2xl tracking-tight">
                            {currentSection.course.title}
                        </h1>

                        {currentSection.course.jsx ?
                            <div className="parsed-body" dangerouslySetInnerHTML={{ __html: currentSection.course.body }}></div>
                            :
                            <p className="text-center text-sm">
                                {currentSection.course.body}
                            </p>
                        }


                        <NextButton onClick={onNextSection} />
                    </>
                }

                {currentSection && currentSection.quiz &&
                    <>
                        <h1 className="scroll-m-20 text-center text-lg sm:text-2xl tracking-tight">
                            {currentSection.quiz.question}
                        </h1>

                        <QuizMcq
                            questionData={currentSection.quiz}
                            setScore={setScore}
                            onNextQuestion={onNextSection}
                        />
                    </>
                }

            </>
        )
    }

    const endScreen = () => {
        return (
            <div className="text-center">
                <h3 className="text-2xl mb-4">Congrats, you completed the course!</h3>

                {/* Display score */}
                {totalQuestions > 0 &&
                    <h3 className="text-2xl mb-4">Your score: {score}/{totalQuestions}</h3>
                }

                {score === totalQuestions ?
                    <h3 className="text-2xl mb-4">You have unlocked the badge!</h3>
                    :
                    <h3 className="text-2xl mb-4">You need to score 100% to unlock the badge</h3>
                }




                <div className="flex justify-center gap-4">
                    <Button onClick={onRestart}>
                        Restart
                    </Button>

                    <Link href='/ride' className={buttonVariants({ variant: "accent" })}>
                        Quit
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="px-4 h-full flex flex-col justify-center gap-8">
                {quizEnded ? endScreen() : courseAndQuiz()}
            </div>
        </>
    );
}

export default CourseAndQuizManager;
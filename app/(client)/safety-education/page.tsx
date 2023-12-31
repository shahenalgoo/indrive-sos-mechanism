// Components
import CourseAndQuizManager from '@/app/(client)/components/course-and-quiz/QuizAndCourseManager';

// Data
import { courseAndQuizData } from '@/data/course-quiz-data';

export default function Home() {
	return <CourseAndQuizManager courseAndQuizData={courseAndQuizData} />
}

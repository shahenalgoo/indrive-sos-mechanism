import CourseAndQuizManager from '@/components/course-and-quiz/QuizAndCourseManager';
import { courseAndQuizData } from '@/data/course-quiz-data';

export default function Home() {
	return (
		<>
			<CourseAndQuizManager courseAndQuizData={courseAndQuizData} />
		</>
	)
}

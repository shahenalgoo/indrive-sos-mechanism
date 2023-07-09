// Typings
import { CourseAndQuizSchema } from "@/types/typings";


export const courseAndQuizData: CourseAndQuizSchema[] = [
    {
        course: {
            title: "Passenger Safety Program",
            body: `
                <p>Follow the course and score 100% to get a badge displayed on your profile publicly!</p>
            `,
        }
    },
    {
        course: {
            title: "Before the ride",
            body: `
                <p>Check the license plate, car model, and driver photo before starting a trip.</p>
                <p>Cancel the ride if the info doesn't match.</p>
            `,
        }
    },
    {
        quiz: {

            question: "What should you do before entering a vehicle?",
            options: [
                "Request the driver's criminal record.",
                "Verify the driver's insurance information.",
                "Check the license plate, car model, and driver photo.",
                "Always sit in the front passenger seat."
            ],
            correct_answer: 2,
        }
    },
    {
        course: {
            title: "During the ride",
            body: `
                <p>As soon as you are in the ride, tap the shield icon to access <strong>Precautions</strong></p>
                <p>You can choose to share your live location with trusted contacts, record audio and authenticate the ride.</p>
                <p>Tap the SOS icon on the main screen to access our <strong>SOS & Emergency services</strong>.</p>
            `,
        }
    },
    // {
    //     course: {
    //         title: "During the ride",
    //         body: `
    //             <p>Treat your driver's vehicle with care: don't smoke, eat, or drink anything but water in the car.</p>
    //             <p>Feel free to ask the driver to change the music, adjust the temperature, or close the window. Just make sure your request works for both of you.</p>
    //             <p>If you do not feel comfortable asking, you can set your preferences in <strong>Mood & Preferences</strong>. They will appear on your public profile.</p>
    //             `
    //     }
    // },
    {
        quiz: {

            question: "Where can you access live location sharing, audio recording and ride authentication?",
            options: [
                "SOS & Emergency (SOS Icon)",
                "Precautions (Shield Icon)",
                "Mood & Preferences",
                "Profile Settings"
            ],
            correct_answer: 1,
        }
    },
    // {
    //     quiz: {

    //         question: "What should you primarily avoid doing inside the vehicle?",
    //         options: [
    //             "Smoke, eat, or drink alcohol",
    //             "Respect the driver.",
    //             "Bring pets without prior approval.",
    //             "Make phone calls without using headphones."
    //         ],
    //         correct_answer: 0,
    //     }
    // },
    // {
    //     quiz: {

    //         question: "How can you personalize your experience without directly interacting with the driver?",
    //         options: [
    //             "Use the messaging feature to communicate with the driver.",
    //             "Share your preferences with the customer support team.",
    //             "Start an SOS request.",
    //             "Set your mood and preferences, which appear on your public profile.",
    //         ],
    //         correct_answer: 3,
    //     }
    // },
    {
        quiz: {

            question: "How can you access the safety agent support and police assistance features?",
            options: [
                "SOS & Emergency (SOS Icon)",
                "Precautions (Shield Icon)",
                "Mood & Preferences",
                "Profile Settings"
            ],
            correct_answer: 0,
        }
    },
    {
        course: {
            title: "Respect & Kindness",
            body: `
                <p>Each person you encounter has a unique story, facing their own triumphs and challenges.</p>
                <p>So, let's create an atmosphere of kindness and understanding, reminding each other that we are all humans.</p>
            `
        }
    },
    {
        quiz: {

            question: "What should you keep in mind to create a positive environment?",
            options: [
                "Practice active listening and engage in meaningful conversations.",
                "Treat each other with respect and kindness.",
                "Assume that everyone's experiences are the same.",
                "Disregard the emotions and perspectives of others."
            ],
            correct_answer: 1,
        }
    },
]
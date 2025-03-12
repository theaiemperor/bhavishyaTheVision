
// Global
export interface IObj<T = string> {
    [key: string]: T
}




// Quiz
export type IQuestion = {
    question: string
    options: string[]
    correct: string | string[]
};




export interface IQuiz {
    id: string
    title: string
    description: string
    timeLimit: number,
    questions: IQuestion[]
}



// Result
export type IAnswer = IObj<string | string[]>;



export interface IResult {
    question: string
    correct: string | string[]
    user: string | string[]
    type: 'correct' | 'partial' | 'incorrect'
}








// Functions

export function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};



export function getColor(score: number, joy?: boolean) {
    if (score < 40) {
        return joy ? 'danger' : "#EF4444"; // Tailwind red-500 for low scores
    } else if (score < 80) {
        return joy ? 'warning' : "#F59E0B"; // Tailwind amber-500 for medium scores
    } else {
        return joy ? 'success' : "#22C55E"; // Tailwind green-500 for high scores
    }
};



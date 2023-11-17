import { create } from 'zustand'
import { type State } from '../types'

export const useQuestionsStore = create<State>((set, get) => ({
  questions: [],
  currentQuestion: 0,

  fetchQuestions: async (limit: number) => {
    const res = await fetch('http://localhost:5173/data.json')
    const json = await res.json()
    const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
    // set((state) => (state.questions = questions))
    set({ questions })
  },

  selectAnswer: (questionId: number, answerIndex: number) => {
    // obteniendo las preguntas
    const { questions } = get()

    // clonando las preguntas
    const newQuestions = structuredClone(questions)

    // buscando el índice de la pregunta por questionId
    const questionIndex = newQuestions.findIndex((q) => q.id === questionId)

    // deshabilitando la posibilidad de cambiar la respuesta seleccionada
    if (newQuestions[questionIndex].userSelectedAnswer !== undefined) return

    // obteniendo información de la pregunta
    const questionInfo = newQuestions[questionIndex]

    // comprobando si la pregunta es correcta
    const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

    // actualizando información de la pregunta
    newQuestions[questionIndex] = {
      ...questionInfo,
      isCorrectUserAnswer,
      userSelectedAnswer: answerIndex,
    }

    // salvando estado
    set({ questions: newQuestions })
  },
}))

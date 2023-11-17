import { create } from 'zustand'
import { type State } from '../types'
import confetti from 'canvas-confetti'
import { persist } from 'zustand/middleware'
import { getAllQUestions } from '../services/questions'

export const useQuestionsStore = create<State>()(
  persist(
    (set, get) => ({
      questions: [],
      currentQuestion: 0,

      fetchQuestions: async (limit: number) => {
        const json = await getAllQUestions()
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
        if (isCorrectUserAnswer) confetti()

        // actualizando información de la pregunta
        newQuestions[questionIndex] = {
          ...questionInfo,
          isCorrectUserAnswer,
          userSelectedAnswer: answerIndex,
        }

        // salvando estado
        set({ questions: newQuestions })
      },

      goNextQuestion: () => {
        const { questions, currentQuestion } = get()
        const nextQuestion = currentQuestion + 1

        if (nextQuestion < questions.length) {
          set({ currentQuestion: nextQuestion })
        }
      },

      goPreviusQuestion: () => {
        const { currentQuestion } = get()
        const previusQuestion = currentQuestion - 1

        if (previusQuestion >= 0) {
          set({ currentQuestion: previusQuestion })
        }
      },

      reset: () => {
        set({ questions: [], currentQuestion: 0 })
      },
    }),
    {
      name: 'questions',
    }
  )
)

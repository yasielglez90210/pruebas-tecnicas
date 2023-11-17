import { type Question as QuestionType } from '../types'

export const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info
  // usuario no ha seleccionado nada todavía
  if (userSelectedAnswer == null) return 'transparent'
  // si ya seleccionó pero la respuesta no es la seleccionada por el usuarios
  if (index !== correctAnswer && index !== userSelectedAnswer)
    return 'transparent'
  // si esta es la solución correcta
  if (index === correctAnswer) return 'green'
  // si esta es la selección del usuario pero no es correcta
  if (index === userSelectedAnswer) return 'red'
  // si no es ninguna de las anteriores
  return 'transparent'
}

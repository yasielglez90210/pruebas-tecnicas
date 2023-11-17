import { Button } from '@mui/material'
import { useQuestionsStore } from '../store/questions'
import { buttonCenter } from '../utils/classes'

export const Start = () => {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions)

  const handleClick = () => {
    fetchQuestions(10)
  }
  return (
    <Button sx={buttonCenter} onClick={handleClick} variant="contained">
      Empezar
    </Button>
  )
}

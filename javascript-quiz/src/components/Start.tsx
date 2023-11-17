import { Button } from '@mui/material'
import { useQuestionsStore } from '../store/questions'

export const Start = () => {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions)

  const handleClick = () => {
    fetchQuestions(10)
  }
  return (
    <Button
      sx={{ display: 'flex', marginLeft: 'auto', marginRight: 'auto' }}
      onClick={handleClick}
      variant="contained"
    >
      Empezar
    </Button>
  )
}

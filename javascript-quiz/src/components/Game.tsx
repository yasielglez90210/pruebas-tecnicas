import { IconButton, Stack, Typography } from '@mui/material'
import { useQuestionsStore } from '../store/questions'
import { Question } from './Question'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { Footer } from './Footer'

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions)
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion)
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion)
  const goPreviusQuestion = useQuestionsStore(
    (state) => state.goPreviusQuestion
  )

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Stack
        marginBottom={'5px'}
        direction={'row'}
        gap={1}
        justifyContent={'right'}
        alignItems={'center'}
      >
        <IconButton
          size={'small'}
          disabled={currentQuestion === 0}
          onClick={goPreviusQuestion}
        >
          <ArrowBackIosNew fontSize={'small'} />
        </IconButton>
        <Typography fontSize={'small'}>
          {currentQuestion + 1} / {questions.length}
        </Typography>
        <IconButton
          size={'small'}
          disabled={currentQuestion >= questions.length - 1}
          onClick={goNextQuestion}
        >
          <ArrowForwardIos fontSize={'small'} />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  )
}

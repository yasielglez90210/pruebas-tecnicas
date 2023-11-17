import { Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { useQuestionsInfo } from '../hooks/useQuestionsInfo'
import { RestartAlt } from '@mui/icons-material'
import { buttonCenter, infoClasses } from '../utils/classes'
import { useQuestionsStore } from '../store/questions'

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionsInfo()
  const reset = useQuestionsStore((state) => state.reset)

  return (
    <>
      <Stack
        marginTop={'20px'}
        marginBottom={'20px'}
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Card variant={'outlined'}>
          <CardContent sx={infoClasses}>
            <Typography>Correctas: {correct}</Typography>
          </CardContent>
        </Card>
        <Card variant={'outlined'}>
          <CardContent sx={infoClasses}>
            <Typography>Incorrectas: {incorrect}</Typography>
          </CardContent>
        </Card>
        <Card variant={'outlined'}>
          <CardContent sx={infoClasses}>
            <Typography>Sin responder: {unanswered}</Typography>
          </CardContent>
        </Card>
      </Stack>
      <Button
        onClick={reset}
        sx={buttonCenter}
        variant="contained"
        endIcon={<RestartAlt />}
      >
        Resetear
      </Button>
    </>
  )
}

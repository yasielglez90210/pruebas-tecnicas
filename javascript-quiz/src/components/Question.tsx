import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import { type Question as QuestionType } from '../types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useQuestionsStore } from '../store/questions'
import { Check } from '@mui/icons-material'
import { getBackgroundColor } from '../utils/getBackgroundColor'
import confetti from 'canvas-confetti'

export const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer)
  const { isCorrectUserAnswer } = info

  if (isCorrectUserAnswer !== undefined && isCorrectUserAnswer) confetti()

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography align="center" variant="h6">
          {info.question}
        </Typography>
        <SyntaxHighlighter language="javascript" style={atomOneDark}>
          {info.code}
        </SyntaxHighlighter>
        <Card variant="outlined" sx={{ background: '#f9f9f9' }}>
          <List disablePadding>
            {info.answers.map((answer, index, answers) => {
              const divider = index === answers.length - 1 ? false : true
              const selected = info.userSelectedAnswer ?? -1

              return (
                <ListItem
                  key={index}
                  disablePadding
                  onClick={createHandleClick(index)}
                >
                  <ListItemButton
                    divider={divider}
                    disabled={info.userSelectedAnswer !== undefined}
                    sx={{ backgroundColor: getBackgroundColor(info, index) }}
                  >
                    {selected === index && (
                      <ListItemIcon sx={{ position: 'absolute' }}>
                        <Check />
                      </ListItemIcon>
                    )}
                    <ListItemText
                      primary={answer}
                      sx={{ textAlign: 'center' }}
                    />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </Card>
      </CardContent>
    </Card>
  )
}

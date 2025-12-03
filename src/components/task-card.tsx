import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { Box, Card, CardContent, IconButton, Stack, Typography } from '@mui/material'
import { green, red } from '@mui/material/colors'
import type React from 'react'
import type { Task } from '../types/task'

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
}

interface TaskCardProps {
  task: Task
  doneTask: (id: string) => void
  deleteTask: (id: string) => void
  editTask: (id: string) => void
}

const TaskCard: React.FC<TaskCardProps> = ({ task, doneTask, deleteTask, editTask }) => {
  const getPriorityColor = (priority: Task['priority']) => {
    if (priority >= 1 && priority <= 3) return '#d32f2f'
    if (priority >= 4 && priority <= 7) return '#fbc02d'
    if (priority >= 8 && priority <= 10) return '#4caf50'
    return 'text.secondary'
  }

  const cardStyle = {
    '&:hover': {
      boxShadow: '0 15px 20px rgba(0, 0, 0, 0.15)',
      transform: 'translateY(-2px)',
    },
    backgroundColor: task.isDone ? 'rgba(76, 175, 80, 0.05)' : 'rgba(255, 255, 255, 0.5)',
    borderLeft: `5px solid ${getPriorityColor(task.priority)}`,
    borderRadius: 3,
    boxShadow: task.isDone ? '0 4px 6px rgba(0, 0, 0, 0.1)' : '0 10px 15px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    transition: 'all 0.3s ease-in-out',
  }

  return (
    <Card sx={cardStyle}>
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between', p: 3 }}
      >
        <Box>
          <Stack alignItems="center" direction="row" spacing={1} sx={{ mb: 1 }}>
            <Typography
              component="div"
              fontWeight="bold"
              sx={{
                color: task.isDone ? 'text.disabled' : 'text.primary',
                textDecoration: task.isDone ? 'line-through' : 'none',
              }}
              variant="h6"
            >
              {task.name}
            </Typography>
            <Typography sx={{ color: 'text.secondary', mt: '2px !important', opacity: 0.8 }} variant="subtitle2">
              ({task.subject})
            </Typography>
          </Stack>
        </Box>

        <Stack alignItems="flex-end" direction="row" justifyContent="space-between" sx={{ mt: 'auto', pt: 2 }}>
          <Typography color="text.primary" fontWeight="medium" sx={{ mr: 1 }} variant="body2">
            Due: {formatDate(task.date)}
          </Typography>
          <Typography fontWeight="bold" sx={{ color: 'text.disabled', letterSpacing: 0.5 }} variant="body2">
            Priority:{task.priority}
          </Typography>
        </Stack>
      </CardContent>

      <Box sx={{ borderTop: '1px solid #f0f0f0', display: 'flex', gap: 0.5, justifyContent: 'flex-end', p: 1 }}>
        <IconButton
          aria-label="mark done"
          onClick={() => doneTask(task.id)}
          size="small"
          sx={{ color: task.isDone ? green[500] : 'text.disabled' }}
        >
          {task.isDone ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
        </IconButton>
        <IconButton aria-label="edit" color="info" onClick={() => editTask(task.id)} size="small">
          <ModeEditIcon fontSize="small" />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => deleteTask(task.id)} size="small" sx={{ color: red[500] }}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    </Card>
  )
}

export default TaskCard

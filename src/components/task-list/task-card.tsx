import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ClearIcon from '@mui/icons-material/Clear'
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import SaveIcon from '@mui/icons-material/Save'
import { Box, Button, Card, CardContent, IconButton, Stack, Typography } from '@mui/material'
import { green, red } from '@mui/material/colors'
import dayjs, { type Dayjs } from 'dayjs'
import type React from 'react'
import { useEffect, useState } from 'react'
import { customButtonStyles } from '../../style/button'
import { cardStyle } from '../../style/card'
import { type Task, taskSchema } from '../../types/task'
import { errorMessages } from '../../utils/error-handler'
import { TaskInputFields } from '../input-form/task-input-fields'

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
}

interface TaskCardProps {
  task: Task
  doneTask: (id: string) => void
  deleteTask: (id: string) => void
  editTask: (id: string) => void
  updateTask: (id: string, updatedFields: Omit<Task, 'id' | 'isDone'>) => void
}

const TaskCard: React.FC<TaskCardProps> = ({ task, doneTask, deleteTask, editTask, updateTask }) => {
  const [name, setName] = useState<string>(task.name)
  const [subject, setSubject] = useState<string>(task.subject)
  const [priority, setPriority] = useState<number>(task.priority)
  const [date, setDate] = useState<Dayjs | null>(dayjs(task.date))

  useEffect(() => {
    setName(task.name)
    setSubject(task.subject)
    setPriority(task.priority)
    setDate(dayjs(task.date))
  }, [task.name, task.subject, task.priority, task.date])

  const handleSave = () => {
    const taskDraft = {
      ...task,
      date: date!.toDate(),
    }
    try {
      taskSchema.parse(taskDraft)
      const updatedFields = {
        date: date!.toDate(),
        name,
        priority,
        subject,
      }

      updateTask(task.id, updatedFields)
    } catch (err) {
      errorMessages(err as Error)
    }
  }

  const handleCancel = () => {
    setName(task.name)
    setSubject(task.subject)
    setPriority(task.priority)
    setDate(dayjs(task.date))

    editTask(task.id)
  }

  return (
    <Card sx={cardStyle(task)}>
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between', p: 3 }}
      >
        {!task.isEditMode ? (
          <>
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
          </>
        ) : (
          <>
            <TaskInputFields
              date={date}
              name={name}
              priority={priority}
              setDate={setDate}
              setName={setName}
              setPriority={setPriority}
              setSubject={setSubject}
              subject={subject}
            />
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 2 }}>
              <Button
                onClick={handleCancel}
                startIcon={<ClearIcon />}
                sx={customButtonStyles(false)}
                variant="outlined"
              >
                Cancel
              </Button>
              <Button onClick={handleSave} startIcon={<SaveIcon />} sx={customButtonStyles(true)} variant="contained">
                Save
              </Button>
            </Box>
          </>
        )}
      </CardContent>

      {!task.isEditMode && (
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
      )}
    </Card>
  )
}

export default TaskCard

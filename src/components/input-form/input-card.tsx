import { Box, Container, Typography } from '@mui/material'
import dayjs, { type Dayjs } from 'dayjs'
import { useAtom } from 'jotai'
import type React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import { tasksAtom } from '../../atoms/task-atoms'
import { errorMessages } from '../../error-handler'
import { logger } from '../../logger'
import { type Task, taskSchema } from '../../types/task'
import AddTaskButton from './add-button'
import { TaskInputFields } from './task-input-fields'

export const TaskInputCard = () => {
  const [_, setTasks] = useAtom(tasksAtom)
  const [name, setName] = useState<string>('')
  const [subject, setSubject] = useState<string>('')
  const [priority, setPriority] = useState<number>(1)
  const [date, setDate] = useState<Dayjs | null>(dayjs())

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const taskDraft = {
      date: date!.toDate(),
      id: uuidv4(),
      name,
      priority,
      subject,
    }
    try {
      const newTask: Task = taskSchema.parse(taskDraft)
      setTasks(prev => [...prev, newTask])
      logger.info(`Task added successfully:, ${newTask}`)
      toast.success('Task added Successfully!')
    } catch (err) {
      errorMessages(err as Error)
    }
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 5,
        boxShadow: 3,
        mb: 4,
        mt: 4,
        padding: 4,
      }}
    >
      <Typography align="center" color="text.primary" component="h2" gutterBottom variant="h5">
        Add New Task
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
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
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <AddTaskButton />
        </Box>
      </Box>
    </Container>
  )
}

import { Box, Container, Typography } from '@mui/material'
import dayjs, { type Dayjs } from 'dayjs'
import { useAtom } from 'jotai'
import type React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import { ZodError } from 'zod'
import { tasksAtom } from '../../atoms/task-atoms'
import {  type Task, taskSchema } from '../../types/task'
import AddTaskButton from './add-button'
import {TaskInputFields} from './task-input-fields'

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
      console.log('Task added successfully:', newTask)
      toast.success('Task added Successfully!')
    } catch (err) {
      ///////make a better error logger
      if (err instanceof ZodError) {
        const errorMessages = err.issues
          .map((err: { path: any[]; message: any }) => `${err.path.join('.')}: ${err.message}`)
          .join(', ')
        toast.error(`Validation Failed: ${errorMessages}`)
        console.error('Zod Validation Error:', err)
      } else {
        toast.error('An unexpected error occurred during task submission.')
        console.error('Unexpected Error:', err)
      }
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
          name={name}
          setName={setName}
          priority={priority}
          setPriority={setPriority}
          subject={subject}
          setSubject={setSubject}
          date={date}
          setDate={setDate}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <AddTaskButton />
        </Box>
      </Box>
    </Container>
  )
}

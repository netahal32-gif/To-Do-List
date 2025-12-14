import { Box, Container, Typography } from '@mui/material'
import dayjs from 'dayjs'
import {  useSetAtom } from 'jotai'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

import {  tasksAtom } from '../../atoms/task-atoms'
import { type NewTask, type Task, taskSchema } from '../../types/task'
import { errorMessages } from '../../utils/error-handler'
import { logger } from '../../utils/logger'
import AddTaskButton from './add-button'
import { TaskInputFields } from './task-input-fields'

const initialNewTaskDraft: NewTask = {
  name: '',
  subject: '',
  priority: 1,
  date: dayjs(),
};

export const TaskInputCard = () => {
  const setTasks = useSetAtom(tasksAtom)
  const [newTask, setNewTask] = useState<NewTask>(initialNewTaskDraft)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const taskDraft = {
      ...newTask,
      id: uuidv4(),
      date: newTask.date!.toDate()
    }
    try {
      const addTask: Task = taskSchema.parse(taskDraft)
      setTasks(prev => [...prev, addTask])
      setNewTask({
        name: '',
        subject: '',
        priority: 1,
        date: dayjs()
      });

      logger.info(`Task added successfully:, ${addTask}`)
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
        <TaskInputFields task={newTask} setTask={setNewTask} />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <AddTaskButton />
        </Box>
      </Box>
    </Container>
  )
}

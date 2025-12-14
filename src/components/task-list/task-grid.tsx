import { Container, Paper, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useAtom, useAtomValue } from 'jotai'
import type React from 'react'
import { toast } from 'react-toastify'

import { filteredTasksAtom, tasksAtom } from '../../atoms/task-atoms'
import type { Task } from '../../types/task'
import { Search } from './search'
import TaskCard from './task-card'

export const TaskGrid: React.FC = () => {
  const [tasks, setTasks] = useAtom(tasksAtom)
  const filteredTasks = useAtomValue(filteredTasksAtom)

  const handleDeleteTask = (id: string) => {
    toast.info('Task Deleted Successfully')
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
  }

  const handleEditTask = (id: string) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === id ? { ...task, isEditMode: !task.isEditMode } : task
    ))
    const newStatus = tasks.find(task => task.id === id)?.isEditMode ? 'Exited' : 'Entered'
    toast.info(` ${newStatus} Edit Mode`)
  }

  const handleUpdateTask = (id: string, updatedFields: Omit<Task, 'id' | 'isDone'>) => {
    setTasks(prevTasks => prevTasks.map(task => (task.id === id ? { ...task, ...updatedFields, isEditMode: false } : task)))
    toast.success('Task updated successfully!')
  }

  const handleStatusChange = (id: string) => {
    setTasks(prevTasks => prevTasks.map(task => (task.id === id ? { ...task, isDone: !task.isDone } : task)))
    const newStatus = tasks.find(task => task.id === id)?.isDone ? 'Unfinished' : 'Finished'
    toast.info(`Task is ${newStatus}`)
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 5,
        boxShadow: 3,
        mt: 5,
        p: { sm: 4, xs: 2 },
        padding: 4,
      }}
    >
      {!tasks.length ? (
        <Paper elevation={0} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 3, p: 4 }}>
          <Typography align="center" color="text.secondary" component="p" variant="h6">
            No Task Added Yet.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={4} sx={{ p: { sm: 2, xs: 0 } }}>
          <Search />
          {filteredTasks.map(task => (
            <Grid key={String(task.id)}>
              <TaskCard
                deleteTask={(id: string): void => {
                  handleDeleteTask(id)
                }}
                doneTask={(id: string): void => {
                  handleStatusChange(id)
                }}
                editTask={(id: string): void => {
                  handleEditTask(id)
                }}
                task={task}
                updateTask={(id: string, updatedFields: Omit<Task, 'id' | 'isDone'>): void => {
                  handleUpdateTask(id, updatedFields)
                }}
              ></TaskCard>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}

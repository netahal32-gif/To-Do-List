import { Container, Paper, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useAtom } from 'jotai'
import type React from 'react'
import { toast } from 'react-toastify'
import { tasksAtom } from '../atoms/task-atoms'
import type { Task } from '../types/task'
import TaskCard from './task-card'

export const TaskGrid: React.FC = () => {
  const [tasks, setTasks] = useAtom(tasksAtom)

  const handleDeleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id)
    toast.info('Task Deleted Successfully')
    setTasks(updatedTasks)
  }

  const handleEditTask = (id: string) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, isEditMode: !task.isEditMode } : task)))
    const newStatus = tasks.find(task => task.id === id)?.isEditMode ? 'Exited' : 'Entered'
    toast.info(` ${newStatus} Edit Mode`)
  }

  const handleUpdateTask = (id: string, updatedFields: Omit<Task, 'id' | 'isDone'>) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, ...updatedFields, isEditMode: false } : task)))
    toast.success('Task updated successfully!')
  }

  const handleStatusChange = (id: string) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, isDone: !task.isDone } : task)))
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
          {tasks.map(task => (
            <Grid
              key={String(task.id)}
              {...({
                component: 'div' as const,
                item: true,
                lg: 3,
                md: 4,
                sm: 6,
                xs: 12,
              } as const)}
            >
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

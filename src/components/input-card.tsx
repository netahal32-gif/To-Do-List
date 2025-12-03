import { Box, Container, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { type Dayjs } from 'dayjs'
import { useAtom } from 'jotai'
import type React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import { ZodError } from 'zod'
import { tasksAtom } from '../atoms/task-atoms'
import { numbers, subjects, type Task, TaskSchema } from '../types/task'
import AddTaskButton from './add-button'

export const TaskInputCard = () => {
  const [_, setTasks] = useAtom(tasksAtom)
  const [name, setName] = useState<string>('')
  const [subject, setSubject] = useState<string>('')
  const [priority, setPriority] = useState<number>()
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
      const newTask: Task = TaskSchema.parse(taskDraft)
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
        <Stack alignItems="flex-end" direction={{ sm: 'row', xs: 'column' }} spacing={2} sx={{ mb: 2 }}>
          <TextField
            label="Name"
            onChange={e => setName(e.target.value)}
            required
            sx={{ flex: 1 }}
            value={name}
            variant="outlined"
          />

          <FormControl required sx={{ minWidth: { sm: 120, xs: '100%' } }}>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              id="select-priority"
              label="Priority"
              labelId="priority-label"
              onChange={e => setPriority(e.target.value)}
              value={priority}
            >
              {numbers.map(number => (
                <MenuItem key={number} value={number}>
                  {number}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Stack alignItems="flex-end" direction={{ sm: 'row', xs: 'column' }} spacing={2} sx={{ mb: 2 }}>
          <FormControl required sx={{ flex: 1, minWidth: { sm: 120, xs: '100%' } }}>
            <InputLabel id="subject-label">Subject</InputLabel>
            <Select
              id="select-subject"
              label="Subject"
              labelId="subject-label"
              onChange={e => setSubject(e.target.value)}
              value={subject}
            >
              {subjects.map(s => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="DD/MM/YYYY"
              label="Due Date"
              onChange={newValue => setDate(newValue)}
              slotProps={{
                textField: {
                  required: true,
                },
              }}
              sx={{ flex: 1, width: '100%' }}
              value={date}
            />
          </LocalizationProvider>
        </Stack>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <AddTaskButton />
        </Box>
      </Box>
    </Container>
  )
}

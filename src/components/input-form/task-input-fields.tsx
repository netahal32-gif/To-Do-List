import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import type { Dayjs } from 'dayjs'

import { numbers, subjects, type NewTask } from '../../types/task'
import type React from 'react'

interface TaskInputs {
  task: NewTask
  setTask: React.Dispatch<React.SetStateAction<NewTask>>
}

export const TaskInputFields: React.FC<TaskInputs> = ({ task, setTask }) => {

  const updateNewTask = (name: string, value: any) => {
    setTask(prev => ({
      ...prev,
      [name as keyof typeof prev]: value,
    }));
  }

  const handleDateChange = (newValue: Dayjs | null) => {
    setTask(prev => ({
      ...prev,
      date: newValue,
    }));
  };

  return (
    <>
      <Stack alignItems="flex-end" direction={{ sm: 'row', xs: 'column' }} spacing={2} sx={{ mb: 2 }}>
        <TextField
          label="Name"
          name="name"
          onChange={(e) => {
            updateNewTask(e.target.name, e.target.value)
          }}
          required
          sx={{ flex: 1 }}
          value={task.name}
          variant="outlined"
        />

        <FormControl required sx={{ minWidth: { sm: 120, xs: '100%' } }}>
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select
            id="select-priority"
            label="Priority"
            name="priority"
            labelId="priority-label"
            onChange={(e) => {
              updateNewTask(e.target.name, e.target.value)
            }}
            value={task.priority}
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
            name="subject"
            labelId="subject-label"
            onChange={(e) => {
              updateNewTask(e.target.name, e.target.value)
            }}
            value={task.subject}
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
            name="date"
            onChange={handleDateChange}
            slotProps={{
              textField: {
                required: true,
              },
            }}
            sx={{ flex: 1, width: '100%' }}
            value={task.date}
          />
        </LocalizationProvider>
      </Stack>
    </>
  )
}

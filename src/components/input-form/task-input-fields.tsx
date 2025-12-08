import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { numbers, subjects, type FormTask } from '../../types/task'

export const TaskInputFields = ({
  name,
  setName,
  priority,
  setPriority,
  subject,
  setSubject,
  date,
  setDate,
}: FormTask) => {
  return (
    <>
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
            onChange={e => setPriority(Number(e.target.value))}
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
    </>
  )
}

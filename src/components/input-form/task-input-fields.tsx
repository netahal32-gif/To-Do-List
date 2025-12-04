import { Stack, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { numbers, subjects, type UseStateTask } from "../../types/task"

export default function TaskInputFields({
    name,
    setName,
    priority,
    setPriority,
    subject,
    setSubject,
    date,
    setDate,
}: UseStateTask) {
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
        </>
    )
}
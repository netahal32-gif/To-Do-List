import AddTaskIcon from '@mui/icons-material/AddTask'
import Button from '@mui/material/Button'
import type React from 'react'

import { customButtonStyles } from '../../style/button'

const AddTaskButton: React.FC = () => {
  return (
    <Button startIcon={<AddTaskIcon />} sx={customButtonStyles(true)} type="submit" variant="text">
      Add Task
    </Button>
  )
}

export default AddTaskButton

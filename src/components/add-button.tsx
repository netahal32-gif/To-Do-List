import AddTaskIcon from '@mui/icons-material/AddTask'
import Button from '@mui/material/Button'
import type React from 'react'

const customButtonStyles = {
  '&:active': {
    backgroundColor: '#F0F0F1',
    borderColor: 'rgba(0, 0, 0, 0.15)',
    boxShadow: 'rgba(0, 0, 0, 0.06) 0 2px 4px',
    color: 'rgba(0, 0, 0, 0.65)',
    transform: 'translateY(0)',
  },

  '&:hover, &:focus': {
    borderColor: 'rgba(0, 0, 0, 0.15)',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0 4px 12px',
    color: 'rgba(0, 0, 0, 0.65)',
    transform: 'translateY(-1px)',
  },
  alignItems: 'center',
  backgroundColor: '#1ee43f65',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '1.8rem',
  boxShadow: 'rgba(0, 0, 0, 0.02) 0 1px 3px 0',
  boxSizing: 'border-box',
  color: 'rgba(0, 0, 0, 0.85)',
  cursor: 'pointer',
  display: 'inline-flex',
  justifyContent: 'center',
  lineHeight: '1.25',
  margin: 0,
  minHeight: '3rem',
  padding: 'calc(.875rem - 1px) calc(1.5rem - 1px)',
  position: 'relative',
  textDecoration: 'none',
  touchAction: 'manipulation',
  transition: 'all 250ms',
  userSelect: 'none',
  verticalAlign: 'baseline',
  WebkitUserSelect: 'none',
  width: 'auto',
}

const AddTaskButton: React.FC = () => {
  return (
    <Button startIcon={<AddTaskIcon />} sx={customButtonStyles} type="submit" variant="text">
      Add Task
    </Button>
  )
}

export default AddTaskButton

import { ThemeProvider } from '@mui/material/styles'
import { TaskInputCard } from './components/input-form/input-card'
import customTheme from './style/theme'
import { Box, CssBaseline, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import { tasksAtom } from './atoms/task-atoms'
import { TaskGrid } from './components/task-list/task-grid'
import theme from './style/theme'
import { CustomToastContainer } from './components/toast-container'

function App() {
  const [tasks, _] = useAtom(tasksAtom)
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Box sx={{ background: theme.palette.background.default, minHeight: '100vh', p: 2 }}>
        <Box sx={{ mb: 4, pt: 4, textAlign: 'center' }}>
          <Typography component="h1" fontWeight="bold" gutterBottom variant="h3">
            To Do List
          </Typography>
          <Typography color="text.secondary" variant="subtitle1">
            There are {tasks.filter(t => !t.isDone).length} tasks remaining.
          </Typography>
        </Box>
        <TaskInputCard />
        <TaskGrid />
      </Box>
      <CustomToastContainer/>
    </ThemeProvider>
  )
}

export default App

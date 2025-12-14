import { Box, CssBaseline, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useAtomValue } from 'jotai'

import { tasksAtom } from './atoms/task-atoms'
import { TaskInputCard } from './components/input-form/input-card'
import { TaskGrid } from './components/task-list/task-grid'

import customTheme from './style/theme'
import { ToastContainer, Zoom } from 'react-toastify'

function App() {
  const tasks = useAtomValue(tasksAtom)
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Box sx={{ background: customTheme.palette.background.default, minHeight: '100vh', p: 2 }}>
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
      <ToastContainer
        autoClose={1000}
        closeButton={false}
        closeOnClick
        limit={3}
        newestOnTop={false}
        pauseOnFocusLoss={false}
        pauseOnHover
        position="bottom-right"
        rtl={false}
        theme="dark"
        transition={Zoom} />
    </ThemeProvider>
  )
}

export default App

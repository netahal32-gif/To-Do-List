import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { useAtom } from 'jotai'
import debounce from 'lodash.debounce'
import { useEffect, useRef, useState } from 'react'
import { searchQueryAtom } from '../../atoms/task-atoms'

export const Search = () => {
  const [_, setSearchQuery] = useAtom(searchQueryAtom)
  const [text, setText] = useState('')

  const debouncedSetQuery = useRef(
    debounce((value: string) => {
      setSearchQuery(value)
    }, 300),
  ).current

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setText(value)
    debouncedSetQuery(value)
  }

  const cancelSearch = () => {
    setText('')
    setSearchQuery('')
  }

  useEffect(() => {
    return () => {
      debouncedSetQuery.cancel()
    }
  }, [debouncedSetQuery])

  return (
    <TextField
      fullWidth
      onChange={handleChange}
      placeholder="Search tasks..."
      slotProps={{
        input: {
          endAdornment: text ? (
            <InputAdornment position="end">
              <IconButton aria-label="clear search" edge="end" onClick={cancelSearch}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ) : null,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
      sx={{ mb: 2 }}
      value={text}
      variant="outlined"
    />
  )
}

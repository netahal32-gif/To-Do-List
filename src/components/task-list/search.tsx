import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { useSetAtom } from 'jotai'
import { useDebounce } from 'use-debounce';
import { useEffect, useState } from 'react'

import { searchQueryAtom } from '../../atoms/task-atoms'

export const Search = () => {
  const setSearchQuery = useSetAtom(searchQueryAtom)
  const [text, setText] = useState<string>('')
  const [debouncedText] = useDebounce(text, 300);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  const cancelSearch = () => {
    setText('')
    setSearchQuery('')
  }

  useEffect(() => {
    setSearchQuery(debouncedText)
  }, [debouncedText])

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

import { toast } from 'react-toastify'
import { ZodError } from 'zod'

import { logger } from './logger'

export const errorMessages = (err: Error) => {
  if (err instanceof ZodError) {
    const errorMessages = err.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`).join(', ')
    toast.error(`Validation Failed: ${errorMessages}`)
    logger.error({ err }, 'Zod Validation Error: Validation Failed.')
  } else {
    toast.error('An unexpected error occurred during task submission.')
    logger.error({ err }, 'Unexpected Error during task submission.')
  }
}

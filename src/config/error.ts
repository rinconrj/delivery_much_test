import { Response } from 'express'

export default (error: Error, res: Response) => {
  if (['missing_items', 'missing_params', 'invalid_name'].includes(error.message)) {
    return res.status(400).send('bad request')
  }
  if (['not_found', 'not_available'].includes(error.message)) {
    return res.status(404).send('item not found')
  }
}

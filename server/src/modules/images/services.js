import { responseDataCreator } from '../../helpers/common.js'
import { uploadFileDB } from './db.js'

export const uploadFile = async (req, res, next) => {
  const itemId = req.params.itemId
  const { fileName } = req
  console.log('fileName', fileName)
  try {
    const file = await uploadFileDB({ itemId, name: fileName, path: `${itemId}/${fileName}` })
    res.json(responseDataCreator(file))
  } catch (error) {
    next(error)
  }
}

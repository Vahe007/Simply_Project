import { responseDataCreator } from '../../helpers/common.js'
import { uploadFileDB } from './db.js'
import { createdFilename } from '../../helpers/common.js'

export const uploadFile = async (req, res, next) => {
  const { exhibitId } = req.params
  try {
    const file = await uploadFileDB({
      itemId: +exhibitId,
      name: createdFilename,
      path: `${exhibitId}/${createdFilename}`,
    })
    res.json(responseDataCreator(file))
  } catch (error) {
    next(error)
  }
}

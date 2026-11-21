// use to parse the image

import multer from 'multer'

const upload = multer({storage: multer.diskStorage({})})

export default upload;
import { Router, raw } from "express"
import { writeFile, access } from "fs/promises";
import nocache from "nocache";
import { join, normalize, dirname } from "path"
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const router = Router()

const currentDir = dirname(fileURLToPath(import.meta.url))
const imagesDir = join(currentDir, "../public/usercontent/images/")

router.get("/:photoId", nocache(), async (req, res) => {
    const filePath = join(imagesDir + req.params.photoId + ".jpeg")
    
    try {
        await access(filePath)
    } catch (error) {
        // file does not exist
        if (error.message.includes("ENOENT")) {
            res.sendStatus(404)

        // file permission access denied
        } else if (error.message.includes("EACCES")) {
            res.status(500).send("file access permission denied")
        
        // unknown error
        } else {
            res.status(500).send(error.message)
        }

        return
    }

    res.sendFile(filePath)
})

router.post("/", raw({ type: "image/jpeg", limit: "5mb" }), async (req, res) => {
    if (req.headers["content-type"] !== "image/jpeg") {
        res.status(400).send("Invalid content type")
        return
    }
    
    const imageId = uuidv4()

    await writeFile(join(imagesDir + imageId + '.jpeg'), req.body)

    res.status(200).send(imageId)
})

export default router
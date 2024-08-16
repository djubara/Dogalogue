import { Router, raw } from "express"
import { writeFile, access } from "fs/promises";
import nocache from "nocache";
import { join, normalize, dirname } from "path"
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import cors from "cors"

const router = Router()

const currentDir = dirname(fileURLToPath(import.meta.url))
const imagesDir = join(currentDir, "../public/usercontent/images/")

router.post("/", raw({ type: "image/jpeg", limit: "5mb" }), async (req, res) => {
    if (req.headers["content-type"] !== "image/jpeg") {
        res.status(400).send("Invalid content type")
        return
    }
    
    const imageId = uuidv4()

    await writeFile(join(imagesDir + imageId + '.jpeg'), req.body)

    const imageUrl = join(process.env.URL, "/public/usercontent/images/", imageId)

    res.status(200).send({ imageId, imageUrl })
})

export default router
import { Router, raw } from "express"
import { writeFile, access, mkdir } from "fs/promises";
import nocache from "nocache";
import { join, normalize, dirname } from "path"
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import cors from "cors"
import { existsSync } from "fs";

const router = Router()

const currentDir = dirname(fileURLToPath(import.meta.url))
const imagesDir = join(currentDir, "../public/usercontent/images/")

router.post("/", raw({ type: "image/jpeg", limit: "5mb" }), async (req, res) => {
    if (req.headers["content-type"] !== "image/jpeg") {
        res.status(400).send("Invalid content type")
        return
    }
    
    const imageId = uuidv4()

    if (!existsSync(imagesDir)) {
        try {
            await mkdir(join(currentDir, "../public"))
            await mkdir(join(currentDir, "../public/usercontent"))
            await mkdir(imagesDir)
        } catch(err) {}
    }

    await writeFile(join(imagesDir + imageId + '.jpeg'), req.body)

    const baseUrl = process.env.NODE_ENV === "production"? process.env.URL : `http://localhost:${process.env.PORT ?? 3001}`

    const imageUrl = join(baseUrl, "/public/usercontent/images/", imageId + ".jpeg")

    res.status(200).send({ imageId, imageUrl })
})

export default router
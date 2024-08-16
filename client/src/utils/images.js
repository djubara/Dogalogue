

export async function uploadImage(file) {
    // todo: convert to jpg
    const res = await fetch("http://localhost:3001/usercontent/images", {
        method: "post",
        headers: {
            "Content-Type": "image/jpeg"
        },
        body: file
    })

    const { imageId, imageUrl } = await res.json()

    console.log(imageId, imageUrl)

    return imageUrl
}
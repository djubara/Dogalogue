

export async function uploadImage(file) {
    // todo: convert to jpg

    const baseUrl = "http://localhost:3001"

    const res = await fetch(baseUrl + "/usercontent/images", {
        method: "post",
        headers: {
            "Content-Type": "image/jpeg",
        },
        body: file
    })

    const { imageId, imageUrl } = await res.json()

    console.log(imageId, imageUrl)

    return imageUrl
}
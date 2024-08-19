

export async function uploadImage(file) {
    // todo: convert to jpg

    const baseUrl = "https://dogalogue.onrender.com"

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
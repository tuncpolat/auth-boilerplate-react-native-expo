export default async function uploadToS3(fileUrl, signedUrl) {
    const blob = await new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();
        console.log(xhr)
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', fileUrl, true);
        xhr.send(null);
    });

    console.log("Uploading!", JSON.stringify({ fileUrl, signedUrl, blob }));
    await fetch(signedUrl, { method: 'PUT', body: blob });

    blob.close();
}
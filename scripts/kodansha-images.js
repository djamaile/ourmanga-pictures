import * as fs from "fs";
import fetch from 'node-fetch';
import path from 'path';
import * as sharp from "sharp"

async function getImages(url) {
    const response = await fetch(url);
    const mangas = await response.json();
    mangas.map(async manga => await downloadImage(manga.image, manga.name.replace(/[^\w\s]/gi, '').replace(/\s+/g, '')));
}

const downloadImage = async (url, imageName) => {
    console.info(`fetching image for ${url}`)
    imageName = imageName.split("?")[0];
    await fetch(url)
	.then(res =>
	   res.body.pipe(fs.createWriteStream(path.resolve("kodansha", imageName + ".jpg")))
	)
    .catch(e => console.error(e));
}

const BASE_URL = "http://localhost:8080";
getImages(`${BASE_URL}/releases/kodansha`);

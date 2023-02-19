import * as fs from "fs";
import * as Axios from "axios";
import fetch from 'node-fetch';
import path from 'path';

async function getImages(url) {
    const response = await fetch(url);
    const mangas = await response.json();
    mangas.map(manga => downloadImage(manga.image, manga.image.split("/").at(-1)));
}

const downloadImage = async (url, imageName) => {
    fetch(url)
	.then(res =>
		res.body.pipe(fs.createWriteStream(path.resolve("kodansha", imageName)))
	)
}

const BASE_URL = "http://localhost:8080";
getImages(`${BASE_URL}/releases/kodansha`);

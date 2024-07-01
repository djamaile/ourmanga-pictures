import * as fs from "fs";
import fetch from 'node-fetch';
import path from 'path';

async function getImages(url) {
    const response = await fetch(url);
    const mangas = await response.json();
    mangas.map(async manga => await downloadImage(manga.image, manga.name.replace(/[^\w\s]/gi, '').replace(/\s+/g, '')));
}

const downloadImage = async (url, imageName) => {
    console.info(`fetching image for ${url}`)
    const imageNameRef = imageName.split("?")[0];
    await fetch(url)
	.then(res =>
        {
            const filePath = path.resolve("kodansha", imageNameRef + ".jpg");
            if(fs.existsSync(filePath)){
                console.log(`Skipping ${imageName}, already exists \n`);
                return;
            }else{
                console.log(`New image: ${imageName} added \n`)
                return res.body.pipe(fs.createWriteStream(filePath))
            }
        }
	)
    .catch(e => console.error(e) && downloadImage(url, imageName));
}

const BASE_URL = "http://localhost:8080";
getImages(`${BASE_URL}/releases/kodansha`);

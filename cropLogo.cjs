const { Jimp } = require("jimp");
const path = require("path");

async function cropImage() {
  try {
    const imgPath = path.join(__dirname, "public", "hrLogo.png");
    const image = await Jimp.read(imgPath);
    image.autocrop();
    await image.write(imgPath);
    console.log("Successfully auto-cropped hrLogo.png");
  } catch (error) {
    console.error("Error cropping image:", error);
  }
}

cropImage();

function startDownload() {
  let imageURL =
    "https://charlottegiseleweil.github.io/tiles/amazon/Usodelsuelo_PEM_Sostenible/10/315/549.png";

  downloadedImg = new Image();
  downloadedImg.crossOrigin = "Anonymous";
  downloadedImg.addEventListener("load", imageReceived, false);
  downloadedImg.src = imageURL;
}

function imageReceived() {
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");

  canvas.width = downloadedImg.width;
  canvas.height = downloadedImg.height;

  context.drawImage(downloadedImg, 0, 0);
  console.log(context.getImageData(10, 10, 1, 1).data);
}

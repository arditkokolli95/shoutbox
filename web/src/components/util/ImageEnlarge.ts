export default function imageEnlarge(imageSrc: string) {
    console.log('Image Source: ',imageSrc);
    imageSrc = encodeURI(imageSrc);
    var enlargedImageWrapper = document.createElement("div");
    enlargedImageWrapper.className = "enlargedImageWrapper";

    enlargedImageWrapper.style.background = 'RGBA(0,0,0,.5) url('+imageSrc+') no-repeat center';

    document.body.appendChild(enlargedImageWrapper);

    enlargedImageWrapper.onclick = function () {
        enlargedImageWrapper.remove();
    };
}
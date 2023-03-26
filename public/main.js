const html = document.documentElement;
const canvas = document.querySelector(".magic");
const context = canvas.getContext('2d');

// `../boxImages/${index.toString().padStart(6,'0')}.png`
const currentFrame = index => (
    `https://mymintbox.s3.ap-south-1.amazonaws.com/${index.toString().padStart(6,'0')}.png`
)
window.onload = function(){ document.getElementById("loading").style.display = "none" };
const frameCount = 77;
const preloadImages = ()=> {
    for (let i = 1; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        console.log(i)
    }
}
preloadImages();


canvas.height = 1500;
canvas.width = 1158;
// const img = new Image();
// img.src = currentFrame(1);
img.onload = function() {
    // context.drawImage(img,0,0);
    context.drawImage(img,(canvas.width-img.width)/2, (canvas.height-img.height)/2);
}

const updateImage = index => {
    img.src = currentFrame(index);
    // context.drawImage(img, 0, 0);
    context.drawImage(img, (canvas.width-img.width)/2 ,(canvas.height-img.height)/2);
}

window.addEventListener('scroll', () => {
    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(frameCount -  1, Math.floor(scrollFraction * frameCount));
    requestAnimationFrame(()=> updateImage(frameIndex < 0 ? 1 : frameIndex + 1));
})

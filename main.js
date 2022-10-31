//@ts-nocheck
let img;
let objects = [];
let music1;
function preload() {
soundFormats('mp3', 'ogg');
  music1 = loadSound("music1.mp3");
  img = loadImage("baby.jpg");
}

function setup() {
  canvas = createCanvas(600, 500);
  canvas.parent("container");

  objectDetector = ml5.objectDetector("cocossd", () => {
    console.log("Model Loaded!");
  });
}
function gotResult(err, results) {
  if (err) {
    console.log(err);
  }
  console.log(results);
  objects = results;
}
function draw() {
    image(img, 0,0,)
  objectDetector.detect(img, gotResult);
  for (var i = 0; i < objects.length; i++) {
    fill("#ff0000");
    let percent = floor(objects[i].confidence * 100);
    text(
      `${objects[i].label} ${percent}%`,
      objects[i].x + 15,
      objects[i].y + 15
    );
    noFill();
    stroke("#ff0000");
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
  }
  if (objects == []) {
     music1.play();
  }
  if (objects !== []) {
    let xyx = 0;
    document.querySelector("#objects").innerHTML = "Objects Found";
    objects.forEach(element=>{
        if (element.label == "person"){
            xyx++;
        }
    })
    if (xyx != 1){
    document.querySelector("#baby").innerHTML = "Baby Not Found";
        music1.play();
    } else{    
    document.querySelector("#baby").innerHTML = "Baby Found";
    }
  }
}

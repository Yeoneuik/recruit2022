let sizeR = 4;
let main, explain, contact, minilogo, crew;
let pad = 30;

function preload() {
  main = loadImage("osl_main.png");
  explain = loadImage("exlpain1.png");
  contact = loadImage("contact1.png");
  minilogo = loadImage("minilogo1.png");
  crew = loadImage("crew1.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight,P2D);
  imageMode(CENTER);
  mx = width/2;
  my = 0;
  colorMode(HSB);
  background(255);

  //DeviceOrientationEvent, DeviceMotionEvent
  if (
    typeof DeviceOrientationEvent !== "undefined" &&
    typeof DeviceOrientationEvent.requestPermission === "function"
  ) {
    //ios 13 device
    DeviceOrientationEvent.requestPermission()
      .catch(() => {
        let button = createButton("클릭하여 센서를 허가해주세요! <br> 클릭 후 새로고침이 필요할 수도 있습니다!");
        button.style('font-size', '24px');
        button.mousePressed(requsetAccess);
        button.center();
        throw error;
      })
      .then(() => {
        // on any subsequent visits
        permissionGranted = true;
      });
  } else {
    //non ios 13 device
    textSize(48);
    // text("non ios 13 device", 100, 100);
    permissionGranted = true;
  }
}

function requsetAccess() {
  DeviceOrientationEvent.requestPermission()
    .then((response) => {
      if (response == "granted") {
        permissionGranted = true;
      } else {
        permissionGranted = false;
      }
    })
    .catch(console.error);
  this.remove();
}

function requsetAccess() {
  DeviceOrientationEvent.requestPermission()
    .then((response) => {
      if (response == "granted") {
        permissionGranted = true;
      } else {
        permissionGranted = false;
      }
    })
    .catch(console.error);
  this.remove();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(255);
}

function draw() {
  if (!permissionGranted) {
    return;
  }
  const dx = constrain(rotationY, -5, 5);
  const dy = constrain(rotationX, -5, 5);
  mx += dx;
  my += dy;
  mx = constrain(mx, 0, width);
  my = constrain(my, 0, height);

  stroke(random(255), 255, 255, 100);
  fill(255);
  ellipse(mx, my, width / sizeR);

  push();
  var mainRatio = 2;
  var mW = 1134 / mainRatio;
  var mH = 678 / mainRatio;
  image(main, width/2, height/2, mW, mH);

  var expRatio = 1.5;
  var eW = 816 / expRatio;
  var eH = 265 / expRatio;
  image(explain, eW / 2 + pad, height - eH / 2 - pad, eW, eH);

  var contRatio = 1.5;
  var cW = 436 / contRatio;
  var cH = 90 / contRatio;
  image(contact, width - cW / 2 - pad, height - cH / 2 - pad, cW, cH);

  var miniRatio = 1.5;
  var mnW = 188 / miniRatio;
  var mnH = 94 / miniRatio;
  image(minilogo, width - mnW / 2 - pad, mnH / 2 + pad, mnW, mnH);

  var crewRatio = 1.5;
  var crW = 422 / crewRatio;
  var crH = 73 / crewRatio;
  image(crew,crW / 2 + pad,crH / 2 + pad, crW, crH);
  pop();
}

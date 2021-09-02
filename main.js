
object = [];
status = "";

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetect = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
    objectDetect.detect(video, gotResults);
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object = results;
}

function draw(){
    image(video, 0, 0, 380, 380);
    
    if(status != ""){
        for(i = 0; i < object.length; i++){

            r = random(255);
            
            g = random(255);

            b = random(255);

            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("objects").innerHTML = "No. of objects detected : " + object.length;

            objectDetect.detect(video, gotResults);

            fill(r, g, b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + " %", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            
        }
    }
}

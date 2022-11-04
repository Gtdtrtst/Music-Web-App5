song1 ="";
song2 ="";
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
scoreleftwrist = 0;
scorerightwrist = 0;
song1status = "";
song2status = "";
function setup(){
    canvas = createCanvas(600,450);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide() ;

    posenet = ml5.poseNet(video,modelLoaded);

    posenet.on('pose',gotResults)
}

function draw(){
    image(video,0,0,600,450);

    song1status = song1.isPlaying();
    song2status = song2.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreleftwrist>0.2){
    circle(leftWristx,leftWristy,20);
    song2.stop();
    if(song1status == false){
        song1.play();
        document.getElementById("songName").innerHTML= "Playing : 1st song";
    }
}

    if(scorerightwrist>0.2){
    circle(rightWristx,rightWristy,20);
    song1.stop();
    if(song2status == false){
        song2.play();
        document.getElementById("songName").innerHTML= "Playing : 2nd song";
    }
}
}

function preload(){
    song1 = loadSound("Music1.mp3");
    song2 = loadSound("Music2.mp3");
}

function modelLoaded(){
    console.log("The model has been loaded")
}

function gotResults(results){
    if(results.length>0){
        console.log(results);
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log("leftwristx = "+leftWristx+" leftwristy = "+ leftWristy);
        scoreleftwrist = results[0].pose.keypoints[9].score;

        righrWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log("rightwristx = "+rightWristx+" rightwristy = "+ rightWristy);
        scorerightwrist = results[0].pose.keypoints[10].score;
    }
}
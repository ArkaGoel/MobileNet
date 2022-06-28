function setup(){
    classifier = ml5.imageClassifier('MobileNet', modelLoaded)
    canvas = createCanvas(320, 300)
    canvas.position(627, 145)
    video = createCapture(VIDEO);
    video.hide()
}
function modelLoaded(){
    console.log("Model Loaded!");
}
function draw(){
    image(video, 0, 0, 320, 300)
    classifier.classify(video, gotResults)
}
function gotResults(error, results){
    if(error){
        console.error(error);
    } else{
        previous_result =""
        if((results[0].confidence > 0.5) && (results[0].label != previous_result)){
            console.log(results);
            previous_result = results[0].label
            synth = window.speechSynthesis
            speak_data = "The Identified Object is" + results[0].label;
            var utterThis = new SpeechSynthesisUtterance(speak_data);
            synth.speak(utterThis)
            document.getElementById("Obj").innerHTML = results[0].label;
            document.getElementById("Ac").innerHTML = results[0].cofidence;
        }
    }
}
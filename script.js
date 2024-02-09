console.log("Welcome to Spotify!");
//INITIALIZE THE VARIABLE
let songIndex = 0;
let audioElement = new Audio('Songs/belong.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName:"Alone-Real Boss", filePath: "Songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName:"Belong-Straight Bank", filePath: "Songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName:"Kaley-Sheeshe-Addy Nagar", filePath: "Songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName:"Lalkara-Diljit Doshanjh", filePath: "Songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName:"Maharani-Arpit Bala", filePath: "Songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName:"Murder-Real Boss", filePath: "Songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName:"Old_Skool-Sidhu Moose Waala", filePath: "Songs/7.mp3", coverPath: "covers/7.jpg"},
]

songItems.forEach((element,i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//audioElement.play();

//HANDLE PLAY/PAUSE CLICK

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

//LISTEN TO EVENTS
audioElement.addEventListener('timeupdate', ()=>{
    //UPDATE SEEK BAR
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `Songs/${songIndex}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})
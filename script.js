console.log("Welcome to Silvery!");

//Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("Songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myPrograssBar");
let gif = document.getElementById("playingGIF");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
    {songName: "Aadat Cover by Atif Aslam", filePath: "Songs/1.mp3", coverPath: "Images/Aadat logo.jpg"},
    {songName: "Aisay Kaisay - Hasan Raheem", filePath: "Songs/2.mp3", coverPath: "Images/2.jpg"},
    {songName: "Billo Rani - Goal", filePath: "Songs/3.mp3", coverPath: "Images/3.jpg"},
    {songName: "Heat-Waves ( Glass Animals)", filePath: "Songs/4.mp3", coverPath: "Images/4.jpg"},
    {songName: "Nasha-Equals Sessions", filePath: "Songs/5.mp3", coverPath: "Images/5.jpg"},
    {songName: "O Meri Jaan (Tum Mile) - K.K", filePath: "Songs/6.mp3", coverPath: "Images/6.jpg"},
    {songName: "Saiyyan - Kailash Kher", filePath: "Songs/7.mp3", coverPath: "Images/7.jpg"},
]

songItems.forEach((element,i)=>{
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("song_name")[0].innerText = songs[i].songName;
    
})

//Handle play/pause click
masterPlay.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

// Listen to events
audioElement.addEventListener("timeupdate", ()=>{
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;

})

myProgressBar.addEventListener("change", ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
            element.classList.remove("fa-circle-pause");
            element.classList.add("fa-circle-play");
            gif.style.opacity = 1;
        })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audioElement.src = `Songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
    })

})

document.getElementById("next").addEventListener("click", ()=>{
    if(songIndex >= 7)
    {
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `Songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
})

document.getElementById("previous").addEventListener("click", ()=>{
    if(songIndex <= 0)
    {
        songIndex = 7;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `Songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    
})
const image = document.querySelector("img");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");
const music = document.querySelector("audio");
const progressContainer = document.querySelector("#progress-container");
const progress = document.querySelector("#progress");
const currentTimeEl = document.querySelector("#current-time");
const durationEl = document.querySelector("#duration");
const prevBtn = document.querySelector("#prev");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");


//Music

const songs = [
    {
        name: "jacinto-1",
        displayName: "Electric Chill Machine",
        artist: "Jacinto Design",
    },
    {
        name: "jacinto-2",
        displayName: "Seven Nation Army (Remix)",
        artist: "Jacinto Design",
    },
    {
        name: "jacinto-3",
        displayName: "Goodnight Disco Queen",
        artist: "Jacinto Design",
    },
    {
        name: "metric-1",
        displayName: "Front Row (Remix)",
        artist: "Metric/Jacinto Design",
    },

];

// check if playing 
let isPlaying = false;
//Play

function playSong(){
    isPlaying=true;
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
    music.play();
}

//Pause

function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
    music.pause();
}

// play or pause event listener //

playBtn.addEventListener("click", () =>
    (isPlaying ? pauseSong() : playSong()));
//Update DOM 

function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.jpg`;

}
// Current Song 
let songIndex = 0;
//Previous Song 

function prevSong(){
    songIndex--;
    if(songIndex < 0 ){
        songIndex = songs.length -1;
    }
   
    loadSong(songs[songIndex]);
    playSong();
}
// Next Song 

function nextSong(){
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
  
    loadSong(songs[songIndex]);
    playSong();
}

//On Load - Select First Song

loadSong(songs[songIndex]);
//Update Progress Bar & Time 

function updateProgressBar(e){
    if(isPlaying){
        const {
            duration, currentTime
        } = e.srcElement;
       
        //Update progress bar width 
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        //Calculate display for duration
        const durationMin = Math.floor(duration / 60);
        console.log("minutes", durationMin);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        
       
        //delay switching duration element to avoid NaN
        if(durationSeconds){
            durationEl.textContent = `${durationMin}:${durationSeconds}`;
        }
        //Calculate display duration
        const currentMin = Math.floor(currentTime / 60);
        
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        
        
        currentTimeEl.textContent = `${currentMin}:${currentSeconds}`;
  

    }

}

//Set Progress Bar

function setProgressBar(e){
    console.log(e);
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX /width) * duration;
}
//Event Listeners

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click",nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
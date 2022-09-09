const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
//music
const songs = [{
            name: 'anaMennekEtaalemt',
            displayName: 'ana Mennek Etaalemt',
            artist: 'Mohamed Mounir',

        },
        {
            name: 'hawinYaLayel',
            displayName: 'hawin Ya Layel',
            artist: 'Mohamed Mounir',

        },
        {
            name: 'maakAlby',
            displayName: 'maak Alby',
            artist: 'Amr Diab',

        },
        {
            name: 'yaAgmalEyoun',
            displayName: 'ya Agmal Eyoun',
            artist: 'Amr Diab',

        }
    ]
    //check if playing
let isPlaying = false;
//play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause');
    music.play();
}
//pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
    music.pause();
}
//play or pause event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

//update dom
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.jpg`
}

//current song
let songIndex = 0;

//prev song
function prevSong() {
    if (songIndex < 0) {
        songIndex = length - 1;
    }
    songIndex--;
    loadSong(songs[songIndex]);
    playSong();
}
//next song
function nextSong() {
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    songIndex++;
    loadSong(songs[songIndex]);
    playSong();
}
//on load select first song
loadSong(songs[songIndex]);

function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        //console.log(duration, currentTime);
        //update progress bar  width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }

        //delay switching duration to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // calculate display for current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

function setProgressBar(e) {
    console.log(e);
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    console.log(clickX / width);
    music.currentTime = (clickX / width) * duration;


}
//eventlisteners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songNameElement = document.querySelector('.songInfo');

// Shuffle and Repeat Variables
let isShuffle = false;
let isRepeat = false;

// Songs List
let songs = [
    { songName: "Hukum Song by Anirudh Ravichander", filepath: "song/1.mp3", coverPath: "covers/1.jpg", backgroundPath: "backgrounds/bg1.jpg" },
    { songName: "Billa Theme Song by Mani Sharma ‧ 2000", filepath: "song/2.mp3", coverPath: "covers/2.jpg", backgroundPath: "backgrounds/bg2.jpg" },
    { songName: "New York Nagaram Song by A. R. Rahman ‧ 2023", filepath: "song/3.mp3", coverPath: "covers/3.jpg", backgroundPath: "backgrounds/bg3.jpg" },
    { songName: "Different Heaven & EH!DE - My Heart [NCS Relaese]-320k", filepath: "song/4.mp3", coverPath: "covers/4.jpg", backgroundPath: "backgrounds/bg4.jpg" },
    { songName: "Janji-Heroes-Tonight-feat-johnning-NCS-Release", filepath: "song/5.mp3", coverPath: "covers/5.jpg", backgroundPath: "backgrounds/bg5.jpg" },
    { songName: "Rabba - Salam-e-Ishq", filepath: "song/6.mp3", coverPath: "covers/6.jpg", backgroundPath: "backgrounds/bg6.jpg" },
    { songName: "Sakhiyaan - Salam-e-Ishq", filepath: "song/7.mp3", coverPath: "covers/7.jpg", backgroundPath: "backgrounds/bg7.jpg" },
    { songName: "Bhula Dena - Salam-e-Ishq", filepath: "song/8.mp3", coverPath: "covers/8.jpg", backgroundPath: "backgrounds/bg8.jpg" },
    { songName: "Tumhari Kasam - Salam-e-Ishq", filepath: "song/9.mp3", coverPath: "covers/9.jpg", backgroundPath: "backgrounds/bg9.jpg" },
    { songName: "Na Jaana - Salam-e-Ishq", filepath: "song/10.mp3", coverPath: "covers/10.jpg", backgroundPath: "backgrounds/bg10.jpg" },
];

// Initialize song items
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Function to update the background
const updateBackground = (backgroundPath) => {
    const container = document.querySelector('.container');
    console.log("Updating background to:", backgroundPath); // Debugging
    container.style.backgroundImage = `url('song/${backgroundPath}')`;
};

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        let getItemnumber = split(audioElement.url,'/');
        console.log('item : ', getItemnumber);
        updateBackground("backgrounds/bg1.jpg");

    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }

});

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Seek functionality
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Play song when a song item is clicked
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = i;
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filepath;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        songNameElement.innerText = songs[songIndex].songName;

        // Update the background
        updateBackground(songs[songIndex].backgroundPath);
    });
});

// Reset all play buttons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Shuffle Button
const shuffleButton = document.getElementById('shuffle');
shuffleButton.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleButton.classList.toggle('active', isShuffle);
    console.log("Shuffle is " + (isShuffle ? "ON" : "OFF"));
});

// Repeat Button
const repeatButton = document.getElementById('repeat');
repeatButton.addEventListener('click', () => {
    isRepeat = !isRepeat;
    repeatButton.classList.toggle('active', isRepeat);
    console.log("Repeat is " + (isRepeat ? "ON" : "OFF"));
});

// Function to play the next song
const playNextSong = () => {
    if (isShuffle) {
        // Shuffle logic: Play a random song
        songIndex = Math.floor(Math.random() * songs.length);
    } else {
        // Normal logic: Play the next song in sequence
        songIndex = (songIndex + 1) % songs.length;
    }
    audioElement.src = songs[songIndex].filepath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    songNameElement.innerText = songs[songIndex].songName;

    // Update the background
    updateBackground(songs[songIndex].backgroundPath);
};

// Function to play the previous song
const playPreviousSong = () => {
    if (isShuffle) {
        // Shuffle logic: Play a random song
        songIndex = Math.floor(Math.random() * songs.length);
    } else {
        // Normal logic: Play the previous song in sequence
        songIndex = (songIndex - 1 + songs.length) % songs.length;
    }
    audioElement.src = songs[songIndex].filepath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    songNameElement.innerText = songs[songIndex].songName;

    // Update the background
    updateBackground(songs[songIndex].backgroundPath);
};

// Handle end of song
audioElement.addEventListener('ended', () => {
    if (isRepeat) {
        // Repeat logic: Replay the current song
        audioElement.currentTime = 0;
        audioElement.play();
    } else {
        // Play the next song
        playNextSong();
    }
});

// Forward and Backward Buttons
document.getElementById('forward').addEventListener('click', playNextSong);
document.getElementById('backward').addEventListener('click', playPreviousSong);

// Volume Control
const volumeButton = document.getElementById('volumeButton');
const volumeSlider = document.getElementById('volumeSlider');

// Toggle volume slider visibility
volumeButton.addEventListener('click', () => {
    console.log("Volume button clicked"); // Debugging
    volumeSlider.classList.toggle('show');
});

// Update volume when slider is adjusted
volumeSlider.addEventListener('input', () => {
    audioElement.volume = volumeSlider.value;
    if (audioElement.volume === 0) {
        volumeButton.classList.remove('fa-volume-high');
        volumeButton.classList.add('fa-volume-off');
    } else {
        volumeButton.classList.remove('fa-volume-off');
        volumeButton.classList.add('fa-volume-high');
    }
});

// Set initial volume
audioElement.volume = volumeSlider.value;
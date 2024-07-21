const video = document.querySelector('video');

const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

video.volume = volumeRange.value;

const handlePlayClick = (e) => {
    if (video.paused) video.play();
    else video.pause();
}

const handleMute = (e) => {
    video.muted = !video.muted;
    muteBtn.innerText = video.muted ? "Unmute" : "Mute";
    volumeRange.value = video.muted ? 0 : video.volume;
}

const handleVolumeChange = (event) => {
    video.volume = event.target.value;
    if (video.muted) handleMute();
}

const handleLoadedMetaData = (event) => {
    totalTime.innerText =
        new Date(video.duration * 1000)
            .toISOString()
            .substring(14, 19);
}
const handleTimeUpdate = (event) => {
    currentTime.innerText = msToTime(video.currentTime);
}

function msToTime(duration) {
    let seconds = Math.floor(duration) % 60
    let minutes = Math.floor(duration / 60) % 60
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
}

const handlePause = () => playBtn.innerText = "Play";
const handlePlay = () => playBtn.innerText = "Pause";

playBtn.addEventListener("click", handlePlayClick)
muteBtn.addEventListener("click", handleMute)
video.addEventListener("pause", handlePause)
video.addEventListener("play", handlePlay)
muteBtn.addEventListener("click", handleMute)
volumeRange.addEventListener("input", handleVolumeChange)
video.addEventListener("loadedmetadata", handleLoadedMetaData);
video.addEventListener("timeupdate", handleTimeUpdate);
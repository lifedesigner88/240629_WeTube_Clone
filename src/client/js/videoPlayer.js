const video = document.querySelector('video');

const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
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

const handlePause = () => playBtn.innerText = "Play";
const handlePlay = () => playBtn.innerText = "Pause";

playBtn.addEventListener("click", handlePlayClick)
muteBtn.addEventListener("click", handleMute)
video.addEventListener("pause", handlePause)
video.addEventListener("play", handlePlay)
muteBtn.addEventListener("click", handleMute)
volumeRange.addEventListener("input", handleVolumeChange)




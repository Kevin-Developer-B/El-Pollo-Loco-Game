function toggleMute() {
  let muteIcon = document.getElementById('mute-icon');
  let unMuteIcon = document.getElementById('unMute-icon');

  muteIcon.style.display = muteIcon.style.display === 'none' ? '' : 'none';
  unMuteIcon.style.display = unMuteIcon.style.display === 'none' ? '' : 'none';

  gameMuted = !gameMuted;
  sessionStorage.setItem("gameMuted", JSON.stringify(gameMuted));

  if (gameMuted) {
    muteAllSounds();
  } else {
    unmuteAllSounds();
    sounds.background_music.currentTime = 0;
    sounds.background_music.play();
  }
}

function muteAllSounds() {
  Object.values(sounds).forEach(sound => {
    sound.pause();
    sound.volume = 0;
  });
}

function unmuteAllSounds() {
  Object.entries(sounds).forEach(([key, sound]) => {
    if (key === 'background_music') {
      sound.volume = 0.05;
    } else {
      sound.volume = 1;
    }
  });
}

function toggleScreen() {
  let fullscreenIcon = document.getElementById('fullscreen-icon');
  let noFullscreenIcon = document.getElementById('noFullscreen-icon');

  let fullscreenPlayIcon = document.getElementById('fullscreen-play-icon');
  let noFullscreenPlayIcon = document.getElementById('noFullscreen-play-icon');

  let fullscreen = document.getElementById('fullscreen');


  fullscreenIcon.style.display = fullscreenIcon.style.display === 'none' ? '' : 'none';
  noFullscreenIcon.style.display = noFullscreenIcon.style.display === 'none' ? '' : 'none';

  fullscreenPlayIcon.style.display = fullscreenPlayIcon.style.display === 'none' ? '' : 'none';
  noFullscreenPlayIcon.style.display = noFullscreenPlayIcon.style.display === 'none' ? '' : 'none';

  enterFullscreen(fullscreen);
}

function closetFullscreen() {
  let fullscreenIcon = document.getElementById('fullscreen-icon');
  let noFullscreenIcon = document.getElementById('noFullscreen-icon');

  let fullscreenPlayIcon = document.getElementById('fullscreen-play-icon');
  let noFullscreenPlayIcon = document.getElementById('noFullscreen-play-icon');

  fullscreenIcon.style.display = fullscreenIcon.style.display === 'none' ? '' : 'none';
  noFullscreenIcon.style.display = noFullscreenIcon.style.display === 'none' ? '' : 'none';

  fullscreenPlayIcon.style.display = fullscreenPlayIcon.style.display === 'none' ? '' : 'none';
  noFullscreenPlayIcon.style.display = noFullscreenPlayIcon.style.display === 'none' ? '' : 'none';

  let fullscreen = document.getElementById('fullscreen');
  exitFullscreen(fullscreen);
}


function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}
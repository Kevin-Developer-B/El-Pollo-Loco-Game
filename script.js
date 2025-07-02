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


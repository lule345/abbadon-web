var mkJuke = {};
            mkJuke.play = document.getElementById("mk-juke-play");
            mkJuke.isPlaying = false;
            mkJuke.audio = new Audio();
            mkJuke.currentSongIndex = 0;
        
            // Define your songs here
            mkJuke.songs = [
              { title: "Harry Gregson-Williams/Norihiko Hibino - Virtuous Mission", src: "./audio/y2mate.com - Virtuous Mission.mp3"},
              { title: "MGS2 OST - Tanker", src: "./audio/mgs2_Tanker.mp3" },
              { title: "Atomic Amnesia (FLP Remake) - 3kilksphillip + Gordon Freakman", src: "./audio/Atomic_Amnesia_midi.mp3" },
              { title: "Title WMA", src: "./audio/title.mp3" },
              { title: "The Blue Valley", src: "./audio/y2mate.com_-_Karsten_Koch__The_Blue_Valley.mp3" },
              { title: "MGS2 OST - Main Intro", src: "./audio/y2mate.com_-_Metal_Gear_Solid_2__Intro_HD.mp3" },
              { title: "Ludvig Forsell - A Phantom Pain", src: "./audio/y2mate.com_-_A_Phantom_Pain.mp3" },
              { title: "The Art of Noise with Max Headroom - Paranormia", src: "./audio/y2mate.com - The Art of Noise with Max Headroom  Paranoimia Official Video.mp3" },
            ];
        
            mkJuke.audio.addEventListener('ended', playNextSong);
        
            function mkPlay() {
              if (mkJuke.isPlaying) {
                stopCurrentSong();
                return;
              }
              playCurrentSong();
            }
        
            function stopCurrentSong() {
              if (mkJuke.audio) {
                mkJuke.audio.pause();
                mkJuke.audio.currentTime = 0; // Reset audio to start
              }
              MIDIjs.stop();
              mkJuke.play.innerHTML = "Play!";
              mkJuke.isPlaying = false;
            }
        
            function playCurrentSong() {
              let song = mkJuke.songs[mkJuke.currentSongIndex].src;
              if (song.includes(".mid")) {
                MIDIjs.play(song);
              } else {
                mkJuke.audio.src = song;
                mkJuke.audio.play();
              }
        
              mkJuke.isPlaying = true;
              mkJuke.play.innerHTML = "Stop!";
        
              document.getElementById('jukebox_title').textContent = "♪♫ - Now Playing " + mkJuke.songs[mkJuke.currentSongIndex].title + " ♪♫";
            }
        
            function playNextSong() {
              mkJuke.currentSongIndex = (mkJuke.currentSongIndex + 1) % mkJuke.songs.length;
              playCurrentSong();
            }
        
            function playPreviousSong() {
              mkJuke.currentSongIndex = (mkJuke.currentSongIndex - 1 + mkJuke.songs.length) % mkJuke.songs.length;
              playCurrentSong();
            }
        
            // Autoplay on load
            window.onload = mkPlay;
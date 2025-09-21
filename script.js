let Songs;
let crntFolder;
let currentsong = new Audio();

// Define DOM element references
let Play, volImg, previous, Next;

// Cache for storing playlist data
const playlistCache = new Map();

console.log("Let's dive into javascript");

// Notification system for user feedback
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease;
    max-width: 300px;
    word-wrap: break-word;
  `;
  
  // Set background color based on type
  switch(type) {
    case 'error':
      notification.style.backgroundColor = '#e74c3c';
      break;
    case 'success':
      notification.style.backgroundColor = '#27ae60';
      break;
    default:
      notification.style.backgroundColor = '#3498db';
  }
  
  document.body.appendChild(notification);
  
  // Fade in
  setTimeout(() => {
    notification.style.opacity = '1';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

async function getSongs(folder) {
  crntFolder = folder;
  
  // Check cache first
  if (playlistCache.has(folder)) {
    Songs = playlistCache.get(folder);
    showNotification(`Loaded ${folder} from cache`, 'info');
  } else {
    try {
      // Use relative path for GitHub Pages compatibility
      let get = await fetch(`Songs/${folder}/songs.json`);
      if (!get.ok) {
        throw new Error(`HTTP error! status: ${get.status}`);
      }
      let response = await get.json();

      Songs = response.songs || [];
      
      // Cache the result
      playlistCache.set(folder, Songs);
      showNotification(`Loaded ${folder} successfully`, 'success');
    } catch (error) {
      console.error(`Error loading songs from ${folder}:`, error);
      Songs = [];
      // Show user-friendly error message
      showNotification(`Failed to load playlist: ${folder}`, 'error');
    }
  }

  let songUL = document
    .querySelector(".songlist")
    .getElementsByTagName("ul")[0];
  songUL.innerHTML = "";
  for (const song of Songs) {
    songUL.innerHTML += `<li class="pointing">
                            <img src="assets/sidebar/music-note-03-stroke-rounded.svg" alt="Music">
                            <div class="info flex item-align direction">
                                <div>${song.replaceAll("%20", " ")}</div>
                                <div>Prachit</div>
                            </div>
                            <div class="playingbtn flex item-align">
                                <img class="invert" src="assets/sidebar/play-circle-02-stroke-rounded (1).svg" alt="play">
                            </div>
                        </li>`;
  }

  Array.from(
    document.querySelector(".songlist").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      playMusic(e.querySelector(".info").firstElementChild.innerHTML);
    });
  });
}

const playMusic = (track, pause = false) => {
  // Use relative path for GitHub Pages compatibility
  currentsong.src = `Songs/${crntFolder}/` + track;
  console.log("Loading audio from:", currentsong.src);

  // Add error handling for audio loading
  currentsong.addEventListener('error', function(e) {
    console.error('Audio loading error:', e);
    console.error('Failed to load:', currentsong.src);
    showNotification(`Failed to load audio: ${track}`, 'error');
  });

  currentsong.addEventListener('loadeddata', function() {
    console.log('Audio loaded successfully:', currentsong.src);
    console.log('Duration:', currentsong.duration);
  });

  currentsong.addEventListener('canplay', function() {
    console.log('Audio can play now:', currentsong.src);
  });

    if (!pause) {
    currentsong.play().then(() => {
      console.log('Audio started playing');
      Play.src = "assets/playbar/pause-stroke-rounded.svg";
    }).catch(error => {
      console.error('Error playing audio:', error);
      showNotification('Failed to play audio. Please check your connection.', 'error');
    });
  }

  document.querySelector(".SongNameinfo").innerHTML = track;
  console.log(track);
};

async function displayAlbums() {
  // Static list of playlists - no need to fetch directory listing
  const playlists = ['playlist1', 'playlist2', 'playlist3', 'playlist4', 'playlist5', 'playlist6'];
  let CardAppend = document.querySelector(".CardPlaylists");
  
  // Show loading state
  CardAppend.innerHTML = '<div class="loading">Loading playlists...</div>';
  
  for (const folder of playlists) {
    try {
      // Check cache first for playlist info
      let response;
      if (playlistCache.has(`${folder}_info`)) {
        response = playlistCache.get(`${folder}_info`);
      } else {
        // Use relative path for GitHub Pages compatibility
        let a = await fetch(`Songs/${folder}/info.json`);
        if (!a.ok) {
          throw new Error(`HTTP error! status: ${a.status}`);
        }
        response = await a.json();
        
        // Cache the playlist info
        playlistCache.set(`${folder}_info`, response);
      }
      CardAppend.innerHTML = CardAppend.innerHTML + `<div data-folder="${folder}" class="card rounded m-1 p-1">
                        <img src="Songs/${folder}/cover.jpg" alt="Playlist Cover" onerror="this.src='assets/sidebar/music-note-03-stroke-rounded.svg'">
                        <div class="text1 m-1">${response.title}</div>
                        <div class="text2 m-1 textWidth">${response.description}</div>
                        <div class="playbtn">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <circle cx="12" cy="12" r="10.75" fill="green" />
                                <path
                                    d="M9.956,15.386 C9.5,15.079 9.5,14.319 9.5,12.8 L9.5,11.2 C9.5,9.681 9.5,8.921 9.956,8.614 C10.411,8.307 11.035,8.646 12.281,9.326 L13.75,10.126 C15.25,10.944 16,11.353 16,12 C16,12.647 15.25,13.056 13.75,13.874 L12.281,14.674 C11.035,15.354 10.411,15.693 9.956,15.386 Z"
                                    fill="black" />
                            </svg>
                        </div>
                    </div>`;
    } catch (error) {
      console.log(`Could not load playlist ${folder}:`, error);
      // Add fallback card for failed playlists
      CardAppend.innerHTML = CardAppend.innerHTML + `<div data-folder="${folder}" class="card rounded m-1 p-1">
                        <img src="assets/sidebar/music-note-03-stroke-rounded.svg" alt="Default Playlist Cover">
                        <div class="text1 m-1">${folder}</div>
                        <div class="text2 m-1 textWidth">Playlist not available</div>
                        <div class="playbtn">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <circle cx="12" cy="12" r="10.75" fill="green" />
                                <path
                                    d="M9.956,15.386 C9.5,15.079 9.5,14.319 9.5,12.8 L9.5,11.2 C9.5,9.681 9.5,8.921 9.956,8.614 C10.411,8.307 11.035,8.646 12.281,9.326 L13.75,10.126 C15.25,10.944 16,11.353 16,12 C16,12.647 15.25,13.056 13.75,13.874 L12.281,14.674 C11.035,15.354 10.411,15.693 9.956,15.386 Z"
                                    fill="black" />
                            </svg>
                        </div>
                    </div>`;
    }
  }

  Array.from(document.getElementsByClassName("card")).forEach((e) => {
    e.addEventListener("click", async (item) => {
      await getSongs(`${item.currentTarget.dataset.folder}`);
    });
  });
}

async function main() {
  try {
    // Initialize DOM element references
    Play = document.getElementById("Play");
    volImg = document.getElementById("volImg");
    previous = document.getElementById("previous");
    Next = document.getElementById("Next");

    // Show loading notification
    showNotification('Loading MusicPlayer...', 'info');

    // Load playlists first
    await displayAlbums();
    
    // Then load default playlist
    await getSongs("playlist1");
    
    if (Songs.length > 0) {
      playMusic(Songs[0], false); // Start playing automatically
      showNotification('MusicPlayer ready!', 'success');
    } else {
      showNotification('No songs found in default playlist', 'error');
    }
  } catch (error) {
    console.error('Error initializing MusicPlayer:', error);
    showNotification('Failed to initialize MusicPlayer', 'error');
  }

  Play.addEventListener("click", () => {
    if (currentsong.paused) {
      currentsong.play().then(() => {
        Play.src = "assets/playbar/pause-stroke-rounded.svg";
      }).catch(error => {
        console.error('Error playing audio:', error);
        showNotification('Failed to play audio', 'error');
      });
    } else {
      currentsong.pause();
      Play.src = "assets/playbar/play-stroke-rounded.svg";
    }
  });

  currentsong.addEventListener("timeupdate", () => {
    let current = formatTime(currentsong.currentTime);
    let total = formatTime(currentsong.duration);
    document.querySelector(".time").innerHTML = `${current}/${total}`;
    
    // Only update progress bar if duration is valid
    if (currentsong.duration && !isNaN(currentsong.duration)) {
      document.querySelector(".circle").style.left =
        (currentsong.currentTime / currentsong.duration) * 100 + "%";
    }
  });

  function formatTime(seconds) {
    if (isNaN(seconds)) return "00:00";
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  document.querySelector(".scroller").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentsong.currentTime = (currentsong.duration * percent) / 100;
  });

  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = 0;
  });

  document.querySelector(".cross").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-100%";
  });

  document.getElementById("previous").style.opacity = 0.5;

  previous.addEventListener("click", () => {
    let index = Songs.indexOf(currentsong.src.split("/").splice(-1)[0]);
    console.log(index);

    if (index - 1 >= 0) {
      playMusic(Songs[index - 1].replaceAll("%20", " "));
      document.getElementById("Next").style.opacity = 1;
      if (index - 1 <= 0) {
        document.getElementById("previous").style.opacity = 0.5;
      }
    }
  });

  Next.addEventListener("click", () => {
    console.log("Songs:", Songs);
    console.log("currentsong:", currentsong);
    console.log("currentsong.src:", currentsong?.src);
    console.log("filename:", currentsong?.src?.split("/")?.splice(-1)[0]);

    let index = Songs.indexOf(currentsong.src.split("/").splice(-1)[0]);

    if (index + 1 <= Songs.length - 1) {
      playMusic(Songs[index + 1].replaceAll("%20", " "));
      document.getElementById("previous").style.opacity = 1;
      if (index + 1 == Songs.length - 1) {
        document.getElementById("Next").style.opacity = 0.5;
      }
    }
  });

  document
    .querySelector(".volume")
    .getElementsByTagName("input")[0]
    .addEventListener("change", (e) => {
      currentsong.volume = parseInt(e.target.value) / 100;
      if (currentsong.volume == 0) {
        currentsong.volume = parseInt(e.target.value) / 100;
        volImg.src = "assets/playbar/volume-mute-02-stroke-rounded.svg";
      } else {
        volImg.src = "assets/playbar/volume-high-stroke-rounded.svg";
      }
    });
}

main();


















































































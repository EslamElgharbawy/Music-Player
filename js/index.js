let img = document.getElementById("music_img")
let listImg_one = document.getElementById("list_img1")
let listImg_two = document.getElementById("list_img2")
let listImg_three = document.getElementById("list_img3")
let listImg_four = document.getElementById("list_img4")
let Name = document.getElementById("music_name")
let listName_one = document.getElementById("list_name1")
let listName_two = document.getElementById("list_name2")
let listName_three = document.getElementById("list_name3")
let listName_four = document.getElementById("list_name4")
let Artist = document.getElementById("music_artist")
let progress = document.getElementById("music_progress")
let currentTimePlay = document.getElementById("current_time")
let maxDuration = document.getElementById("max_duration")
let repeatMusic = document.getElementById("repeatList")
let prev_Music = document.getElementById("prev")
let play_Music = document.getElementById("play")
let next_Music = document.getElementById("next")
let audio = document.querySelector(".progress1")
let progresspar = document.querySelector(".progress-bar")
let song_one = document.getElementById("song1")
let song_two = document.getElementById("song2")
let song_three = document.getElementById("song3")
let song_four = document.getElementById("song4")
let list = document.getElementById("playlist")
let musicLength = 0;
let ispalying = false;

window.addEventListener("load", () => {
    loadMusic(musicLength)

})

function loadMusic(musicNum) {
    Name.innerHTML = AllMusic[musicNum].name
    Artist.innerHTML = AllMusic[musicNum].artist
    img.src = AllMusic[musicNum].img
    progress.src = AllMusic[musicNum].src
}

function listloadMusic() {
    listName_one.innerHTML = AllMusic[0].name
    listImg_one.src = AllMusic[0].img
    listName_two.innerHTML = AllMusic[1].name
    listImg_two.src = AllMusic[1].img
    listName_three.innerHTML = AllMusic[2].name
    listImg_three.src = AllMusic[2].img
    listName_four.innerHTML = AllMusic[3].name
    listImg_four.src = AllMusic[3].img
}

progresspar.addEventListener("click", (e) => {
    let WidthProgress = progresspar.clientWidth;
    let clickpar = e.offsetX;
    let songDuration = progress.duration;
    progress.currentTime = (clickpar / WidthProgress) * songDuration;

    playMusic()
})

function playMusic() {
    ispalying = true;
    play_Music.querySelector("i").className = "fa-solid fa-circle-pause fa-2xl";
    progress.play();
}

function pauseMusic() {
    ispalying = false;
    play_Music.querySelector("i").className = "fa-solid fa-circle-play fa-2xl";
    progress.pause();
}

play_Music.addEventListener("click", () => {
    ispalying ? pauseMusic() : playMusic()
})


function nextMusic() {
    musicLength++
    musicLength > AllMusic.length - 1 ? musicLength = 0 : musicLength = musicLength;
    loadMusic(musicLength)
    playMusic()
}

next_Music.addEventListener("click", () => {
    nextMusic()
})


function prevMusic() {
    musicLength--
    musicLength < 0 ? musicLength = AllMusic.length - 1 : musicLength = musicLength;
    loadMusic(musicLength)
    playMusic()
}

prev_Music.addEventListener("click", () => {
    prevMusic()
})

repeatMusic.addEventListener("click", () => {
    let getText = repeatMusic.innerText;
    switch (getText) {
        case "repeat":
            repeatMusic.innerText = "repeat_one"
            break;
        case "repeat_one":
            repeatMusic.innerText = "shuffle"
            break;
        case "shuffle":
            repeatMusic.innerText = "repeat"
            break;
    }
})


progress.addEventListener("ended", () => {
    let getText = repeatMusic.innerText;
    switch (getText) {
        case "repeat":
            nextMusic()
            break;
        case "repeat_one":
            progress.currentTime = 0
            loadMusic(musicLength)
            playMusic()
            break;
        case "shuffle":
            let randomIndex = Math.floor(Math.random() * AllMusic.length)
            do {
                randomIndex = Math.floor(Math.random() * AllMusic.length)
            } while (musicLength == randomIndex) {
                musicLength = randomIndex
                loadMusic(musicLength)
                playMusic()
                break;
            }

    }

})

progress.addEventListener("timeupdate", (e) => {
    let currentTime = e.target.currentTime
    let durationTime = e.target.duration
    let progressWidth = (currentTime / durationTime) * 100;

    audio.style.width = `${progressWidth}%`;

    progress.addEventListener("loadeddata", () => {
        let _durationTime = progress.duration
        const interval = setInterval(() => {
            let _currentTime = progress.currentTime
            currentTimePlay.innerHTML = formatTime(_currentTime)
        }, 1000)
        maxDuration.innerHTML = formatTime(_durationTime)
        progress.addEventListener("ended", () => {
            clearInterval(interval)
        })

    })
})

function formatTime(time) {
    if (time && !isNaN(time)) {
        let minutes = Math.floor(time / 60) < 10 ? `0${Math.floor(time / 60)}` : Math.floor(time / 60)
        let seconds = Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60)
        return `${minutes}:${seconds}`
    }
    return "00:00"
}

list.addEventListener("click", () => {
    listloadMusic();
    
})
song_one.addEventListener("click", () => {
    loadMusic(0)
    playMusic()
    closeModal()
})
song_two.addEventListener("click", () => {
    loadMusic(1)
    playMusic()
    closeModal()
})
song_three.addEventListener("click", () => {
    loadMusic(2)
    playMusic()
    closeModal()
})
song_four.addEventListener("click", () => {
    loadMusic(3)
    playMusic()
    closeModal()
})

function closeModal() {
    let modal = document.getElementById("exampleModal");
    modal.classList.remove("show");
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
    let backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) {
        backdrop.remove();
    }
}

const container = document.querySelector('.container')
const card = document.querySelector('.card')
const menuCard = document.querySelector('#menu-card')
const img = document.querySelector('#music-image')
const audio = document.querySelector('#audio')
const title = document.querySelector('.title')
const singer = document.querySelector('.singer')
const progressBar = document.querySelector('#progress-bar')
const currentTime = document.querySelector('#current-time')
const durationTime = document.querySelector('#duration-time')
const prevBtn = document.querySelector('#prev')
const playBtn = document.querySelector('#play')
const nextBtn = document.querySelector('#next')
const volumeBtn = document.querySelector('#volume-btn')
const volumeBar = document.querySelector('#volume-bar')
const menuBtn = document.querySelector('#menu-button')
const musicListWrapper = document.querySelector('#music-list')


let isMusicPLay = false
let player = new MusicPlayer(musicList)


menuBtn.addEventListener('click', () => {
    menuCard.classList.toggle('show')
    if(menuCard.classList.contains('show')) {
        card.classList.remove('openMenu')
    }else {
        card.classList.add('openMenu')
    }
})


window.addEventListener('load', () => {
    displayMusic(player.getMusic())
    displayMusicList(player.musicList)
    isPlayingNow()
})


const displayMusic = (music) => {
    title.textContent = music.title
    singer.textContent = music.singer
    img.src = `./img/${music.image}`
    audio.src = `./musics/${music.file}`
}


//! Music Play-Pause-Prev Music-Next Music START


playBtn.addEventListener('click', () => {
    isMusicPLay ? pauseMusic() : playMusic()
})

nextBtn.addEventListener('click', () => {
    nextMusic()
})

prevBtn.addEventListener('click', () => {
    prevMusic()
})


const playMusic = () => {
    isMusicPLay = true
    playBtn.querySelector('i').classList = "fa-solid fa-pause"
    audio.play()
}

const pauseMusic = () => {
    isMusicPLay = false
    playBtn.querySelector('i').classList = "fa-solid fa-play"
    audio.pause()
}

const prevMusic = () => {
    player.prev()
    displayMusic(player.getMusic())
    playMusic()
    isPlayingNow()
}

const nextMusic = () => {
    player.next()
    displayMusic(player.getMusic())
    playMusic()
    isPlayingNow()
}

//! Music Play-Pause-Prev Music-Next Music END



//! Progress Bar START


const calculateTime = (totalSecond) => {
    const minute = Math.floor(totalSecond / 60)
    const second = Math.floor(totalSecond % 60)
    const updatedSecond = second < 10 ? `0${second}` : `${second}`
    return `${minute}:${updatedSecond}`
}

audio.addEventListener('loadedmetadata', () => {
    durationTime.textContent = calculateTime(audio.duration)
    progressBar.max = Math.floor(audio.duration)
})

audio.addEventListener('timeupdate', () => {
    progressBar.value = Math.floor(audio.currentTime)
    currentTime.textContent = calculateTime(progressBar.value)
})

progressBar.addEventListener('input', () => {
    currentTime.textContent = calculateTime(progressBar.value)
    audio.currentTime = progressBar.value
})


//! Progress Bar END

//! Volume Control START

let isMusicVoiced = true
volumeBtn.addEventListener('click', () => {
    if(isMusicVoiced) {
        audio.muted = true
        isMusicVoiced = false
        volumeBtn.querySelector('i').classList = "fa-solid fa-volume-xmark"
        volumeBar.value = 0
    }else {
        audio.muted = false
        isMusicVoiced = true
        volumeBtn.querySelector('i').classList = "fa-solid fa-volume-high"
        volumeBar.value = 100
    }
})


volumeBar.addEventListener('input', (e) => {
    const volumeBarValue = e.target.value
    audio.volume = volumeBarValue / 100
    if(volumeBarValue == 0) {
        audio.muted = true
        isMusicVoiced = false
        volumeBtn.querySelector('i').classList = "fa-solid fa-volume-xmark"
        volumeBar.value = 0
    }else {
        audio.muted = false
        isMusicVoiced = true
        volumeBtn.querySelector('i').classList = "fa-solid fa-volume-high"
    }
})


//! Volume Control END


//! Music Menu START


const displayMusicList = (list) => {
    for(let i = 0; i < list.length; i++) {
        let liTag = `
            <li li-index="${i}" onclick='selectedMusic(this)' class="music-list-item">
                <span class="music-name"> ${list[i].getName()} </span>
                <span id="music-${i}" class="music-duration"></span>
                <audio class="music-${i}" src="./musics/${list[i].file}"></audio>
            </li>
        `

        musicListWrapper.insertAdjacentHTML('beforeend', liTag)


        const liAudioDuration = musicListWrapper.querySelector(`#music-${i}`)
        const liAudioTag = musicListWrapper.querySelector(`.music-${i}`)

        liAudioTag.addEventListener('loadeddata', () => {
            liAudioDuration.textContent = calculateTime(liAudioTag.duration)
        })

    }
}


const selectedMusic = (li) => {
    player.index = li.getAttribute('li-index')
    displayMusic(player.getMusic())
    playMusic()
    isPlayingNow()
}


const isPlayingNow = () => {
    for(let li of musicListWrapper.querySelectorAll('li')) {
        if(li.classList.contains('playing')) {
            li.classList.remove('playing')
        }

        if(li.getAttribute('li-index') == player.index) {
            li.classList.add('playing')
        }

    }
}

//! Music Menu END

audio.addEventListener('ended', () => {
    nextMusic()
})
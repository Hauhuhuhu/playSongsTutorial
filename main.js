const PLAYER_STORAGE_KEY = 'Player';
const headerName = document.querySelector('.header-titel-name');
const headerImg = document.querySelector('.header-img');
const audio = document.querySelector('#audio');
const playBtn = document.querySelector('.playMusic'); 
const playSong = document.querySelector('.header-controls');
const progress = document.querySelector('#progress'); 
const nextSongBtn = document.querySelector('.nextSong');
const backSongBtn = document.querySelector('.backSong');
const randomSongBtn = document.querySelector('.randomSong');
const repeatSongBtn = document.querySelector('.repeatSong'); 
const playList = document.querySelector('.music-list-body');



const app = {
    CurrentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    // Sử dụng Fake API 
    songs: [],
    LoadApi: async function() {
        var Api = 'http://localhost:3000/songs';
        try {
            const response = await fetch(Api);
            const song = await response.json();
            this.songs = song;
        } catch (error) {
            console.error('Error:', error);
            // nếu API lỗi thì :))
            this.songs = this.songs2;
        }
    },
    songs2 : [
        {
            name: 'SummerTime',
            singer: 'K-391',
            path: '/audio/song_1.mp3',
            image: '/picture/img_1.jpg'
        },
        {
            name: 'Nevada',
            singer: 'Vicetone',
            path: '/audio/song_2.mp3',
            image: '/picture/img_2.jpg'
        },
        {
            name: 'Monody',
            singer: 'TheFatRat',
            path: '/audio/song_3.mp3',
            image: '/picture/img_3.jpg'
        },
        {
            name: 'Reality',
            singer: 'Lost Frequencies',
            path: '/audio/song_4.mp3',
            image: '/picture/img_4.jpg'
        },
        {
            name: 'Lemon Tree',
            singer: 'DJ DESA',
            path: '/audio/song_5.mp3',
            image: '/picture/img_5.jpg'
        },
        {
            name: 'My Love',
            singer: 'Westlife',
            path: '/audio/song_6.mp3',
            image: '/picture/img_6.jpg'
        },
        {
            name: 'Attension',
            singer: 'Charlie Puth',
            path: '/audio/song_7.mp3',
            image: '/picture/img_7.jpg'
        },
        {
            name: 'Monster',
            singer: 'Katie sky',
            path: '/audio/song_8.mp3',
            image: '/picture/img_8.jpg'
        },
    ],
    renderSong: function(){
        var html = '';
        this.songs.map(function(song, index) {
            html +=  
            `<div class="music-list-item ${index === app.CurrentIndex ? 'active': ''}" data-index = "${index}">
                <div class="music-list-item-img" style="background-image: url('${song.image}');"></div>
                <div class="music-list-item-info">
                    <h3 class="music-list-item-title">${song.name}</h3>
                    <div class="music-list-item-author">${song.singer}</div>
                </div>
                <div class="music-more">
                    <i class="fa-solid fa-ellipsis music-option"></i>
                </div>
            </div>`
        });
        var htmls = document.querySelector('.music-list-body').innerHTML = html;

    },
    defineProperties: function() {
        Object.defineProperty(this, 'CurrentSong', {
            get: function() {
                return this.songs[this.CurrentIndex];
            }
        })
    },
    handleEvents : function() {
        // Quay Img Song
        const headerImgAnimate = headerImg.animate([
            { transform: 'rotate(360deg)' }
        ],{
            duration: 10000,
            iterations: Infinity,
            easing: 'linear',
        })
        headerImgAnimate.pause();
        // Phóng to thu nhỏ Header IMG
        const headerImgWidth = headerImg.offsetWidth;
        const headerImgHeight = headerImg.offsetHeight;
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const opacity = scrollTop / headerImgHeight;
            const newHeaderImgWidth = headerImgWidth - scrollTop;
            const newHeaderImgHeight = headerImgHeight - scrollTop;
            headerImg.style.width = newHeaderImgWidth > 0 ? newHeaderImgWidth + 'px' : 0;
            headerImg.style.height = newHeaderImgWidth > 0 ? newHeaderImgWidth + 'px' : 0;
            headerImg.style.opacity = newHeaderImgWidth / headerImgWidth;
        }

        // Click vào bài hát để play
        playBtn.onclick = function() {
            if (app.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }
        audio.onplay = function() {
            app.isPlaying = true;
            playSong.classList.add('header-controls-playing');
            headerImgAnimate.play();
        };
        audio.onpause = function() {
            app.isPlaying = false;
            playSong.classList.remove('header-controls-playing');
            headerImgAnimate.pause();
        };
        // Chạy, tua bài hát 
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const timeSong = Math.floor(audio.currentTime / audio.duration*100);
                progress.value = timeSong;
            }
        }
        // Phản ứng khi sự thay đổi hoàn thành => Trường hợp này dùng oninput hợp lý hơn.
        // progress.onchange = function() { 
        //     // audio.pause();
        //     const newTimeSong = audio.duration * (progress.value / 100);
        //     audio.currentTime = newTimeSong;
        //     // audio.play();
        // }
        // Phản ứng ngay lập tức
        progress.oninput = function() {
            const newTimeSong = audio.duration * (progress.value / 100);
            audio.currentTime = newTimeSong;
            audio.play();
        }
        // Next Song
        nextSongBtn.onclick = function() {
            if (app.isRandom) {
                app.randomSong();
            } else {
                app.nextSong();
            }
            audio.play(); 
            app.renderSong();
            app.scrollToActiveSong();
        }
        // Back Song
        backSongBtn.onclick = function() {
            if (app.isRandom) {
                app.randomSong()
            } else {
                app.backSong()
            }
            audio.play(); 
            app.renderSong(); 
            app.scrollToActiveSong();
        }
        // Random Song 
        randomSongBtn.onclick = function() {
            if (app.isRepeat) {
                repeatSongBtn.classList.remove('active');
                app.isRepeat = !app.isRepeat;
            } 
            app.isRandom = !app.isRandom;
            if (app.isRandom) {
                randomSongBtn.classList.add('active');
            } else {
                randomSongBtn.classList.remove('active');
            }
            app.setConfig('isRandom', app.isRandom);
            app.setConfig('isRepeat', app.isRepeat);
        }
        // Repeat Song
        repeatSongBtn.onclick = function() {
            if (app.isRandom) {
                randomSongBtn.classList.remove('active');
                app.isRandom = !app.isRandom;
            }
            app.isRepeat = !app.isRepeat;
            if (app.isRepeat) {
                repeatSongBtn.classList.add('active');
            } else {
                repeatSongBtn.classList.remove('active');
            }
            app.setConfig('isRepeat', app.isRepeat);
            app.setConfig('isRandom', app.isRandom);
        }

        // next Song audio ended
        audio.onended = function() {
            if (app.isRepeat) {
                audio.play();
            } else {
                nextSongBtn.click();
            }
        }
        // Lắng nghe khi click vào playlist
        playList.onclick = function(e) { 
            const songNode = e.target.closest('.music-list-item:not(.active)');
            const musicMore = e.target.closest('.music-option');
            if (songNode || musicMore) {
                // Xử lý khi click vào song
                if (songNode && !musicMore) {
                    app.CurrentIndex = Number(songNode.dataset.index);
                    app.loadCurrentSong();
                    app.renderSong();
                    audio.play();
                }
                // Xử lý khi click vào song option
                if(musicMore) {

                }
            }
        }        
        
    },
    scrollToActiveSong: function() {
        setTimeout(()=> {
            const songActive = document.querySelector('.music-list-item.active');
            if(this.CurrentIndex > 3) {
                songActive.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                })
            } else {
                songActive.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                })
            }
        }, 200)
    },
    loadCurrentSong: function() {
        headerName.textContent = this.CurrentSong.name;
        headerImg.style.backgroundImage = `url('${this.CurrentSong.image}')`;
        audio.src = this.CurrentSong.path;
    },
    loadConfig: function() {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    nextSong: function() {
        this.CurrentIndex ++;
        if (this.CurrentIndex >= this.songs.length) {
            this.CurrentIndex = 0;
        }
        this.loadCurrentSong();
    },
    backSong: function() {
        this.CurrentIndex --;
        if (this.CurrentIndex <= 0) {
            this.CurrentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    randomSong: function() {
        var newSong;
        do {
            newSong = Math.floor(Math.random() * this.songs.length);
        } while (newSong === this.CurrentIndex);
        this.CurrentIndex = newSong;
        this.loadCurrentSong();
    },
    playWithKey: function() {
        document.addEventListener('keydown', function(event) {
            if (event.keyCode === 32) {
                app.isPlaying? audio.pause() : audio.play();
                event.preventDefault(); // Ngăn chặn hành vi cuộn xuống của phím Space
            }
        });
    },
    start: function() {
        // Sử dụng fake API để lấy dữ liệu
        this.LoadApi().then(() =>{
            // Gán cấu hình từ config vào ứng dụng
            this.loadConfig();
            // Hiển thị trạng thái repeat || random từ loadConfig
            if (this.isRandom) {
                randomSongBtn.classList.add('active');
            }
            if (this.isRepeat) {
                repeatSongBtn.classList.add('active');
            }
            // Định nghĩa các thuộc tính cho object / Th này là trả về bài hát đầu tiên;
            this.defineProperties();
            // Lắng nghe và sử lý các sự kiện
            this.handleEvents();
            // Load bài hát đầu tiên
            this.loadCurrentSong();
            // Hiển thị danh sách bài hát
            this.renderSong();
            // Pause or Play audio khi ấn phím space
            this.playWithKey();
        });

    }
}

app.start();






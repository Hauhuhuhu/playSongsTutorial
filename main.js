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
            path: './audio/song_1.mp3',
            image: './picture/img_1.png'
        },
        {
            name: 'Nevada',
            singer: 'Vicetone',
            path: './audio/song_2.mp3',
            image: './picture/img_2.png'
        },
        {
            name: 'Monody',
            singer: 'TheFatRat',
            path: './audio/song_3.mp3',
            image: './picture/img_3.png'
        },
        {
            name: 'Reality',
            singer: 'Lost Frequencies',
            path: './audio/song_4.mp3',
            image: './picture/img_4.png'
        },
        {
            name: 'Lemon Tree',
            singer: 'DJ DESA',
            path: './audio/song_5.mp3',
            image: './picture/img_5.png'
        },
        {
            name: 'My Love',
            singer: 'Westlife',
            path: './audio/song_6.mp3',
            image: './picture/img_6.png'
        },
        {
            name: 'Attension',
            singer: 'Charlie Puth',
            path: './audio/song_7.mp3',
            image: './picture/img_7.png'
        },
        {
            name: 'Monster',
            singer: 'Katie sky',
            path: './audio/song_8.mp3',
            image: './picture/img_8.png'
        },
        {
            name: 'ACE',
            singer: 'ACE',
            path: './audio/ace.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Đừng quên tên anh',
            singer: 'Hoa Vinh',
            path: './audio/dqta.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Mix1',
            singer: 'Toan Thang',
            path: './audio/mix1.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Mix2',
            singer: 'Toan Thang',
            path: './audio/mix2.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'MixYTB',
            singer: 'YTB',
            path: './audio/mix_YTB.mp3',
            image: './picture/poopy.png' 
        },
        {
            name: 'TET',
            singer: 'YTB',
            path: './audio/tet.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Daydream',
            singer: 'YTB',
            path: './audio/Daydream.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/1.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/2.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/3.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/4.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/5.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/6.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/7.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/8.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/9.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/10.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/11.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/12.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/13.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/14.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/15.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/16.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/17.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/18.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/19.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/20.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/21.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/22.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/23.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/24.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/25.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/26.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/27.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/28.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/29.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/30.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/31.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/32.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/33.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/34.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/35.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/36.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/37.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/38.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/39.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/40.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/41.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/42.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/43.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/44.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/45.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/46.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/47.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/48.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/49.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/50.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/51.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/52.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/53.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/54.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/55.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/56.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/57.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/58.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/59.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/60.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/61.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/62.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/63.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/64.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/65.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/66.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/67.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/68.mp3',
            image: './picture/poopy.png'
        },
        {
            name: 'Loopy',
            singer: 'Loopy',
            path: './audio/69.mp3',
            image: './picture/poopy.png'
        },
    ],
    renderSong: function(){
        var html = '';
        const titleHtml = document.querySelector('title');
        let faviconLink = document.querySelector("link[rel='icon']");
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
            if(index === app.CurrentIndex) {
                titleHtml.innerText = `${song.name}`;
                faviconLink.setAttribute("href", `${song.image}`);
            }
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






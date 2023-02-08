const $ =document.querySelector.bind(document);
const $$ =document.querySelectorAll.bind(document);
var cd=$('.cd');//đĩa hát
var cdThumb=$('.cd-thumb');//đĩa hát

var nameSong=$('header h2');//Tên bài hát
var imgSong=$('.cd-thumb');//ảnh trên đĩa hát
var audio=$('#audio');//thẻ audio
//play/pause audio
var playBtn= $('.btn-toggle-play');
var player=$('.player');
var progress=$('#progress');


const app={
   currentIndex:0,
   checkPlay:false,
   progressDefault:0,
   musicPlayed:[],
   
    songs:[
        {
            singer:'Thiên Tú',
            name:'Đừng Lo Nhé Có Anh Ở Đây',
            linkMusic:'./Asset/songs/dung_lo_nhe.mp3',
            linkImg:'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/2/0/3/f/203f50940ab726d125ea73d5c1baac94.jpg'
        },
        {
            singer:'Dung Hoàng Phạm',
            name:'Quả Phụ Tướng',
            linkMusic:'./Asset/songs/qua_phu_tuong.mp3',
            linkImg:'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/8/a/b/d/8abddc61f30760c7f1479a2d3e624b96.jpg'
        },
        {
            singer:'Đình Dũng & Dung Hoàng Phạm',
            name:'Đế Vương',
            linkMusic:'./Asset/songs/de_vuong.mp3',
            linkImg:'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/d/0/b/1/d0b1591610e6f324d90f4e6888817728.jpg'
        },
        {
            singer:'Dung Hoàng Phạm',
            name:'Trái Tim Của Gió',
            linkMusic:'./Asset/songs/trai_tim_cua_gio.mp3',
            linkImg:'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/a/2/f/9/a2f93345c842ce480760dec4e1d7fda3.jpg'
        },
        
        {
            singer:'Chu Duyên & ACV',
            name:'Ngỡ Như Giấc Mơ',
            linkMusic:'./Asset/songs/ngo_nhu_giac_mo.mp3',
            linkImg:'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/5/3/7/4/53748e5ef2495f1896d1de64a787604a.jpg'
        },
        {
            singer:'Thiên Tú',
            name:'Đừng Lo Nhé Có Anh Ở Đây',
            linkMusic:'./Asset/songs/dung_lo_nhe.mp3',
            linkImg:'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/2/0/3/f/203f50940ab726d125ea73d5c1baac94.jpg'
        },
        {
            singer:'Dung Hoàng Phạm',
            name:'Quả Phụ Tướng',
            linkMusic:'./Asset/songs/qua_phu_tuong.mp3',
            linkImg:'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/8/a/b/d/8abddc61f30760c7f1479a2d3e624b96.jpg'
        },
        {
            singer:'Đình Dũng & Dung Hoàng Phạm',
            name:'Đế Vương',
            linkMusic:'./Asset/songs/de_vuong.mp3',
            linkImg:'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/d/0/b/1/d0b1591610e6f324d90f4e6888817728.jpg'
        },
        {
            singer:'Dung Hoàng Phạm',
            name:'Trái Tim Của Gió',
            linkMusic:'./Asset/songs/trai_tim_cua_gio.mp3',
            linkImg:'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/a/2/f/9/a2f93345c842ce480760dec4e1d7fda3.jpg'
        },
        
        {
            singer:'Chu Duyên & ACV',
            name:'Ngỡ Như Giấc Mơ',
            linkMusic:'./Asset/songs/ngo_nhu_giac_mo.mp3',
            linkImg:'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/5/3/7/4/53748e5ef2495f1896d1de64a787604a.jpg'
        }
    ],
    
    renderSongs:function(){
       var htmls= this.songs.map((song,index)=>{
           
           return`
           <div class="song song-${index}" >
                <div class="thumb"  style="background-image: url('${song.linkImg}')">
                </div>
                <div class="body">      
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })   
        $('.playlist').innerHTML=htmls.join('');
        $(`.song-${this.currentIndex}`).classList.add('active');
    },
    /**
     * Hàm để xử lý / lắng nghe các sự kiện (DOM events)
     */
    handleEvents:function(){
       let _this=this;
       progress.value=0;    
       //xóa class vào bài hát được chọn hoặc next tới     
       let removeAtc=function(){
           $(`.song-${_this.currentIndex}`).classList.remove('active')
       }
       //thêm class vào bài hát được chọn hoặc next tới     
       let addAtc=function(){         
           $(`.song-${_this.currentIndex}`).classList.add('active')
       }
       let nextSong=$('.btn-next');
       let prevSong=$('.btn-prev');
       let toggle_random=$('.btn-random');
       let loopSong=$('.btn-repeat');
       let isRandom=false;
       let isRepeat=false;
       let lengthSong=(this.songs.length-1);
        //Xử lý sự kiện phóng to thu nhỏ đĩa ảnh khi scoll chuột
        ///Sự kiện phóng to ảnh, đậm dần khi lăn chuột xuống / thu nhỏ, ẩn đi khi lăn lên
        var cdWidth=cd.offsetWidth;     
        document.onscroll=function(){
             
            var scrollTop=document.documentElement.scrollTop||window.scrollY
            var newCdWidth=cdWidth-scrollTop;
            if(scrollTop<0||newCdWidth<10){
                newCdWidth=0;
            }
            cd.style.width=newCdWidth+'px';
            cd.style.opacity=newCdWidth/cdWidth;//tính theo % để mờ theo opacity
        }
      
         //Xử lý CD quay và dừng        
         let cdAnimate=cdThumb.animate(
            {//đĩa quay
                transform : "rotate(360deg)"
            }          
            ,{
                duration:10000,// 10 giây tốc độ quay hết vòng của đĩa
                //số lần quay: vô hạn
                iterations:Infinity 
            })    
            //ban đầu chưa chạy thì cho đĩa dừng          
            cdAnimate.pause();
        // Thực hiện lắng nghe khi click vào btn phát hoặc dừng
        playBtn.onclick=function(){    
            if(_this.checkPlay){
                audio.pause();
            }else{
                audio.play()              
            }           
        }
       
        //kiểm tra nếu audio chạy thì thực thiện các điều kiện trong function
        audio.onplay=function(){
            _this.checkPlay=true;
            player.classList.add('playing')    
            //khi phát nhạc cho đĩa chạy cùng
            cdAnimate.play();
        }
        // kiểm tra nếu audio bị tạm dừng
        audio.onpause=function(){
            _this.checkPlay=false;
            player.classList.remove('playing');
            //khi dừng nhạc cho đĩa dừng theo
            cdAnimate.pause();
        }
        //sự kiện xảy ra khi nhạc phát
      
        audio.ontimeupdate=function(){
            let progressPercen=audio.currentTime/audio.duration*100;
            if(audio.duration){               
                progress.value=Math.floor(progressPercen);   
            }                                    
        }
        // xử lý sự kiện tua
        progress.onchange =function(e){
            //khi chọn tua trên khoảng nào đó trên độ dài thanh phát
            let choosePercen=e.target.value;// giá trị phần trăm của bài khi tua
            let secondCurrent=audio.duration/100*choosePercen;// quy đổi ra số giây
            audio.currentTime=secondCurrent;            
        }                     
        //Khi chọn nhạc trong playlist
        this.songs.forEach((song,index)=>{    
            //lấy giá trị được chọn               
            let data=$(`.song-${index}`);       
           data.onclick=function(){
                //nếu bài được chọn khác với bài đang phát 
                if(_this.currentIndex!==index){              
                    //xóa class active vào bài phát trước đó                              
                    removeAtc();
                    _this.currentIndex=index;//gán index tương ứng để lấy giá trị bài được chọn
                    addAtc();//  active vào class vừa được chọn
                    //gán thông tin bài được chọn để thực hiện phát nhạc và hiển thị        
                    nameSong.innerText=song.name;
                    imgSong.style.backgroundImage=`url(${song.linkImg})`;
                    audio.src=song.linkMusic;  
                    audio.play();                   
                }                                          
            }          
        })
        // bật tắt random để phục vụ next bài random
        toggle_random.onclick=function(){         
            isRandom= !isRandom;
            toggle_random.classList.toggle('active',isRandom) ;          
        }        
        // bật tắt loop 
        loopSong.onclick=function(){  
            isRepeat=!isRepeat;
            loopSong.classList.toggle('active',isRepeat)        ;         
        }
        //Khi lựa chọn nút next           
        nextSong.onclick=function(){    
            removeAtc();     
            if(isRandom) {                                                      
                _this.currentIndex= _this.randomSong();                                
                //audio.play(); 
            }else{
                //nếu nó nhỏ hơn tổng số lượng thì chuyển lên bài tiếp theo( index tăng lên 1)       
                if(_this.currentIndex<lengthSong ){                       
                    _this.currentIndex=_this.currentIndex+1;                                                  
                }else{                   
                    _this.currentIndex=0;                                
                }
            }
            addAtc();
            _this.currentSong();
            _this.scrollTopActive();
                     
        }
        // khi thao tác với nút prev
        prevSong.onclick=function(){
            removeAtc();  
            if(isRandom) {                                         
                _this.currentIndex=_this.randomSong();                                       
            }else{
                 //nếu nó nhỏ hơn tổng số lượng thì chuyển lên bài tiếp theo( index tăng lên 1)       
                if(_this.currentIndex>0 ){                             
                    _this.currentIndex=_this.currentIndex-1;                                                       
                }else{                   
                    _this.currentIndex=lengthSong;                                    
                }
            }
            addAtc();
            _this.currentSong();    
            _this.scrollTopActive();
          
        }
        audio.onended=function(){
            if(isRepeat){              
               audio.play();
            }else{             
                nextSong.click();
            }
           // console.log(_this.currentIndex,isRepeat, _this.currentSong())
        }                
    },
    randomSong:function(){
        let indexRandom;     
        let checkPlayed;
        do{
            indexRandom=Math.floor(Math.random()*(this.songs.length));
            checkPlayed=this.musicPlayed.includes (indexRandom);        
            if(checkPlayed&& this.musicPlayed.length===this.songs.length){
                
                this.musicPlayed=[];                
            }else if(!checkPlayed){
                this.musicPlayed.push(indexRandom);
            }        
        }while(indexRandom===this.currentIndex&& checkPlayed)       
        return indexRandom;
    },
    /**
     * Hàm dùng chung để định nghĩa các thông tin
     *  */
    defineProperties:function(){
        //dùng để lấy thông tin bài hát theo Index
        Object.defineProperty(this,'currentSongPlay',{
            get: function(){
            return this.songs[this.currentIndex];            
            }
        })
    },

    /**
     * Hàm dùng để xử lý kéo thanh active khi chuyển bài đến tầm mắt, không bị khuât
     */
    scrollTopActive(){     
        setTimeout(()=>{
            $(`.song.active`).scrollIntoView({
                behavior:"smooth",                  
                block: "center",             
                inline:"nearest",
            })            
        },300)
          
        
    },


    /**
     * Load song playing
     */
    currentSong:function(){
       
      nameSong.innerText=this.currentSongPlay.name;
      imgSong.style.backgroundImage=`url(${this.currentSongPlay.linkImg})`;
      audio.src=this.currentSongPlay.linkMusic;    
      audio.play();   
    },  
    start:function(){
        // định nghĩa ra một function để khai báo các đối tượng
        this.defineProperties();              
        this.renderSongs();
        this.handleEvents();
        this.currentSong(); 
    },
}
app.start();
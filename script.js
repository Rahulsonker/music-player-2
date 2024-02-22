let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show'); 
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let Present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');


let timer;
let autoplay = 0;

let index_no = 0;
let playing_song = false;

//create a audio Element
let track = document.createElement('audio')

//All songs list
let ALL_song = [
    {
        name:"ek kahani aisi bhi",
        path:"music/Ek Kahani Aisi Bhi.mp3",    // music path hai or / ke bad audio ka naam likhna hai + .mp3 extentoin lagana hai
        img:"img/ek kahani aisi bhi.jpg",                   // img path hai or / ke bad image ka naam likhna hai + .jpg ya jeg extentoin lagana hai
        singer:" by Sunil Parameshwaran."
    },
    {
        name:"kaun mera",
        path:"music/Kaun Mera.mp3",    // music path hai or / ke bad audio ka naam likhna hai + .mp3 extentoin lagana hai
        img:"img/kaun mera.jpg",                   // img path hai or / ke bad image ka naam likhna hai + .jpg ya jeg extentoin lagana hai
        singer:"chintamani"
    },
    {
        name:"kya vo sach tha",
        path:"music/Kya woh sach tha.mp3",    // music path hai or / ke bad audio ka naam likhna hai + .mp3 extentoin lagana hai
        img:"img/kya vo sach tha.jpg",                   // img path hai or / ke bad image ka naam likhna hai + .jpg ya jeg extentoin lagana hai
        singer:"by - Rakesh ranjan"
    },
    {
        name:"Beintiha",
        path:"music/Be Intehaan.mp3",    // music path hai or / ke bad audio ka naam likhna hai + .mp3 extentoin lagana hai
        img:"img/Race 2.jpg",                   // img path hai or / ke bad image ka naam likhna hai + .jpg ya jeg extentoin lagana hai
        singer:"Atif aslam"
    },
    {
        name:"shayar on call",
        path:"music/Shayar On Call.mp3",    // music path hai or / ke bad audio ka naam likhna hai + .mp3 extentoin lagana hai
        img:"img/shayar on call.jpg",                   // img path hai or / ke bad image ka naam likhna hai + .jpg ya jeg extentoin lagana hai
        singer:"By - Sarfaraj"
    },
];

// All function

//function load the track
function load_track(index_no){
    clearInterval(timer);
    reset_slider();
    track.src = ALL_song[index_no].path;
    title.innerHTML = ALL_song[index_no].name;
    track_image.src = ALL_song[index_no].img;
    artist.innerHTML = ALL_song[index_no].singer;
    track.load();

    total.innerHTML = ALL_song.length;
    Present.innerHTML = index_no + 1;
    timer = setInterval(range_slider , 1000);
}
load_track(index_no);

//mute sound
function mute_sound(){
    track.volume = 0 ;

}


//reset song slider
function reset_slider(){
    slider.value = 0;
    volume.value = 70;
    volume_show.innerHTML = 70;
}


// checking the song is playing or not 

function justplay(){
    if(playing_song==false){
        playsong();
    }else{
        pausesong();
    }
}


//play song
function playsong(){
    track.play();
    playing_song = true;
    play.innerHTML = '<i class="ri-pause-fill"></i>'
}

//pause song
function pausesong(){
    track.pause();
    playing_song = false;
    play.innerHTML = '<i class="ri-play-fill"></i>'
}

// next_song
function next_song(){
    if (index_no < ALL_song.length - 1){
        index_no += 1;
        load_track(index_no);
        playsong();
    }else{
        index_no = 0;
        load_track(index_no);
        playsong();
    }
}


//previous song
function previous_song(){
    if (index_no > 0){
        index_no -= 1;
        load_track(index_no);
        playsong();
    }else{
        index_no = ALL_song.length;
        load_track(index_no);
        playsong();
    }
}

// cahnge volume
function volume_change(){
    volume_show.innerHTML = recent_volume.value;
    track.volume = recent_volume.value / 100;
}

//change slider position

function change_duration(){
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}

//autoplay function
function autoplay_switch() {
    var autoPlayButton = document.getElementById("auto");
    
    if (autoplay == 1) {
        autoplay = 0;
        autoPlayButton.style.boxShadow = "0 0 10px #566573";
    } else {
        autoplay = 1;
        autoPlayButton.style.boxShadow = "0 0 10px #FF8A85";
    }
}



function range_slider(){
    let position = 0;

    //update slider position
    if(!isNaN(track.duration)){
        position = track.currentTime * (100 / track.duration);
        slider.value = position;
    }

    //function will run when the song is over
    if (track.ended){
        play.innerHTML = '<i class="ri-play-fill"></i>';
        if (autoplay==1){
            index_no += 1;
            load_track(index_no);
            playsong();
        }
    }
}


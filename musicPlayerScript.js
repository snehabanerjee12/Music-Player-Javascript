const songList=[{
	id:1, name: "Harley in Hawai", artist : "Katty Perri", img :"roar.jpg" , genre: "Pop" , source: "harley.mp3"
},{
	id:2, name: "Let me love you", artist: "Justin Bieber", img:"dusk.jpg", genre: "Rock", source: "Let Me Love You.mp3"
},{
	id:3,name: "Peaches", artist: "Justin Bieber", img:"peaches.jpg", genre: "Rock", source: "peaches.mp3"
},{
	id:4, name: "Senorita", artist: "Camilla Calebo", img:"senorita.jpg" , genre: "Melody", source: "Senorita.mp3"
}];


const selectSong = document.getElementById('selectSong');
const songDisplay = document.getElementById('songDisplay');
const allSongDiv = document.getElementById('all-song-div');
const searchByNameDiv = document.getElementById('searchByNameDiv');
const searchByPlayListDiv = document.getElementById('searchByPlayListDiv');
const showResult = document.getElementById('showResult');
const showplayListResult = document.getElementById('showplayListResult');
const cardDiv = document.getElementById('card-div');
const playlistDiv = document.getElementById('playlist-div');
const prevButton= document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const addPlayList = document.getElementById('addPlayList');
const removePlayList = document.getElementById('removePlayList');
const showAllPlaylist = document.getElementById('showAllPlaylist');
const showCurrentListSongs = document.getElementById('showCurrentListSongs');

let currentSongIndex = 0 ;
let playListObj =[];
let selectedPlayList=0;

function toggleSwitch(element) {
    element.classList.toggle('on');
	document.body.classList.toggle('darkMode');
	allSongDiv.classList.toggle('darkOn');
	searchByNameDiv.classList.toggle('dark');
	searchByPlayListDiv.classList.toggle('dark');
	showResult.classList.toggle('dark');
	cardDiv.classList.toggle('darkOn');
	playlistDiv.classList.toggle('darkOn');
	songDisplay.classList.toggle('darkOption');
	showAllPlaylist.classList.toggle('dark');
	showCurrentListSongs.classList.toggle('dark');
  }

songList.forEach((song)=>{
	if(!isAdded(selectSong, song.genre)){
			const option = document.createElement('option');
			option.value = song.genre;
			option.text = song.genre;
			selectSong.appendChild(option);
	}
});

function isAdded(selectSong, value){
	for(var i=0;i< selectSong.options.length ;i++){
		if( selectSong.options[i].value===value)
		 return true;
	}
	return false;
}

songList.forEach((song,index)=>{
	const songButton = document.createElement('button');
	songButton.classList.add('songButton');
	songButton.textContent = `${song.name}-${song.artist}`;
	songButton.value = song.genre;
	songButton.onclick = function(){
		playSong(index);
	};
	console.log(songButton);
	songDisplay.appendChild(songButton);
});


selectSong.addEventListener("change",function(){
	// var genreSelect = document.getElementById("genreSelect");
	var selectedGenre = selectSong.value;
	var songs = document.getElementById("songDisplay").getElementsByTagName("button");

	// Iterate through all songs and show/hide based on the selected genre
	for (var i = 0; i < songs.length; i++) {
	  var songGenre = songs[i].value;

	  if (selectedGenre === "All" || selectedGenre === songGenre) {
		songs[i].style.display = "block";
	  } else {
		songs[i].style.display = "none";
	  }
	}
});

function playSong(index){
	var audioPlayer = document.getElementById('audioPlayer');
	var ImageId = document.getElementById('ImageId');
	var songName= document.getElementById('songName');
	var artistName= document.getElementById('artistName');
	currentSongIndex = index;
	var currentSong = songList[index];
	ImageId.src= currentSong.img;
	ImageId.alt="Image Not found";

	songName.textContent = currentSong.name;
	artistName.textContent = currentSong.artist;

	audioPlayer.style.display= "block";
	audioPlayer.src = currentSong.source;
	audioPlayer.play();

	prevButton.style.display ="inline-block";
	nextButton.style.display = "inline-block";

	addPlayList.value = index;
	removePlayList.value = index;
}

function prevSong(){
	if(currentSongIndex>0)
	
	   currentSongIndex --;
	playSong(currentSongIndex);   
}

function nextSong(){
	if(currentSongIndex< songList.length-1)
	  currentSongIndex++;
	playSong(currentSongIndex);
}

const newPlayList = document.getElementById('newPlayList');

let playListArray=[];

function createNewPlaylist(){
	var name = newPlayList.value.trim();
	var playList = document.createElement('button');
	playList.classList.add('playListButton');
	playList.textContent = name;
	playList.value = name;
	if(name!== ""){
		if(!isAddedPlayList(playListArray,playList)){
			playListArray.push(playList.value);
			showAllPlaylist.appendChild(playList);
			const playEl = addPlayListToObject(playList.value);
			playList.onclick = function(){
				for(let i=0;i<playEl.length;i++){
					if(playEl[i].Name === name){
						showSong(playEl[i].Songs);
					}
					selectedPlayList = i; 
				}
			}
		}
    }
	newPlayList.value="";
}

function isAddedPlayList(playListArray,playList){
	for( var i=0;i<playListArray.length;i++){
		if(playListArray[i]=== playList.value)
		 return true;
	}
	return false;
}

const playListButton=document.getElementsByClassName('playListButton');

function addPlayListToObject(value){
	var newObj ={
		Name: value,
		Songs: []
	};
	playListObj.push(newObj);
	return playListObj;
}

function showSong(Songs){
	showCurrentListSongs.innerHTML='';
	Songs.forEach((obj)=>{
		const Btn = document.createElement('button');
		Btn.classList.add('playListSongBtn');
		Btn.value= obj.id;
		Btn.onclick= function(){
			for(let i=0;i<songList.length;i++)
			{
				if(songList[i].id===obj.id){
					playSong(i);
				}
			}
		};
		Btn.textContent = `${obj.name}-${obj.artist}`;
		showCurrentListSongs.appendChild(Btn);
	});
}

function storeSong(){
	const currentEl = addPlayList.value;
	const selectedEl = selectedPlayList;
	const songEl = songList[currentEl];
	const playElement = playListObj[selectedEl];
	if(!isAddedCurrentSong(playElement.Songs,songEl)){
	     playElement.Songs.unshift(songEl);
	}
	showSong(playElement.Songs);
}

function isAddedCurrentSong(playObj, songEl){
		for(let i=0;i<playObj.length;i++){
			if(playObj[i].id===songEl.id)
			 return true;
		}
		return false;
}

function removeSong(){
	const removeEl = removePlayList.value;
	const removeSongEl = songList[removeEl];
	const removeElement = playListObj[selectedPlayList];
	if(!isAddedCurrentSong(removeElement.Songs, removeSongEl)){
		const res = document.createElement('p');
		res.textContent=`No Element Found to be deleted`;
		showCurrentListSongs.appendChild(res);
		return;
	}
	removeElement.Songs.splice(selectedPlayList,1);
	showSong(removeElement.Songs);
}

let flag=-1;

function searchByName(){
	const inputName = searchName.value.toLowerCase().trim();
	showResult.innerHTML='';
	const res = document.getElementById('resultSong');
	res.style.display = "block";
	for(let i=0;i<songList.length;i++){
		if(songList[i].name.toLowerCase() === inputName){
			const nameBtn = document.createElement('button');
			nameBtn.classList.add('songResult');
			nameBtn.onclick=function(){
				playSong(i);
			}
			nameBtn.textContent = `${songList[i].name}-${songList[i].artist}`;
			nameBtn.value=i;
			showResult.appendChild(nameBtn);
			flag = 1;
			break;
		}
	}
	if(flag!=1)
	{
		const show = document.createElement('p');
		show.textContent=`No Items Found`;
		showResult.appendChild(show);
	}
}
let flagPlayList =-1;

function searchPlaylist(){
	const ip= playlistName.value.trim();
	showplayListResult.innerHTML='';
	const resPlay = document.getElementById('resultPlayList');
	resPlay.style.display ="block";
	for(let i=0;i<playListObj.length;i++){
		if(playListObj[i].Name===ip){
				const variable = document.createElement('button');
				variable.classList.add('ShowplayListBtn');
				variable.value = ip;
				variable.textContent = ip;
				variable.onclick= function(){
					showSong(playListObj[i].Songs);
				};
				showplayListResult.appendChild(variable);
				flagPlayList=1;
				break;
		}
	}
	if(flagPlayList!=1){
		const showplay = document.createElement('p');
		showplay.style.marginLeft = "1rem";
		showplay.textContent=`No Items Found`;
		showplayListResult.appendChild(showplay);
	}
}



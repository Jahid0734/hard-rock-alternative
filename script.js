const searchBtn = document.getElementById('search-btn').addEventListener('click', () => {
    const lyricsName = document.getElementById('lyrics-name');
   if (lyricsName.value == '' || lyricsName.value == ' ') {
       alert('Please Enter a Song Name')
   }
   else{
    fetch(`https://api.lyrics.ovh/suggest/${lyricsName.value}`)
    .then(res => res.json())
    .then(data => {

        const song = data.data;
        for(let i = 0; i < 10; i++){
            const titleSong = song[i]
            const simpleResult =  document.getElementById('result');
            simpleResult.innerHTML += `
            <div>
            <div  class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
            <h3 class="lyrics-name">${titleSong.title}</h3>
            <p class="author lead">Album by <span>${titleSong.artist.name}</span></p>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button songArtist = "${titleSong.artist.name}" songTitle = "${titleSong.title}" class="btn btn-success">Get Lyrics</button>
        </div>
        </div>
        </div>`
        }


    })
    lyricsName.value = '';
   }
   
 const result = document.getElementById('result').addEventListener('click', (button) => {
     const btnTarget = button.target;
    
     if (btnTarget.tagName == "BUTTON") {
         const artistName = btnTarget.getAttribute('songArtist');
         const titleName = btnTarget.getAttribute('songTitle');
         
         fetch(`https://api.lyrics.ovh/v1/${artistName}/${titleName}`)
         .then(res => res.json())
         .then(data => {
             const lyricsSong = data.lyrics;
             
             const lyrics = document.getElementById('lyrics');
             lyrics.innerHTML=`
             <h2 class="text-success mb-4">${titleName}</h2>
             <pre class="lyric text-white"> ${lyricsSong}</pre>`     
         })
     }
 })
   
});


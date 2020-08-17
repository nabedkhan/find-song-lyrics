const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const songsList = document.querySelector('.songs-list');




function fetchApi() {
    const apiUrl = 'https://api.lyrics.ovh/suggest/';
    fetch(`${apiUrl}/${searchInput.value}`)
        .then(response => response.json())
        .then(songs => showSongsList(songs.data))
}

searchBtn.addEventListener('click', () => {
    if (searchInput.value !== '') {
        fetchApi();
    }
    searchInput.value = '';
});


function showSongsList(songsArr) {
    songsList.innerHTML = '';

    songsArr.forEach((element, index) => {
        if (index < 10) {
            const songName = element.title;
            const album = element.album.title;
            const markup = `<p class="author lead">
                <strong>${songName}</strong> Album by <span>${album}</span>
                <button onclick="getLyrics('${songName}', '${element.artist.name}')" class="btn btn-success">Get Lyrics</button>
                </p>`;
            songsList.innerHTML += markup;
        }
    });
}

const songTitle = document.getElementById('song-title');
const songLyrics = document.getElementById('song-lyrics');
function getLyrics(song, artist) {
    // get API
    const apiUrl = 'https://api.lyrics.ovh/v1/';

    fetch(`${apiUrl}/${artist}/${song}`)
        .then(response => response.json())
        .then(songs => {
            songTitle.innerText = song;
            songLyrics.innerText = songs.lyrics;
        })
}
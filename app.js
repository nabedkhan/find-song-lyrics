const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const songsList = document.querySelector('.songs-list');
const searchResult = document.querySelector('.search-result');


searchBtn.addEventListener('click', () => {
    if (searchInput.value !== '') {
        const apiUrl = 'https://api.lyrics.ovh/suggest/';
        fetch(`${apiUrl}/${searchInput.value}`)
            .then(response => response.json())
            .then(songs => showSongsList(songs.data))
    } else {
        const alertMsg = document.getElementById('alert');
        alertMsg.style.display = 'block';
        setTimeout(() => alertMsg.style.display = 'none', 1000);
    }
    searchInput.value = '';
});


function showSongsList(songsArr) {
    searchResult.innerHTML = '';

    songsArr.forEach((element, index) => {
        if (index < 10) {
            const songName = element.title;
            const album = element.album.title;
            const artist = element.artist.name;
            const id = element.id;

            const markup = `<div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-8 col-8">
                    <h3 class="lyrics-name font-weight-bolder ">${songName}</h3>
                    <p class="author my-1">Singer: <span class="text-success">${artist}</span></p>
                    <p class="author mb-0">Album by <span class="text-success">${album}</span></p>
                </div>
                <!-- get lyrics button -->
                <div class="col-md-4 col-4 text-right">
                    <button onclick="getLyrics('${songName}', '${artist}', '${id}')" class="btn btn-success" data-toggle="collapse" data-target="#collapse${id}" aria-expanded="false"
                        aria-controls="collapse${id}">Get Lyrics</button>
                </div>
                <!-- collapse area -->
                <div class="col-md-12">
                    <div class="collapse" id="collapse${id}">
                        <hr>
                        <div class="single-lyrics text-center mt-4">
                            <h2 class="text-success mb-3 song-title" id="${id}"></h2>
                            <pre class="lyric text-white song-lyrics" id="${id}"></pre>
                        </div>
                    </div>
                </div>
            </div>`
            searchResult.innerHTML += markup;
        }
    });
}

function getLyrics(song, artist, id) {
    const songTitle = document.querySelectorAll('.song-title');
    const songLyrics = document.querySelectorAll('.song-lyrics');
    // get API
    const apiUrl = 'https://api.lyrics.ovh/v1/';

    fetch(`${apiUrl}/${artist}/${song}`)
        .then(response => response.json())
        .then(songs => {
            htmlTraverse(songTitle, song, id);
            htmlTraverse(songLyrics, songs.lyrics, id);
        })
}

function htmlTraverse(selector, element, id) {
    selector.forEach(heading => {
        const getId = heading.getAttribute('id');
        if (getId === id) {
            heading.innerText = element;
        }
    })
}
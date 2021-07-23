

const submitSong = () => {
    console.log("Submitting...")
    const songArtist = document.querySelector(".song-artist");
    const title = document.querySelector(".song-title");
    const genre = document.querySelector(".song-genre");



    firebase.database().ref().push({
        artist: songArtist.value,
        title: title.value,
        genre: genre.value
    });

    refreshSongs();

    songArtist.value = "";
    title.value = "";
    genre.value = "";

};


const refreshSongs = () => {
    const col = document.querySelector(".song-card-container");
    col.innerHTML="";    
    const songsRef = firebase.database().ref();
    songsRef.on('value', (snapshot) => {
        const songs = snapshot.val();

        for(songKey in songs) {
            const songData = songs[songKey];
            const songTitle = songs[songKey].title;
            const songArtist = songs[songKey].artist;
            const songGenre = songs[songKey].genre;
            console.log(songTitle);

            let songCard = document.createElement("div");
            songCard.classList.add("card");
            let cardContent = document.createElement("div");
            cardContent.classList.add("card-content");
            let cardContentContent = document.createElement("div");
            cardContentContent.classList.add("content");
            cardContentContent.innerHTML = `${songTitle}<br>${songArtist}<br>${songGenre}`;

            cardContent.appendChild(cardContentContent);
            songCard.appendChild(cardContent);

            let cardFooter = document.createElement("footer");
            let save = document.createElement("a");
            let edit = document.createElement("a");
            let deleteCard = document.createElement("a");
            cardFooter.classList.add("footer");
            // save.classList.add("card-footer-item save");
            // save.innerHTML = "Save";
            // edit.classList.add("card-footer-item edit");
            // edit.innerHTML = "Edit";
            deleteCard.classList.add("card-footer-item");
            // deleteCard.classList.add("delete")
            deleteCard.innerHTML = "Delete";

            deleteCard.addEventListener("click", function (){
                var songRef = firebase.database().ref(songKey);
                songRef.remove();
                refreshSongs();
            });

            cardFooter.appendChild(save);
            cardFooter.appendChild(edit);
            cardFooter.appendChild(deleteCard);

            songCard.appendChild(cardFooter);
            col.appendChild(songCard);
            

        }

    });

};

// const del = document.querySelector(".delete");
// del.on("click", {

// });

window.onload = refreshSongs;
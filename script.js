console.log('lets write js');

async function getSongs() {
    let a = await fetch("http://127.0.0.1:5501/ganna/");
    let response = await a.text();
    console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");

    let ganna = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            ganna.push(decodeURIComponent(element.href.split("/ganna/")[1]));
        }
    }
    return ganna;
}

async function main() {
    // get playlist of all songs 
    let songs = await getSongs();
    console.log(songs);

    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    for (const ganna of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li><img class="invert" src="assets/music.svg" alt="">
        <div class="info">
            <div> ${ganna}</div>

        </div>
        <div class="playnow">
            <span>Play Now</span>
            <img class="invert" height="37px" src="assets/play.svg" alt="">
        </div>
             </li>`;
    }

            // get first song
            var audio = new Audio(songs[0]);
            audio.play();

    audio.addEventListener("canplaythrough", (event) => {
                /* the audio is now playable; play it if permissions allow */
                let duration = audio.duration;
            console.log(duration);
    });
}

            main();


var header  = document.querySelector('header');
var section = document.querySelector('section');

let myKey = "1QTqccTGFGoKpCj3xj3ZOUr7K2klsEr_IW9qRs8xkDuQ"; // 스프레드시트 KEY
var requestURL = `https://docs.google.com/spreadsheets/d/${myKey}/gviz/tq?tqx=out:json`;
var request = new XMLHttpRequest();
var musicbook;
var nameOrdered;
request.open('GET', requestURL);
request.responseType = 'text';
request.send();

request.onload = function() {
    var musicbookText = request.response.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\)/);
    if (musicbookText && musicbookText.length == 2) {
        const obj = JSON.parse(musicbookText[1]);
        const table = obj.table;
        const rows = table.rows.map(({c}) => c.map(e => e ? (e.v || "") : "")); // Modified from const rows = table.rows.map(({c}) => c.map(({v}) => v));

        console.log(obj);
        console.log(table);
        console.log(rows);
    }
    musicbook = JSON.parse(musicbookText[1]).table.rows.map(({c}) => c.map(e => e ? (e.v || "") : ""));
    console.log(musicbook);
    populateSection(musicbook);

    const sorted = (ob) => {
        const arr = [];
        for(let i in ob) {
          arr.push([i, ob[i]]);
        }
        return arr.sorted((a, b) => a[1] - b[1]);
    }
    Object.values(musicbook).sort().forEach(function(value) { nameOrdered[value] = musicbook[value];});
    console.log(sorted);
    console.log(nameOrdered);
}

function populateSection(jsonObj) {
    section.classList.add("music-list");
    section.id = "musicList";
    var musiclist = jsonObj;
    const search_value = document.getElementById("inputsearch").value;
    console.log(search_value);

    for (var i = 1; i < musiclist.length; i++) {
        if ( search_value != "" ) {
            if ( musiclist[i][0].indexOf(search_value)==-1 && musiclist[i][1].indexOf(search_value)==-1 ) {
                continue; 
            }
        }
        var myDiv = document.createElement('div');

        var coverDiv = document.createElement('div');
        var coverImg = document.createElement('img');

        var infoDiv = document.createElement('div');
        var infoSong = document.createElement('h2');
        var infoSinger = document.createElement('p');

        myDiv.classList.add("song-div");
        
        coverDiv.classList.add("album-cover-div");
        coverImg.classList.add("album-cover-img");
        coverImg.src = musiclist[i][3];

        infoDiv.classList.add("info-div");
        infoSinger.classList.add("singer-name");
        infoSong.classList.add("song-name");
        infoSinger.textContent = musiclist[i][0];
        infoSong.textContent = musiclist[i][1];

        coverDiv.appendChild(coverImg);
        infoDiv.appendChild(infoSong);
        infoDiv.appendChild(infoSinger);
        myDiv.appendChild(coverDiv);
        myDiv.appendChild(infoDiv);

        section.appendChild(myDiv);
    }
}


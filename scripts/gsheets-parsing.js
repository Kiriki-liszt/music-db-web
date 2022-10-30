
var header  = document.querySelector('header');
var section = document.querySelector('section');

let myKey = "1QTqccTGFGoKpCj3xj3ZOUr7K2klsEr_IW9qRs8xkDuQ"; // 스프레드시트 KEY
var requestURL = `https://docs.google.com/spreadsheets/d/${myKey}/gviz/tq?tqx=out:json`;
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'text';
request.send();

request.onload = function() {
    var musicbookText = request.response.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\)/);
    if (musicbookText && musicbookText.length == 2) {
        const obj = JSON.parse(musicbookText[1]);
        const table = obj.table;
        const header = table.cols.map(({label}) => label);
        const rows = table.rows.map(({c}) => c.map(e => e ? (e.v || "") : "")); // Modified from const rows = table.rows.map(({c}) => c.map(({v}) => v));

        console.log(obj);
        console.log(table);
        console.log(rows);
    }
    var musicbook = JSON.parse(musicbookText[1]).table.rows.map(({c}) => c.map(e => e ? (e.v || "") : ""));
    console.log(musicbook);
    /* populateHeader(musicbook); */
    populateSection(musicbook);
}

function populateHeader(jsonObj) {
    var myH1 = document.createElement('h1');
    myH1.textContent = "";
    header.appendChild(myH1);           // html의 header에다가 myH1을 추가한다.
}

function populateSection(jsonObj) {
    section.classList.add("music-list");
    var musiclist = jsonObj;

    for (var i = 1; i < musiclist.length; i++) {
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



function searchEnter() {
    if (window.event.keyCode==13) {
        // 엔터키가 눌렸을 때 실행할 내용
        const myNode = section.getElementById("music-list");
        myNode.textContent = '';
    }
}


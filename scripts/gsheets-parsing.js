
var header  = document.querySelector('header');
var section = document.querySelector('section');

let myKey = "1QTqccTGFGoKpCj3xj3ZOUr7K2klsEr_IW9qRs8xkDuQ"; // 스프레드시트 KEY
var requestURL = `https://docs.google.com/spreadsheets/d/${myKey}/gviz/tq?tqx=out:json`;
var request = new XMLHttpRequest();
var musicbook;
var addOrdered;
var singerOrdered;
var songOrdered;
var categories;
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
    categorize(musicbook);
    
    addOrdered = JSON.parse(JSON.stringify(musicbook));

    musicbook.sort(function(a, b) { return a[1]<b[1] ? -1 : (a[1]>b[1] ? 1 : 0); } );
    songOrdered = JSON.parse(JSON.stringify(musicbook));

    musicbook.sort(function(a, b) { return a[0]<b[0] ? -1 : (a[0]>b[0] ? 1 : 0); } );
    singerOrdered = JSON.parse(JSON.stringify(musicbook));

    musicbook = addOrdered;

    populateSection(musicbook, 1); 
}

function categorize(jsonObj) {
    var category = [];
    var cnt = 0;
    var flag;
    for (var i = 1; i < jsonObj.length; i++) {
        flag = 0;
        var looplength = (category.length + 1);
        for (var j = 0; j < looplength; j++) {
            if (category[j] == jsonObj[i][2]) {
                flag++;
            }
        }
        if (flag == 0) {
            category[cnt++] = jsonObj[i][2];
        }
    }
    categories = JSON.parse(JSON.stringify(category));
}

function populateSection(jsonObj, direction) {

    const myNode = document.getElementById("musicList");
    while (myNode.lastElementChild) {
        myNode.removeChild(myNode.lastElementChild);
    }

    var musiclist = jsonObj;
    const search_value = document.getElementById("inputsearch").value;

    var i, end;
    if (direction == 1) {
        i = 0;
        end = musiclist.length;
    }
    else {
        i = musiclist.length - 1;
        end = -1;
    }

    for (i; i != end; i = i + direction) {
        if ( search_value != "" ) {
            if ( musiclist[i][0].indexOf(search_value)==-1 && musiclist[i][1].indexOf(search_value)==-1 ) {
                continue; 
            }
        }
        if (musiclist[i][0] == "가수") {
            continue;
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


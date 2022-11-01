
var header  = document.querySelector('header');
var section = document.querySelector('section');
var category = document.querySelector('category');

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
    
    populateSection(musicbook, 1, "전체"); 
}

function categorize(jsonObj) {
    var tmp_category = [];
    var cnt = 0;
    var flag;

    tmp_category[cnt++] = "전체";
    for (var i = 1; i < jsonObj.length; i++) {
        flag = 0;
        var looplength = (tmp_category.length + 1);
        for (var j = 0; j < looplength; j++) {
            if (tmp_category[j] == jsonObj[i][2]) {
                flag++;
            }
        }
        if (flag == 0) {
            tmp_category[cnt++] = jsonObj[i][2];
        }
    }
    categories = JSON.parse(JSON.stringify(tmp_category));

    for (var i = 0; i < categories.length; i++) {
        var myDiv = document.createElement('div');
        var cateName = document.createElement('button');
        cateName.textContent = categories[i];

        myDiv.classList.add("category-div");
        cateName.classList.add("cate-name");
        cateName.setAttribute("id", "category-" + i);

        myDiv.appendChild(cateName);

        category.appendChild(myDiv);
    }
    cate_selected = "category-0";
    document.getElementById("category-0").parentElement.classList.add("cate-selected")
}

function populateSection(jsonObj, direction, cate_sel) {

    var musiclist = jsonObj;

    /* 기존 노래들 클리어 */
    const myNode = document.getElementById("musicList");
    while (myNode.lastElementChild) {
        myNode.removeChild(myNode.lastElementChild);
    }

    /* 검색 입력창에 들어와있는거 저장 */
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
        if ( (cate_sel != "전체") && (musiclist[i][2] != cate_sel) ) {
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


var sort_selected = "byAdd";
var cate_selected = "category-0";

function searchEnter() {
    if (window.event.keyCode==13) {               
        populateSection(musicbook, 1, document.getElementById(cate_selected).textContent);
    }
}
function searchUpdate() {
    const search_update = document.getElementById("inputsearch");
    search_update.setAttribute("value", search_update.value);
}

function sortSinger() {
    document.getElementById(sort_selected).classList.remove("button-selected");
    document.getElementById("bySinger").classList.add("button-selected");
    sort_selected = "bySinger";
    musicbook = singerOrdered;
    populateSection(musicbook, 1, document.getElementById(cate_selected).textContent);
}
function sortSong() {
    document.getElementById(sort_selected).classList.remove("button-selected");
    document.getElementById("bySong").classList.add("button-selected");
    sort_selected = "bySong";
    musicbook = songOrdered;
    populateSection(musicbook, 1, document.getElementById(cate_selected).textContent);
}
function sortAdded() {
    document.getElementById(sort_selected).classList.remove("button-selected");
    document.getElementById("byAdd").classList.add("button-selected");
    sort_selected = "byAdd";
    musicbook = addOrdered;
    populateSection(musicbook, 1, document.getElementById(cate_selected).textContent);
}

document.getElementById("openMenu").onclick = function() {
    var idLeft = document.getElementById("id-left");
    if (idLeft.classList.contains("left-hide")) {
        idLeft.classList.remove("left-hide");
    }
    else {
        idLeft.classList.add("left-hide");
    }
};        

var cate_click = document.getElementsByClassName("cate-name");
console.log(cate_click);
for (var i = 0; i < cate_click.length; i++) {
    console.log(cate_click[i]);
    cate_click[i].onclick = function() { 
        console.log(this);
        document.getElementById(cate_selected).parentElement.classList.remove("cate-selected");
        document.getElementById(this.id).parentElement.classList.add("cate-selected");
        cate_selected = this.id;
        console.log(cate_selected);
        populateSection(musicbook, 1, document.getElementById(cate_selected).textContent);
    }
}
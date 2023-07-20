
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
    populateSection(musicbook, -1, document.getElementById(cate_selected).textContent);
}

function clicked() {
    console.log(document.getElementsByClassName("genre-button"));
    var prev_sel = document.getElementsByClassName("genre-button");
    for( var i = 0; i < prev_sel.length; i++ ){
        prev_sel.item(i).classList.remove("button-selected");
    }
    console.log(this);
    this.classList.add("button-selected");
}

var prev_sel = document.getElementsByClassName("genre-button");
for( var i = 0; i < prev_sel.length; i++ ){

    prev_sel.item(i).addEventListener('click', function () {

        var prev_sel = document.getElementsByClassName("genre-button");
        if ( this.classList.contains("button-selected") ) {
            for( var i = 0; i < prev_sel.length; i++ ){
                prev_sel.item(i).classList.remove("button-selected");
            }
        }
        else {
            for( var i = 0; i < prev_sel.length; i++ ){
                prev_sel.item(i).classList.remove("button-selected");
            }
            this.classList.add("button-selected");
        }
    });
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

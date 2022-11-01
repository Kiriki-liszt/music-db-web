
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
        // console.log(this);
        document.getElementById(cate_selected).parentElement.classList.remove("cate-selected");
        // document.getElementById(this.id).parentElement.classList.add("cate-selected");
        // cate_selected = this.id;
        console.log(cate_selected);
        populateSection(musicbook, 1, document.getElementById(cate_selected).textContent);
    }
}
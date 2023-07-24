
var sort_selected = "byAdd";

function searchEnter() {
    if (window.event.keyCode==13) {               
        populateSection(musicbook, 1);
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
    console.log("sortSinger, musicbook\n", musicbook);
    populateSection(musicbook, 1);
}
function sortSong() {
    document.getElementById(sort_selected).classList.remove("button-selected");
    document.getElementById("bySong").classList.add("button-selected");
    sort_selected = "bySong";
    musicbook = songOrdered;
    console.log("sortSong, musicbook\n", musicbook);
    populateSection(musicbook, 1);
}
function sortAdded() {
    document.getElementById(sort_selected).classList.remove("button-selected");
    document.getElementById("byAdd").classList.add("button-selected");
    sort_selected = "byAdd";
    musicbook = addOrdered;
    console.log("sortAdded, musicbook\n", musicbook);
    populateSection(musicbook, 1);
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

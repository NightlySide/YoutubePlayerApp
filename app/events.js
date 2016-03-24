function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    //url = url.toString().toLowerCase(); // This is just to avoid case sensitiveness  
    name = name.replace(/[\[\]]/g, "\\$&").toLowerCase();// This is just to avoid case sensitiveness for query parameter name
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//Au chargement de la page
$(document).ready(function () {
    var id = getParameterByName("v");
    console.log(id);
    if (id != null)
        loadSong(id, $("#player"), $("#videoSRC"));
    else
        loadSong("pSqfbgvXqU0", $("#player"), $("#videoSRC"));
});

//Lorqu'on change le volume (slider)
$("#songVol").on('input', function () {
  document.getElementById("player").volume = $(this).val()/100;
});

//Lorqu'on clique sur le bouton pour charger la video
$("#videoSend").click(function () {
  var id = youtube_parser($("#videoID").val());
  loadSong(id, $("#player"), $("#videoSRC"));
});

//Lorqu'on clique sur le bouton pause/play
$("#pause").click(function() {
  pauseAudio($("#player"));
});

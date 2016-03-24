var ytapi = require('node-youtubeapi-simplifier');
var ytdl = require('ytdl-core');

ytapi.setup('AIzaSyBcp7YDxT63FHnF2ZyRQ8g3p264SQza2No');

var compteur = 0;

function search (videoName) {
    var videos = Array();
    ytapi.searchFunctions.simpleSearch(videoName).then(function (data) {
        console.log(data);
        addVideoLink(data);
    });
}

function setVideoViewCounts(videoId, compteur)
{
    ytapi.videoFunctions.getDetailsForVideoIds([videoId]).then(function (data) {
        var likes = data[0]["statistics"]["likeCount"];
        var dislikes = data[0]["statistics"]["dislikeCount"];
        $("#viewC"+compteur).empty();
        $("#viewC"+compteur).html(likes+"/"+dislikes);
    });
}

function addVideoLink(videos) {
    console.log("Nb videos : "+videos.length);
    $("#results").empty();
    for (var i = 0; i<videos.length; i++)
    {
        var v = videos[i];
        if (v["videoId"] != undefined) {
            var vi = setVideoViewCounts(v["videoId"], compteur);
            var vidHtml = '<a class="collection-item avatar" href="index.html?v='+v["videoId"]+'">'+
                          '<img src="'+v["thumbnails"]["medium"]["url"]+'" alt="" class="circle responsive" height="50">'+
                          '<span class="title orange-text">'+v["title"]+'</span>'+
                          '<p class="grey-text text-darken-1">'+v["channel"]["channelTitle"]+'<br>'+
                          '<span class="grey-text text-darken-1" id="viewC'+compteur+'">Loading ...</span></p>'+
                          '<span class="secondary-content"><i class="material-icons orange-text text-lighten-1">play_circle_outline</i></span>'+
                        '</a>';
            $("#results").append(vidHtml);
            ytdl.getInfo("http://youtube.com/watch?v="+v["videoId"], [], function (err, info) {
               console.log(info); 
            });
            compteur++;
        }
    }
}

$("#videoSend").click(function () {
  console.log("searching");
  var name = $("#videoName").val();
  search(name);
});
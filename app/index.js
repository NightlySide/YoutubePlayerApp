var ytapi = require('node-youtubeapi-simplifier');
var youtubeStream = require('./youtubeStream');
var http = require("http");
var url = require("url");

var id = "Ap-HeMIKi-c";
var isPaused = false;
var duration = 0;

http.createServer(function (req, res) {
  res.writeHead(200, {
    "Content-Type": "audio/mpeg"
  })
  var query = url.parse(req.url)["pathname"].substr(1);
  var requestUrl = 'http://youtube.com/watch?v=' + query;
  try {
    youtubeStream(requestUrl).pipe(res);
  } catch (exception) {
    res.write(exception);
  }
}).listen(3000);

ytapi.setup('AIzaSyBcp7YDxT63FHnF2ZyRQ8g3p264SQza2No');

function pauseAudio(player)
{
  if(isPaused)
  {
    player.trigger("play");
    $("#pause").text("Pause");
  } else {
    player.trigger("pause");
    $("#pause").text("Play");
  }
  isPaused = !isPaused;
}

function loadSong(id, player, src)
{
  src.attr("src", "http://localhost:3000/"+id);
  if (!isPaused)
    pauseAudio(player);
  player.trigger('load');
  pauseAudio(player)

  ytapi.videoFunctions.getDetailsForVideoIds([id]).then(function (data) {
      console.log(data);
      document.getElementById("title").innerHTML= data[0]["title"];
      $("#desc").html(data[0]["description"].replace(/\n/g, "<br />"));
      $("#background").css("background-image", "url('"+data[0]["thumbnails"]["high"]["url"]+"')");
      $("#thumbnail").prop("src", data[0]["thumbnails"]["standard"]["url"]);
  });
}

function getAudioDuration()
{
  return
}

/*ytapi.searchFunctions.simpleSearch('Dr Who').then(function (data) {
    console.log('Search results for Dr. Who');
    console.log(data);
});*/

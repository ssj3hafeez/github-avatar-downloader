var request = require('request');
var token = require('./secrets.js');
var fs = require('fs')

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      "Authorization": token.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

function downloadImageByURL(url, filePath){
 request.get(url)
  .on('error', function (err) {
         throw err;
    })
  .pipe(fs.createWriteStream(filePath));

}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);

 var editedResults = JSON.parse(result);

 for (var i = 0; i < editedResults.length; i++){
   var login = editedResults[i].login;
   var avtUrl = editedResults[i].avatar_url;

  downloadImageByURL(avtUrl, `avatars/${login}.jpg`);

 }
});
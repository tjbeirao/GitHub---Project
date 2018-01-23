var secrets = require('./secrets');
var request = require('request');
var fs = require('fs')

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'User-Agent': 'tjbeirao',
            Authorization: 'token ' + secrets.GITHUB_TOKEN
        }
    };

    request(options, function(err, res, body) {
        parse = JSON.parse(body);
        cb(err, parse);
    });
}

function downloadImageByURL(output, filePath) {
    request.get(output)
        .pipe(fs.createWriteStream(filePath))

}

getRepoContributors("jquery", "jquery", function(err, result) {
    if (err) {
        console.log("Errors:", err)
    } else {
        avatarURL = result.map(user => (user.avatar_url));
        userName = result.map(user => (user.id))
            // console.log(avatarURL)
            // console.log(userName)
        for (let i = 0; i < avatarURL.length; i++) {
            downloadImageByURL(avatarURL[i], "./avatars/" + userName[i])
        }
    }
})
const axios = require('axios');
const fs = require("fs");



async function generateUser (username)
{
    return new Promise ((resolve)=>{
    const user = {
        name : "",
        username : "",
        location : "",
        picURL : "" ,
        profileURL : "",
        blogURL : "",
        bio : "",
        numberOfPublicRepos : 0,
        numberOfFollowers : 0,
        numberOfStars : 0,
        numberFollowing : 0,
        }

        // request gitHub User name from user. Using Process.
        // query link to github
        const queryURL = `https://api.github.com/users/${username}`;
        axios.get(queryURL).then((response) => 
        {
            user.username = username;
            user.name = response.data.name;
            downloadPic(response.data.avatar_url,"profile.jpeg"); 
            user.picURL = "profile.jpeg";
            user.location = response.data.location.replace(" ","+");
            user.profileURL = response.data.html_url;
            user.blogURL = response.data.blog;
            user.bio = response.data.bio;
            user.numberOfPublicRepos = parseInt(response.data.public_repos);
            user.numberOfFollowers = parseInt(response.data.followers);
            user.numberFollowing = parseInt(response.data.following);
            axios.get(response.data.repos_url).then((response)=>
            {
            response.data.forEach(element => 
                {
                    user.numberOfStars += parseInt(element.stargazers_count);
                });
            resolve(user);
            })
        })
    })
}

function downloadPic(url, imagePath)
{
    axios({
        url,
        responseType: 'stream',
      }).then( response =>
          new Promise((resolve, reject) => {
            response.data
              .pipe(fs.createWriteStream("profile.jpeg"))
              .on('finish', () => resolve("imaged Saved"))
              .on('error', e => reject(e));
          }),
      );
}

module.exports =
{
    user: async function get(username)
    {
        if(username === undefined)
        {
            return "No Good!"
        }
        let result = await generateUser(username);
        return result;
    }
}
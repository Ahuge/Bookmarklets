var authentication = undefined;
function httpGetAsync(theUrl, cb)
{
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {cb(xmlHttp)};
    xmlHttp.open( "GET", theUrl, true );
    if (typeof authentication !== "undefined")
    {
        xmlHttp.setRequestHeader("Authorization", "Basic " + btoa(authentication));
    }
    xmlHttp.send( null );
}

function pickrepo(xmlHttp, users)
{
  console.log("Inside pickRepo");
  if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ) 
  {
    if ( xmlHttp.responseText == "Not found" ) 
    {
      alert("Not found");
    }
    else
    {
      var liked = JSON.parse( xmlHttp.responseText );
      if (liked.length)
      {
          var max_stars = 0
          for (var i=0; i < liked.length; ++i)
          {
              if (liked[i]['stargazers_count'] > max_stars)
              {
                  max_stars = i;
              }
          }
          var element = liked[max_stars];
          console.log("starred element");
          console.log(element);
          window.open(element['url'].replace("api.", "").replace("/repos/", "/"), "_self");
          console.log(element['url'].replace("api.", "").replace("/repos/", "/"));
      }
      else
      {
        console.log("Retry");
        var index = Math.floor(Math.random() * users.length);
        var element = users[index];
        var username = element['login'];
        httpGetAsync("https://api.github.com/users/" + username + "/starred", function(xmlHttp_pass) {pickrepo(xmlHttp_pass, users)});
      }
    }
  }
}

function getUserStars(xmlHttp) 
{
  if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ) 
  {
    if ( xmlHttp.responseText == "Not found" ) 
    {
      alert("Not found");
    }
    else
    {
      var info = JSON.parse( xmlHttp.responseText );
            if (info.length)
      {
      var index = Math.floor(Math.random() * info.length);
      var element = info[index];
      var username = element['login'];
      httpGetAsync("https://api.github.com/users/" + username + "/starred", function(xmlHttp_pass) {pickrepo(xmlHttp_pass, info)});
      }
    };
  };
};

var num = Math.floor((Math.random() * 17500000) + 1);

httpGetAsync("https://api.github.com/users?since=" + num, getUserStars);
function httpGetAsync(t,e){xmlHttp=new XMLHttpRequest,xmlHttp.onreadystatechange=function(){e(xmlHttp)},xmlHttp.open("GET",t,!0),"undefined"!=typeof authentication&&xmlHttp.setRequestHeader("Authorization","Basic "+btoa(authentication)),xmlHttp.send(null)}function pickrepo(t,e){if(console.log("Inside pickRepo"),4==t.readyState&&200==t.status)if("Not found"==t.responseText)alert("Not found");else{var o=JSON.parse(t.responseText);if(o.length){for(var n=0,a=0;a<o.length;++a)o[a].stargazers_count>n&&(n=a);var s=o[n];console.log("starred element"),console.log(s),window.open(s.url.replace("api.","").replace("/repos/","/"),"_self"),console.log(s.url.replace("api.","").replace("/repos/","/"))}else{console.log("Retry");var r=Math.floor(Math.random()*e.length),s=e[r],p=s.login;httpGetAsync("https://api.github.com/users/"+p+"/starred",function(t){pickrepo(t,e)})}}}function getUserStars(t){if(4==t.readyState&&200==t.status)if("Not found"==t.responseText)alert("Not found");else{var e=JSON.parse(t.responseText);if(e.length){var o=Math.floor(Math.random()*e.length),n=e[o],a=n.login;httpGetAsync("https://api.github.com/users/"+a+"/starred",function(t){pickrepo(t,e)})}}}var authentication=void 0,num=Math.floor(175e5*Math.random()+1);httpGetAsync("https://api.github.com/users?since="+num,getUserStars);
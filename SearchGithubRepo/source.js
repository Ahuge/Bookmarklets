var authentication = undefined;
var page = 1;
var terms = "";
var language = "";

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

function remove_all(html, head, body) {
    try {
        html.removeChild(head);
        html.removeChild(body);
    }
    catch(err) {
        console.log("Failed Removing, things may look broken");
    }
}

function create_head(html) {
  var html_head = "a {transition: color .4s;color: #265C83;} a:link, a:visited { color: #265C83; } a:hover   { color: #7FDBFF; } a:active  { transition: color .3s; color: #007BE6;} .link { text-decoration: none; } h1, h2 { display: inline;}";
  var head = document.createElement("head");
  var style = document.createElement("style");
  var script = document.createElement("script");
  head.appendChild(style);
  style.innerHTML = html_head;
    
  script.innerHTML = document.currentScript;
  html.appendChild(head);
  
}

function create_body(html, response) {
  var body = document.createElement("body");
  var repo_list = [];
  for (var i=0; i<response.items.length; ++i)
  {
    var repo = response.items[i];
    var div = document.createElement("div");
    var h1 = document.createElement("h1");
    var h2 = document.createElement("h2");
    var h1_a = document.createElement("a");
    var h2_a = document.createElement("a");

    h1_a.href = repo.html_url;
    h1_a.text = repo.name;
    
    h2_a.href = repo.owner.html_url;
    h2_a.text = repo.owner.login;
    
    var d = document.createElement("h2");
    d.text = " - ";
    d.innerText = " - ";

    h2.appendChild(h2_a);
    h1.appendChild(h1_a);
    
    div.appendChild(h1);
    div.appendChild(d);
    div.appendChild(h2);
    
    repo_list.push(repo.name);
    body.appendChild(div);
  };
  var paged = document.createElement("div");
  var nextb = document.createElement("button");
  var prevb = document.createElement("button");

  nextb.onclick = forward;
  nextb.innerHTML = "Next Page";
  prevb.onclick = backward;
  prevb.innerHTML = "Previous Page";
  paged.appendChild(prevb);
  paged.appendChild(nextb);

  body.appendChild(paged);
  html.appendChild(body);
  console.log("Repos found: " + repo_list);
  console.log("Page is " + page);
  console.log("Terms are " + terms);
  console.log("Language is " + language);
}

function backward() {
    page -= 1;
    get_values();
}

function forward() {
    page += 1;
    get_values();
}

function generate_result(xmlhttp) {
  var response = JSON.parse(xmlhttp.responseText);
  var html_tag = document.getElementsByTagName("html")[0];
  var body = document.getElementsByTagName("body")[0];
  var head = document.getElementsByTagName("head")[0];
  remove_all(html_tag, body, head);
  create_head(html_tag);
  create_body(html_tag, response);

  // console.log(html_head + html_body);
  // window.open(html_head + html_body,'_blank');
}

function get_values() {
    if (terms === "") {
        terms = escape(prompt("Search Terms", "Autodesk Maya"));
    }
    if (language === "") {
        language = prompt("Language", "python");
        if (language === "") {
            language = "None";
        }
    }
    if (language !== "None") {
      httpGetAsync("https://api.github.com/search/repositories?q=" + terms + "+language:" + language + "&sort=stars&order=desc&page=" + page + "&per_page=100", generate_result);
    }
    else {
      httpGetAsync("https://api.github.com/search/repositories?q=" + terms + "&sort=stars&order=desc&page=" + page + "&per_page=100", generate_result);
    }
}

get_values();

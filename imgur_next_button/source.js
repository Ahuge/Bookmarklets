var DEBUG_LEVEL = 0;
var global_popped_state = false;

function isElementInView (element) {
  // Grabbed from @bravedick at http://stackoverflow.com/a/22480938/2553754
  var elemTop = element.getBoundingClientRect().top;
  var elemBottom = element.getBoundingClientRect().bottom;

  var isVisible = (elemTop >= 1) && (elemBottom <= window.innerHeight);
  if (DEBUG_LEVEL >= 2) {
    console.log("Is it visible?", isVisible);
    console.log("Global pop state is:", global_popped_state);
  }
  return isVisible;
}

function editPage() {
  document.getElementById("topbar").style.position = "fixed";
  document.getElementById("inside").style.padding = "50px";
}

function pop() {
  /*
  pop will find the first next-prev div, which is the container for the navNext div.
  It will then use isElementInView to see if it is visible and "global_popped_state"
    to decide if it needs to pop in, out or not at all.
  */
  var next_button_container = document.getElementsByClassName("next-prev")[0];
  var next_button = document.getElementsByClassName("navNext")[0];
  var prev_button = document.getElementsByClassName("navPrev")[0];
  var view_state = isElementInView(next_button_container);

  if (view_state != global_popped_state) {
    return;
  };

  if (isElementInView(next_button_container)) {
    if (DEBUG_LEVEL >= 1) {
      console.log("Moving element back to container. Resetting style values");
    }
    next_button_container.appendChild(prev_button);
    next_button_container.appendChild(next_button);
    // Values hard coded because I didn't want to deal with cross browser compat.
    next_button.style["margin-top"] = "";
    next_button.style["padding-top"] = "10px";
    next_button.style["height"] = "36px";
    next_button_container.appendChild(next_button);

    prev_button.style["margin-left"] = "";
    prev_button.style["margin-top"] = "";
    prev_button.style["margin-right"] = "5px";
    prev_button.style["padding-top"] = "10px";
    prev_button.style["height"] = "36px";
    global_popped_state = false;
  }
  else {
    if (DEBUG_LEVEL >= 1) {
      console.log("Moving element top topbar. Setting style values to make it look nice");
    }
    document.getElementById("topbar").appendChild(prev_button);
    document.getElementById("topbar").appendChild(next_button);
    next_button.style["margin-top"] = "9px";
    next_button.style["padding-top"] = "9px";
    next_button.style["height"] = "32px";

    prev_button.style["margin-left"] = "10px";
    prev_button.style["margin-right"] = "5px";
    prev_button.style["margin-top"] = "9px";
    prev_button.style["padding-top"] = "9px";
    prev_button.style["height"] = "32px";
    global_popped_state = true;
  }
};

// editPage gets called first so that the elements that needed 
// to be modified get done before a scroll starts happening.
editPage();

// I am adding a pop function that will deal with moving the element 
// and editting it's style as needed.
window.onscroll = pop;

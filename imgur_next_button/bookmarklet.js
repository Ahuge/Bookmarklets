function isElementInView(a){var b=a.getBoundingClientRect().top,c=a.getBoundingClientRect().bottom,d=b>=1&&c<=window.innerHeight;return DEBUG_LEVEL>=2&&(console.log("Is it visible?",d),console.log("Global pop state is:",global_popped_state)),d}function editPage(){document.getElementById("topbar").style.position="fixed",document.getElementById("inside").style.padding="50px"}function pop(){var a=document.getElementsByClassName("next-prev")[0],b=document.getElementsByClassName("navNext")[0],c=isElementInView(a);c==global_popped_state&&(isElementInView(a)?(DEBUG_LEVEL>=1&&console.log("Moving element back to container. Resetting style values"),a.appendChild(b),b.style["margin-left"]="",b.style["margin-top"]="",b.style["padding-top"]="10px",b.style.height="36px",global_popped_state=!1):(DEBUG_LEVEL>=1&&console.log("Moving element top topbar. Setting style values to make it look nice"),document.getElementById("topbar").appendChild(b),b.style["margin-left"]="10px",b.style["margin-top"]="9px",b.style["padding-top"]="9px",b.style.height="32px",global_popped_state=!0))}var DEBUG_LEVEL=0,global_popped_state=!1;editPage(),window.onscroll=pop;
export default function popupError (message,color,location) {
    popup.style.backgroundColor = `${color}`;
    popup.style.visibility = "visible";
    popup.innerHTML = `${message}`;
    setTimeout(() => {
      document.getElementById("popup").style.visibility = "hidden";
      if(location==null){
        location='#'
      }else{
        window.location.href=`${location}`
      }
    }, 3000);
  }

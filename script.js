
var tl = TweenMax;
function  init(params) {
    document.getElementById("btn-about").addEventListener("click", showOverlay);
    document.getElementById("btn-portfolio").addEventListener("click", showOverlay);
    document.getElementById("btn-close").addEventListener("click", closeOverlay)
    document.getElementById("btn-close-portfolio").addEventListener("click", closeOverlay)
    document.getElementById("close-portfolio-overlay").addEventListener("click", closePortfolioOverlay);
  
   var count = document.getElementsByClassName("thumb").length;
   //  console.log(count);
    
   
   var thumbs = document.getElementById('thumbs');
    for (let i = 0; i < config.length; i++) {
      //  var thumbBtn = document.getElementsByClassName("thumb");
      var thumb = document.createElement('div');
      thumb.className = 'thumb';
      thumb.setAttribute('value', i);
      thumb.style.background = 'url('+ config[i].thumb +')';
      thumb.style.backgroundSize = 'cover';
      thumb.innerHTML = '<p class="thumb-size">' + config[i].width + 'x' + config[i].height + '</p>';
      thumb.style.textAlign = "center";
      //  thumbBtn[i].innerHTML = '<a href="'+ config[i].link +'"' +'target="blank"'+'><div class="clickthrough"></div></a>';
      //  thumb.innerHTML = '<a href="'+ config[i].link +'"' +'target="blank"'+'><div class="clickthrough"></div></a>';
      thumbs.appendChild(thumb);
      
      var thumbCT = document.createElement('div');
          thumbCT.className = 'ct-thumb';
      thumb.appendChild(thumbCT);
      thumbCT.setAttribute('value', i);

      thumbCT.addEventListener("click", thumbHandler);
      //  console.log(thumbBtn[i]);
    }
   //  console.log(thumbs.innerHTML);
}
function showOverlay(e){
   tl.set("#container", {opacity:0})
   tl.set('.exp-icon', {scale:.80});
   tl.set("#overlay", {display:"block", top:'100%'});
//    tl.set("#overlay-right", {x:'50%', scale:1, rotation:0});
//    tl.set("#overlay-left", {x:'-50%', scale:1, rotation:0});
   tl.to("#overlay", .5,  {top:"0%"});
   tl.to("#overlay-right", .5,  {x:0, rotation:0, scale:1, ease:Power1.easeInOut, delay:1});
   tl.to("#overlay-left", .5,  {x:"0%", rotation:0, scale:1, ease:Power1.easeInOut, delay:.5});
   tl.to("#container", .5, {opacity:1, delay:.5})
   tl.to(".exp-icon", .5, {scale:1, delay:2})
   
    var pageVal = e.target.getAttribute("page-name")
   switch (pageVal) {
       case "experience":
           tl.set("#container", { display: "block" })
           tl.set('#portfolio', {display:"none"})
           document.getElementById("container").scrollTop = 0;
           break;
       
      case "portfolio":
           tl.set("#container", {display:"none"})
           tl.set('#portfolio', { display: "block" })
           break;
   }
}
function showPortfolioOverlay(param){
      var val = param; console.log(val);
      var container = document.getElementById("portfolio-overlay");
      var adContainer = document.getElementById("ad-container");

          adContainer.innerHTML = '<img class="loader" src="loader.gif">'+
                                  '<iframe id="frame" style="border: 0pt none ;' +
                                  'left: 0px; top: 0px; position: absolute;' +
                                  'width: 100%;' +
                                  'height: 100%;" scrolling="no"></iframe>';
          
          document.getElementById("ad-container").style.width = config[param].width + "px";
          document.getElementById("ad-container").style.height = config[param].height + "px";
          document.getElementById("frame").src = config[val].link;
          document.getElementById("frame").style.width  =  config[param].width + "px";
          document.getElementById("frame").style.height =  config[param].height + "px";
          document.getElementById("frame").addEventListener("load", frameLoaded);

          tl.set('#portfolio-overlay', {display:'block'});
          tl.set('#close-portfolio-overlay', {display:"block"});
          
}
function frameLoaded(){
   // document.getElementById("frame").style.background = "#FFF";
   tl.set('#frame', {background:'#FFF', delay:1});
   tl.set('#ad-container', { display: "block" });
}
function thumbHandler(e){
   var val = e.target.getAttribute('value');
   showPortfolioOverlay(val);
}
function closeOverlay(){
   tl.set("#overlay", {display:"none", delay:.5});
   tl.to("#overlay", .5, { top:'100%'})
}
function closePortfolioOverlay() {
   var container = document.getElementById("ad-container");
   tl.set("#portfolio-overlay", { display: "none", delay: 0 });
   tl.set('#close-portfolio-overlay', { display: "none" });
   tl.set('#ad-container', {display:"none"});
   container.innerHTML = "";
   

}
window.addEventListener('load', init);

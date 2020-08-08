// check if there's a main color in the local storage

let mainColor=localStorage.getItem("color_option");
// console.log(mainColor);
if(mainColor!==null){
    // console.log("there's a presaved color in the local storage");
    document.documentElement.style.setProperty('--main--color',mainColor);

    //check all elements for class active
    let listItems=document.querySelectorAll(".color-options li");
    // console.log(listItems);
    listItems.forEach((item)=>{
        item.classList.remove("active");
        //add class active to the matching color 
        if(item.dataset.color===mainColor){
            item.classList.add("active");
        }
    });

}


//toggle spin class on icon
let settingsIcon=document.querySelector('.gear-container');
// console.log(settingsIcon);

settingsIcon.onclick=function(){  
    // get items 
    let gear=document.querySelector(".fa-cog"); 
    let settingsBox=document.querySelector(".settings-box");
     //add opened class
     settingsBox.classList.toggle("opened");
     // add spin class
    gear.classList.toggle('fa-spin');    
};
//change colors
let colorLi=document.querySelectorAll(".color-options li");

colorLi.forEach( (li)=> {
    li.addEventListener("click",(e)=>{

        // console.log(e.target.dataset.color);
        document.documentElement.style.setProperty('--main--color',e.target.dataset.color);
        //set color on local storage 
        localStorage.setItem("color_option",e.target.dataset.color);

        //remove class active from previous color to the selected on 
        activeHandler(e);

    });
});
//random background options 
let backgroundEl=document.querySelectorAll(".background-options span");
//check if random background is enabled
let randBackground=true;
//set interval variable 
let backgroundInterval;
// check if background random is enabled in local storage 
let RandBgLocalStorage=localStorage.getItem("background_option");
    if(RandBgLocalStorage!==null){
        console.log("the background option is not null");
        if(RandBgLocalStorage==='true'){
            randBackground=true;
            console.log("truthy conditon");
        }else if (RandBgLocalStorage==='false'){
            randBackground=false;
            console.log("falsy conditon");
        }
        let choices=document.querySelectorAll(".options-box span");
        choices.forEach(choice=>{
            choice.classList.remove("active");
        });
        //activate option according to saved local storage value 
        if(RandBgLocalStorage==='true'){
            document.querySelector(".options-box .yes").classList.add("active");
        }else if(RandBgLocalStorage==='false'){
            document.querySelector(".options-box .no").classList.add("active");
        }
    }

  
backgroundEl.forEach( (span)=> {
    span.addEventListener("click",(e)=>{
        //remove class active from previous color to the selected on 
       activeHandler(e);
      if(e.target.dataset.option==="yes"){
        randBackground=true;
        RandomBackgroundGen();
        localStorage.setItem("background_option",true);
     
    }else if (e.target.dataset.option==="no"){
         randBackground=false;
         clearInterval(backgroundInterval);
         localStorage.setItem("background_option",false);

    }

    });
});
// function to generate random background
function RandomBackgroundGen(){
 
 if(randBackground===true) {
//select page element
let landingPage=document.querySelector('.landing-page');

//get images array 
let imgArray=["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","png.png"];          //string array of images names

backgroundInterval=setInterval(()=> {
//get random number 
 let randomNumber=Math.floor(Math.random()*imgArray.length);

landingPage.style.backgroundImage='url("imgs/'+imgArray[randomNumber]+'")';

},10000);

 }


};
RandomBackgroundGen();

//select skills 

let ourSkills=document.querySelector(".skills");

window.onscroll=function(){
    
    //skills offset top => gets the distance from the origin to the section
    let skillsOffsetTop=ourSkills.offsetTop;
     

    //skills outer height => returns the outer height of the element in this case the whole section 
    let skillsOuterHeight=ourSkills.offsetHeight;
   
    //window height => returns the interior height of the window ( changes on resize)
    let windowHeight=this.innerHeight;


    //window scrolltop   => returns the distance scrolled on y axis  
    let windowScrollTop=this.pageYOffset;
 

    if(windowScrollTop>(skillsOffsetTop+skillsOuterHeight-windowHeight)){
        // console.log("you have reached the desired location ");
        let allSkills=document.querySelectorAll(".skills-box .skill-progress span");
        // loop on each element 
        allSkills.forEach(skill=> {
            skill.style.width=skill.dataset.progress;
        });

    }

}

// create popup with the img

// get all the popup elements
let ourGallary=document.querySelectorAll(".gallary .imgs-box img");

//loop on each element 

ourGallary.forEach(img=>{
    img.addEventListener("click",(e)=> {

       //create  overlay div on the whole screen 
    
       let overlay=document.createElement("div");

       // add class to the overlay element

       overlay.className="popup-overlay";

       //append overlay to the body 

       document.body.appendChild(overlay);

       //create popup box 
       let popupBox=document.createElement("div");

       // add class popupbox 
       popupBox.className="popup-box";
      //add header if it exists 
       if(img.alt !==null){
           let imgHeading=document.createElement("h3");
          //create text for heading
          let imgText=document.createTextNode(img.alt);
         //append text to the heading
          imgHeading.appendChild(imgText);
         //append the heading to the popbox
           popupBox.appendChild(imgHeading);
            }

       //create img 
       let Popimage=document.createElement("img");

       //add class to the img to control it's dimensions 
       Popimage.className="popup-image";
       //append img to popupbox
       popupBox.appendChild(Popimage);
       //add the img source from the clicked img
       Popimage.src=img.src;
       //append popupbox to the body 
       document.body.appendChild(popupBox);
       //create closing span
       let closeSpan=document.createElement("span");
       //add class to span 
       closeSpan.className="close-button";
       let closingText=document.createTextNode("X");
       //add closing text to the span 
       closeSpan.appendChild(closingText);
       //add span to the popup box 
       popupBox.appendChild(closeSpan);
        
    });
});

//close popup 
document.addEventListener("click",function(e){
    if(e.target.className=="close-button"){
        // remove popup
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();

    }
});

//navigation bullets 
function goToSection(elements) {
    elements.forEach(elem =>{
        elem.addEventListener("click",(e)=>{
            e.preventDefault();
            let sectionClass=e.target.dataset.section;
            document.querySelector(sectionClass).scrollIntoView({
                behavior:'smooth',
            });
            
        });
    });

}
 let navBullets=document.querySelectorAll(".nav-bullets .bullet");
 goToSection(navBullets);
 //activate nav bar to go to section 
 let navItems=document.querySelectorAll(".landing-page .links a");
 goToSection(navItems);

 // active event handler 
 function activeHandler(events){   
    events.target.parentElement.querySelectorAll(".active").forEach((e)=>{
        e.classList.remove("active");
    });
    //add class active to target element
    events.target.classList.add("active");
 }

 //show bullets options 

 let bullets=document.querySelectorAll(".bullet-options span");

 let bulletsContainer=document.querySelector(".nav-bullets");

 bullets.forEach(bullet =>{
     bullet.addEventListener("click", (e)=>{
         
        if(e.target.dataset.display==='show') {
            console.log("show bullets");
            bulletsContainer.style.display='block';  
            localStorage.setItem("bullet_option","show");   
         }else {
            console.log("don't show  bullets");
            bulletsContainer.style.display='none';
            localStorage.setItem("bullet_option","hide");
        }
        activeHandler(e);

     });
 });

 //use local storage to save the bullet option

 let bulletLocalOption=localStorage.getItem("bullet_option");

 if (bulletLocalOption!==null) {
    bullets.forEach(bullet =>{
        bullet.classList.remove("active");
    });
     // check value of local storage element
     if(bulletLocalOption==="show"){
        bulletsContainer.style.display='block';
        document.querySelector(".bullet-options .yes").classList.add("active");
       

     }else if (bulletLocalOption==="hide"){
        bulletsContainer.style.display='none';
        document.querySelector(".bullet-options .no").classList.add("active");
     }
     

 }
 //reset options button 
 document.querySelector(".reset-options").onclick=function(){
     //remove saved local storage options 
     localStorage.removeItem("color_option");
     localStorage.removeItem("background_option");
     localStorage.removeItem("bullet_option");

     //reload page 
     window.location.reload();
 }
 //toggle small screen menu 

 let menuButton=document.querySelector(".toggle-menu");
 let menuLinks=document.querySelector(".links-container .links");
 
 
 menuButton.onclick=function(e){
     e.stopPropagation();
     menuButton.classList.toggle("menu-open");
     menuLinks.classList.toggle("open");
     
 }

 //click anywhere to close the small nav bar

 document.addEventListener("click",(e)=>{
     if(e.target!==menuButton && e.target!==menuLinks){
       if(menuLinks.classList.contains("open")){
        menuButton.classList.toggle("menu-open");
        menuLinks.classList.toggle("open");
       }
     }
 });

 //stop propagation for links 
 menuLinks.onclick=function(e){
   e.stopPropagation();
 };



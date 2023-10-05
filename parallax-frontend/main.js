const parallax_el = document.querySelectorAll(".parallax");

let xValue = 0, yValue = 0;
let rotateDegree = 0;


function update(cursorPosition){
  parallax_el.forEach((el) =>{
    
    let speedx = el.dataset.speedx;
    let speedy = el.dataset.speedy;
    let speedz = el.dataset.speedz;
    let rotateSpeed = el.dataset.rotation;
    let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth/2?1: -1;
    let zValue = (cursorPosition - parseFloat(getComputedStyle(el).left))*isInLeft*0.1;
    el.style.transform = `translateX(calc(-50% + ${-xValue*speedx}px)) 
     rotateY(${rotateDegree * rotateSpeed}deg)
    translateY(calc(-50% + ${yValue*speedy}px)) 
    perspective(2300px) translateZ(${zValue*speedz}px)`;
    
  });
}

update(0);

window.addEventListener('mousemove', (e)=>{

  if(timeline.isActive()){
    return;
  }
  xValue = e.clientX- window.innerWidth/2;
  yValue = e.clientY- window.innerHeight/2;


  rotateDegree = (xValue / (window.innerWidth/2))*20;

  update(e.clientX);
  

})


// GSAP animation

let timeline = gsap.timeline({duration: 1});

Array.from(parallax_el)
  .filter(
    el => !el.classList.contains("text")
  )
  .forEach((el) =>{

    const distance = parseFloat(el.dataset.distance);
  timeline.from(el, 
    {
      top: `${(el.offsetHeight/2) + +distance}px`,
      duration: 2.5,
  
  },
  0
  );
})

timeline.from(".text h1",{
  y: window.innerHeight+ 200 - document.querySelector(".text h1").getBoundingClientRect().top,
  duration: 2,
}, "2")

.from(".text h2",{
  y: -50,
  opacity: 0,
  duration: 1.5,
},"2.5")
.from(".hide",{
  opacity: 0,
  duration: 1.5,
}, " 3");


let api1 = 'http://localhost:8000/eng-to-de/';
let api2 = 'http://localhost:8000/de-to-eng';
let currApi = api1;

const inputText = document.getElementById('inputText');
const submitButton = document.getElementById('submitButton');
const responseText = document.getElementById('outputText');
document.addEventListener('DOMContentLoaded', function () {

  submitButton.addEventListener('click', function () {
      // Get the text from the input field
      const inputData = inputText.value;

      // Replace with your API endpoint
      const apiUrl = currApi;

      // Create a request object
      const request = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 'text': inputData })
      };

      // Make the API request
      fetch(apiUrl, request)
          .then(response => response.json())
          .then(data => {
              // Display the response in the responseText textarea
              let str ="";
              if(currApi==api2){
                str = JSON.stringify(data.English, null, 2);
              }
              else{
                str =  JSON.stringify(data.German, null, 2);

              }
              console.log(str);
              responseText.value = removeFirstAndLastCharacter(str);
          })
          .catch(error => {
              console.error('Error:', error);
              responseText.value = 'Error occurred while fetching data.';
          });
  });
});

const switchBtn = document.getElementById('switchButton');

switchBtn.addEventListener('click', function(){
  if(currApi==api1){
    currApi = api2;
    inputText.placeholder = "German";
    responseText.placeholder = "English";
    let st = "";
    st = inputText.value;
    inputText.value = responseText.value;
    responseText.value = st;
  }
  else{
    currApi = api1;
    inputText.placeholder = "English";
    responseText.placeholder = "German";
    let st = "";
    st = inputText.value;
    inputText.value = responseText.value;
    responseText.value = st;
  }
})

function removeFirstAndLastCharacter(str) {
  const charArray = str.split('');
  charArray.pop(); // Remove the last character
  charArray.shift(); // Remove the first character
  return charArray.join('');
}


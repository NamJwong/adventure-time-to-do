const characters = document.querySelectorAll("#characters > div");
const login = document.querySelector("#login");
const loginForm = document.querySelector("#login-form");
const userNameInput = document.querySelector("#login-form input");
const greetingCharacter = document.querySelector("#greeting img");
const cheering = document.querySelector("#greeting h1");
const main = document.querySelector("main");
const clock = document.querySelector("#clock");
const toDoList = document.getElementById("todo-list");

const USERINFO_KEY = "userInfo";
const HIDDEN_CLASSNAME = "hidden";
const mornigCheerings = [
  '오늘도 화이팅!',
  '오늘도 좋은 하루 보내길❤️'
]
const evenigCheerings = [
  '오늘 하루도 고생 많았어❤️'
]

// TODO 꼭 전역변수여야 하는지 다시 한 번씩 고민해보기
let selectedCharacter = null;
let beforeTimeZone = 0; // 0 - else, 1 - mornig, 2 - evening
let cheerings = [
  '넌 언제나 잘하고 있어.',
  '언제나 널 응원해.',
  '잘했고, 잘하고 있고, 잘할거야!',
  '넌 정말 최고야!',
  '너의 꿈 응원할게!',
  '열심히 한 만큼, 넌 잘 될 거야.'
];

function selectToggle(element) {
  const SELECTED_CLASSNAME = "selected";
  if(element.classList.contains(SELECTED_CLASSNAME)) {
    element.classList.remove(SELECTED_CLASSNAME);
    selectedCharacter = null;
  }else{
    if(selectedCharacter !== null) {
      document.getElementById(selectedCharacter).classList.remove(SELECTED_CLASSNAME);
    }
    element.classList.add(SELECTED_CLASSNAME);
    selectedCharacter = element.id;
  }
}

function onClickCharacter(event) {
  if(event.srcElement.localName === "div") {
    selectToggle(event.target)
  }else if(event.srcElement.localName === "img") {
    selectToggle(event.path[1]);
  }  
}

function saveUserInfo() {
  const userInfo = {
    character: selectedCharacter,
    name: userNameInput.value
  }
  localStorage.setItem(USERINFO_KEY, JSON.stringify(userInfo));
  return userInfo;
}

function cheeringsPop() {
  let popNum = 0;
  switch(beforeTimeZone) {
    case 1:
      popNum = mornigCheerings.length;
      break;
    case 2:
      popNum = evenigCheerings.length;
      break;
  }
  for(let i = 0; i < popNum; i++) {
    cheerings.pop();
  }
}

function checkTimeZone() {
  const date = new Date();
  const hours = date.getHours();
  if((6 < hours) && (hours < 12)) {
    cheeringsPop();
    for(let i = 0; i < mornigCheerings.length; i++) {
      cheerings.push(mornigCheerings[i]);
    }
    beforeTimeZone = 1;
  }else if((21 < hours) && (hours < 3)) {
    cheeringsPop();
    for(let i = 0; i < evenigCheerings.length; i++) {
      cheerings.push(evenigCheerings[i]);
    }
    beforeTimeZone = 2;
  }else {
    cheeringsPop();
    beforeTimeZone = 0;
  }
}

function setCharacterStyle(character) {
  switch(character) {
    case "bubblegum":
      cheering.style.marginTop = "32px";
      clock.style.marginTop = "10px";
      break;
    case "marceline":
      greetingCharacter.style.width = "85px";
      cheering.style.marginLeft = "24px";
      clock.style.marginTop = "8px";
      break;
    case "jake":
      cheering.style.marginLeft = "17px";
      toDoList.style.height = "180px";
      break;
  }
}

function getRandomNum(key, array) {
  const RADOMNUM_KEY = key;
  let randomNum = Math.floor(Math.random() * array.length);
  const beforeRandomNum = parseInt(localStorage.getItem(RADOMNUM_KEY));
  if(beforeRandomNum !== null) {
    while(randomNum === beforeRandomNum) {
      randomNum = Math.floor(Math.random() * array.length);
    }
  }
  localStorage.setItem(RADOMNUM_KEY, randomNum);
  return randomNum;
}

function paintGreetings(userInfo) {
  checkTimeZone();
  const n = Math.floor(getRandomNum("cheeringRandomNum", cheerings));
  const todaysCheerings = cheerings[n];
  greetingCharacter.src = `img/${userInfo.character}.png`;
  cheering.innerText = `${userInfo.name}, ${todaysCheerings}`;
  main.classList.remove(HIDDEN_CLASSNAME);
  setCharacterStyle(userInfo.character);
}

// TODO
// function isCharacterSelected() {
//   if(userInfo.character === null) {
//   }
// }

function onLoginSubmit(event) {
  event.preventDefault();
  document.querySelector("body").style.marginLeft = "-100%";
  paintGreetings(saveUserInfo());
}

const savedUserinfo = JSON.parse(localStorage.getItem(USERINFO_KEY));

if(savedUserinfo === null) {
  login.classList.remove(HIDDEN_CLASSNAME);
  characters[0].addEventListener("click", onClickCharacter);
  characters[1].addEventListener("click", onClickCharacter);
  characters[2].addEventListener("click", onClickCharacter);
  characters[3].addEventListener("click", onClickCharacter);
  loginForm.addEventListener("submit", onLoginSubmit);
}else {
  paintGreetings(savedUserinfo);
}

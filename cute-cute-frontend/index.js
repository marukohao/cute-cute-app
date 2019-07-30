const USERS_URL = 'http://localhost:3000/users'
const BACKGROUNDS_URL = 'http://localhost:3000/backgrounds'

function fetchUsersData() {
  return fetch(USERS_URL)
  .then(resp => resp.json())
  .then(data => checkUserName(data))
}

function createUser(inputValue) {
  console.log(inputValue);
  return fetch(USERS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      username: inputValue
    })
  })
  .then(resp => resp.json())
  .then(data => displayUserPage(data))
}

function checkUserName(data) {
 const userInput = document.getElementById('login');
 userInput.addEventListener('submit', function(e) {
   e.preventDefault();
   const inputValue = e.target.username.value;
  //  console.log(data);
   const userExist = data.find(user => user.username === inputValue);
    if (!userExist) {
    createUser(inputValue);
   }
    displayUserPage(userExist);
 })
}

function displayUserPage(data) {
  const backgroundPic = document.querySelector(".backgroundpic")
  backgroundPic.className = "profilebackground"
  backgroundPic.innerHTML = ""
  if (data.backgrounds === []) {
    createUserElements(data)
    //show the background image with a plus on it

  } else {
    createUserElements(data)

    //show current backgrounds
  }

  


}

function createUserElements(data) {
  const profileBackground = document.querySelector(".profilebackground")
  const profileDiv = document.createElement("div")
  profileDiv.className = "profile-page"
  // console.log(profile)
  profileBackground.appendChild(profileDiv)
  const h2 = document.createElement('h2');
  h2.innerText = `Welcome ${data.username}!`
  h2.className = 'user-header'
  profileDiv.appendChild(h2)
  fetchBackgrounds(data);
}

function fetchBackgrounds(data) {
  return fetch(BACKGROUNDS_URL)
  .then(resp => resp.json())
  .then(info => renderBackgrounds(info, data));
}

function renderBackgrounds(info, data) {
  console.log("data", data)
  console.log("info", info)
  const profileDiv = document.querySelector(".profile-page")
  const container = document.createElement("div")
  container.className = "background-container"
  profileDiv.appendChild(container)
    info.forEach(element => {
    let image = document.createElement("img")
    image.src = element.background_url 
    image.className = "background-images"
    container.appendChild(image)
    if (data.backgrounds.find(background => background.id === element.id)) {
      console.log('cool', element.id)
      //put play on image
    } else {
      //put plus on image
      console.log("didn't see it", element.id)
    }
    
  });
}

document.addEventListener('DOMContentLoaded', function() {
  fetchUsersData();
})
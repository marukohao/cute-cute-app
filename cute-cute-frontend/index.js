
const USERS_URL = 'http://localhost:3000/users'
const BACKGROUNDS_URL = 'http://localhost:3000/backgrounds'
const ITEMS_URL = 'http://localhost:3000/items'
const ROOMS_URL = 'http://localhost:3000/rooms'
const DECORATIONS_URL = 'http://localhost:3000/decorations'

function fetchUsersData() {
  return fetch(USERS_URL)
    .then(resp => resp.json())
    .then(data => checkUserName(data));
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
  userInput.addEventListener('submit', function (e) {
    e.preventDefault();
    const inputValue = e.target.username.value;
    //  console.log(data);
    const userExist = data.find(user => user.username === inputValue);
    if (!userExist) {
      createUser(inputValue);
    }else {
      displayUserPage(userExist);
    }
  })
}

function displayUserPage(data) {
  const backgroundPic = document.querySelector(".backgroundpic")
  if (backgroundPic) {
    backgroundPic.className = "profilebackground";
    backgroundPic.innerHTML = "";
  }else {
    const backgroundPic = document.querySelector('.profilebackground');
    backgroundPic.innerHTML = "";
  }
  createUserElements(data);
}

function createUserElements(data) {
  const profileBackground = document.querySelector(".profilebackground")
  const profileDiv = document.createElement("div")
  profileDiv.className = "profile-page"
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
  const profileDiv = document.querySelector(".profile-page")
  const container = document.createElement("div")
  container.className = "background-container"
  profileDiv.appendChild(container)
  info.forEach(element => {
    let videoThumb = document.createElement('div');
    videoThumb.className = 'video_thumb';
    container.appendChild(videoThumb);
    let image = document.createElement("img");
    image.src = element.background_url;
    image.className = "background-images";
    image.id = `${element.name}`;
    videoThumb.appendChild(image);
    const userId = data.id;
    const backgroundId = element.id;
    if (data.backgrounds) {
      if (data.backgrounds.find(background => background.id === element.id)) {
        let playButton = document.createElement('div');
        playButton.className = 'play-button';
        videoThumb.appendChild(playButton);
        // let aTag = document.createElement('a');
        // aTag.innerText = 'x';
        // aTag.className = 'remove-image';
        // aTag.style = 'display: inline;'
        // videoThumb.appendChild(aTag);
        fetchRoomData(playButton, image, userId, backgroundId);
        // console.log(roomId);
        // roomChoice(playButton, image, userId, backgroundId);
      }else {
        console.log("create table")
        let plusButton = document.createElement('div');
        plusButton.className = 'plus-button';
        videoThumb.appendChild(plusButton);
        roomChoice(plusButton, image, userId, backgroundId);
      }
    } else {
      console.log("create table")

      let plusButton = document.createElement('div');
      plusButton.className = 'plus-button';
      videoThumb.appendChild(plusButton);
      roomChoice(plusButton, image, userId, backgroundId);
    }
  });
}

function fetchRoomData(playButton, image, userId, backgroundId){
  fetch(ROOMS_URL)
  .then(resp => resp.json())
    .then(roomJson => roomChoice(playButton, image, userId, backgroundId, roomJson)
    // {return roomJson.filter(room => room.user_id === userId).filter(room => room.background_id === backgroundId)[0].id;}
  )
}

function roomDeleteButton(aTag, image, userId) {
  aTag.addEventListener('click', function(e) {
    fetch(ROOMS_URL + '/' + image.name, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: image.name })
    })
    .then(resp =>resp.json())
    .then(json => {
      console.log(json);
      fetch(USERS_URL + '/' + userId)
      .then(resp => resp.json())
      .then(data => displayUserPage(data)) 
    }).catch(err => {
      console.error(err)
    })
  })
}

function roomChoice(button, image, userId, backgroundId, roomJson) {
  // let roomId = romJson.filter(room => room.user_id === userId).filter(room => room.background_id === backgroundId)[0].id
  button.addEventListener('click', function(e) {
    if (button.className === 'plus-button') {
      createRoomAssociation(userId, backgroundId, image)
      const profilePage = document.querySelector('.profile-page');
      profilePage.innerHTML = '';
      profilePage.className = 'room-choice';
      image.className = "create-room-background";
      profilePage.appendChild(image);
      let aTag = document.createElement('a');
      aTag.innerText = 'x';
      aTag.className = 'remove-image';
      aTag.style = 'display: inline;'
      profilePage.appendChild(aTag);
      roomDeleteButton(aTag, image, userId);
      const itemContainer = document.createElement('div');
      itemContainer.className = 'item-container';
      profilePage.appendChild(itemContainer);
      fetchItems(image, userId);
    }else {
      let roomId = roomJson.filter(room => room.user_id === userId).filter(room => room.background_id === backgroundId)[0].id;
      const profilePage = document.querySelector('.profile-page');
      profilePage.innerHTML = '';
      profilePage.className = 'room-choice';
      image.className = "create-room-background";
      image.setAttribute('name', roomId);
      profilePage.appendChild(image);
      let aTag = document.createElement('a');
      aTag.innerText = 'x';
      aTag.className = 'remove-image';
      aTag.style = 'display: inline;'
      profilePage.appendChild(aTag);
      roomDeleteButton(aTag, image, userId);
      const itemContainer = document.createElement('div');
      itemContainer.className = 'item-container';
      profilePage.appendChild(itemContainer);
      fetchItems(image, userId);
    }
  })
}

function createRoomAssociation(userId, backgroundId, image) {
     return fetch(ROOMS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        background_id: backgroundId
      })
    })
      .then(resp => resp.json())
       .then(roomData => {
         image.setAttribute('name', roomData.id);
        })
  }
  
  
function fetchItems(image, userId) {
  return fetch(ITEMS_URL)
  .then(resp => resp.json())
  .then(data => renderItems(data, image, userId)) 
}

function renderItems(data, image, userId) {
  let itemContainer = document.querySelector('.item-container')
  const items = data.filter(item => item.room_type === image.id);
  const roomChoice = document.querySelector('.room-choice');
  const decorationsContainer = document.createElement('div');
  decorationsContainer.className = 'decorations-container';
  roomChoice.appendChild(decorationsContainer);
  fetchUserData(userId, items, image);
  // items.forEach(element => {
  //   let imgCard = document.createElement("div");
  //   imgCard.className = 'item-cards';
  //   itemContainer.appendChild(imgCard);
  //   let itemImg = document.createElement('img');
  //   itemImg.src = element.item_url;
  //   itemImg.className = 'item-image'
  //   imgCard.appendChild(itemImg);
  //   clickItems(itemImg, element, image);
  // })
}

function fetchUserData(userId, items, image) {
  return fetch(USERS_URL + '/' + userId)
  .then (resp => resp.json())
  .then (userData => renderUserData(userData, items, image))
}

function renderUserData(userData, items, image) {
  // console.log(userData);
  const roomChoice = document.querySelector('.room-choice');
  const imageContainer = document.createElement('div');
  imageContainer.className = 'image-container';
  roomChoice.appendChild(imageContainer);
  const itemsId = userData.backgrounds.map(background => background.items).flat();
  items.forEach(element => {
    // console.log(itemsId.find(item => item.id === element.id));
    if(itemsId.find(item => item.id === element.id)) {
      let itemId = element.id;
      let imgCard = document.createElement("div");
      imgCard.className = 'decoration-cards';
      let itemImg = document.createElement('img');
      itemImg.src = element.item_url;
      itemImg.className = 'item-image'
      let roomChoice = document.querySelector('.room-choice');
      imgCard.appendChild(itemImg);
      imageContainer.appendChild(imgCard);
      let aTag = document.createElement('a');
      aTag.innerText = 'x';
      aTag.className = 'remove-item';
      aTag.style = 'display: inline;'
      imgCard.appendChild(aTag);
      deleteItemAss(aTag, image, itemId);
      clickItems(itemImg, element, image);
    }else {
    let itemContainer = document.querySelector('.item-container')
    let imgCard = document.createElement("div");
    imgCard.className = 'item-cards';
    itemContainer.appendChild(imgCard);
    let itemImg = document.createElement('img');
    itemImg.src = element.item_url;
    itemImg.className = 'item-image'
    imgCard.appendChild(itemImg);
    clickItems(itemImg, element, image);
    }
  })
}

function deleteItemAss(aTag, image, itemId) {
  fetchDecorationsData(image, itemId, aTag)
  // aTag.addEventListener('click', function(e){

  // })
}

function fetchDecorationsData(image, itemId, aTag) {
  fetch(DECORATIONS_URL)
    .then(resp => resp.json())
    .then(decorationsJson => {
      let decorationId = decorationsJson.filter(decoration => decoration.item_id === itemId).filter(decoration => decoration.room_id === Number(image.name))[0].id;
      aTag.addEventListener('click', function (e) {
        console.log('hello');
        fetch(DECORATIONS_URL + '/' + decorationId, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: decorationId })
        })
          .then(resp => resp.json())
          .then(json => console.log(json))
      })    
    })
}


function clickItems(itemImg, element, image) {
  itemImg.addEventListener('click', function(e){
    itemImg.parentNode.remove();
    createDecoration(element, image, itemImg)
  })
}

function createDecoration(element, image, itemImg) {
  return fetch(DECORATIONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      room_id: image.name,
      item_id: element.id
    })
  })
    .then(resp => resp.json())
    .then(decoratonData => 
      createDecorationElement(image, itemImg)
    )
}

function createDecorationElement(image, itemImg) {

  const decorationsContainer = document.querySelector('.decorations-container');
  const decorationImg = document.createElement('img');
  const decorationCard = document.createElement('div');
  decorationCard.className = "decoration-card";
  decorationsContainer.appendChild(decorationCard);
  decorationImg.src = itemImg.src;
  decorationImg.className = 'decorationImages';
  decorationImg.id = image.name;
  decorationCard.appendChild(decorationImg);
  
}

document.addEventListener('DOMContentLoaded', function () {
  fetchUsersData();
})
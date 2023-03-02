const phone=async(phoneSearchByName, dataLimit)=>{
  const url = `https://openapi.programming-hero.com/api/phones?search=${phoneSearchByName}`;
  const res = await fetch(url);
  const data = await res.json(res);
  loadPhone(data.data, dataLimit)
}


//loadPhone
const loadPhone=(phones, dataLimit)=>{

//display no phone 
if(phones.length === 0){
  document.getElementById('no-phone').classList.remove('d-none')
}else{
  document.getElementById('no-phone').classList.add('d-none')
}
//display all phones 
const phonesArea = document.getElementById('phones-area');
//clean previous search 
phonesArea.innerHTML = '';

//load 10 or more phones
const loadMoreArea = document.getElementById('load-more-area');
if(dataLimit && phones.length>10){
  phones = phones.slice(0, 10);
  loadMoreArea.classList.remove('d-none')
}else{
  loadMoreArea.classList.add('d-none')
}

phones.forEach(phoneData=>{
const div = document.createElement('div');
div.classList.add('col-md-4');
  div.innerHTML = `
        <div class="card">
        <img src="${phoneData.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phoneData.brand}</h5>
          <p class="card-text">This lead-in to additional content. This content is a little bit longer.</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>

        <button onClick="singlePhone('${phoneData.phone_name}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModal">
        show more
        </button>
      </div>
       `
 phonesArea.appendChild(div);
 
})

//stop loader
loaderspinner(false)
}

//load singlephone 
const  singlePhone=async(phoneId)=>{
  const url  = `https://openapi.programming-hero.com/api/phone/${phoneId}`
  const res = await fetch(url)
  const data = await res.json()
  console.log(data)
}



//process search 
const processSearch=(dataLimit)=>{
  //loader start
  loaderspinner(true)
  const phoneName = document.getElementById('phone-name').value;
  phone(phoneName, dataLimit)
}
//search phone 
document.getElementById('phone-btn').addEventListener('click',function(){
processSearch(10)
})


// loader spinner
const loaderspinner = (isLoading)=>{
  const spinnerArea = document.getElementById('loader-spinner')
  if(isLoading){
    spinnerArea.classList.remove('d-none')
  }else{
    spinnerArea.classList.add('d-none')
  }
}


// showmore btn
  document.getElementById('load-more-btn').addEventListener('click', function(){
      //loader start
  processSearch()
  })


//call main phone()
phone('apple')
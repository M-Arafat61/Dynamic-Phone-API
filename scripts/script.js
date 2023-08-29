// step 1- load data
const loadPhoneData = async (searchText = "13", isShowingAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  )
  const data = await res.json()
  const phones = data.data
  //   console.log(phones)
  displayPhones(phones, isShowingAll)
}
// step 2 - load phones dynamically
const displayPhones = (phones, isShowingAll) => {
  const phoneContainer = document.getElementById("phone-container")
  //   empty phone container for another search
  phoneContainer.textContent = ""

  // display show all button if there are more than 12 phones
  const showAllContainer = document.getElementById("show-all-container")
  //   console.log(phones.length)
  if (phones.length > 12 && !isShowingAll) {
    showAllContainer.classList.remove("hidden")
  } else {
    showAllContainer.classList.add("hidden")
  }

  // display first 12 phones if not showing all
  if (!isShowingAll) {
    phones = phones.slice(0, 12)
  }
  phones.forEach((phone) => {
    // console.log(phone)
    const phoneCard = document.createElement("div")
    phoneCard.classList = "card bg-gray-200 p-4 shadow-xl"
    phoneCard.innerHTML = `
    <figure><img src="${phone.image}" /></figure>
    <div class="card-body">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>There are many variations of passages of available, but the majority have suffered</p>
    <div class="card-actions justify-center">
    <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
    </div>
    </div>
    `
    phoneContainer.appendChild(phoneCard)
  })

  //hide loading spinner
  toggleLoadingSpinner(false)
}
//handle search button
const handleSearchButton = (isShowingAll) => {
  toggleLoadingSpinner(true)
  const searchField = document.getElementById("search-input")
  const searchText = searchField.value
  //   console.log(searchText)
  loadPhoneData(searchText, isShowingAll)
}

// loader/spinner for toggling
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner")
  if (isLoading) {
    loadingSpinner.classList.remove("hidden")
  } else {
    loadingSpinner.classList.add("hidden")
  }
}

// handle show all button
const handleShowAllButton = () => {
  handleSearchButton(true)
}

//handle show details modal
const handleShowDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  )
  const data = await res.json()
  const phone = data.data
  showPhoneDetails(phone)
}
const showPhoneDetails = (phone) => {
  console.log(phone)
  /*   const phoneName = document.getElementById("show-detail-phone-name")
  phoneName.innerText = phone.name */

  const showDetailContainer = document.getElementById("show-detail-container")
  showDetailContainer.innerHTML = `
  <div class="flex justify-center items-center">
  <img src="${phone.image}"/>
  </div>
  <h3 id="show-detail-phone-name" class="font-bold text-lg">${phone.name}</h3>
  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
  <p><span class="font-bold">Storage: </span>${phone.mainFeatures.storage}</p>
  <p><span class="font-bold">Display Size: </span>${
    phone.mainFeatures.displaySize
  }</p>
  <p><span class="font-bold">Chipset: </span>${phone.mainFeatures.chipSet}</p>
  <p><span class="font-bold">Memory: </span>${phone.mainFeatures.memory}</p>
  <p><span class="font-bold">Slug: </span>${phone.slug}</p>
  <p><span class="font-bold">Release Date: </span>${phone.releaseDate}</p>
  <p><span class="font-bold">Brand: </span>${phone.brand}</p>
  <p><span class="font-bold">GPS: </span>${
    phone.others?.GPS || "no data for GPS"
  }</p>
  <p><span class="font-bold">Others: </span>Bluetooth-${
    phone.others?.Bluetooth || "no data available"
  }
  NFC-${phone.others?.NFC || "no data available"}
  WLAN-${phone.others?.WLAN || "no data available"}</p>

  `
  my_modal.showModal()
}
loadPhoneData()

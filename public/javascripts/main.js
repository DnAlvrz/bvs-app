function customerUpdate (customer) {
    document.getElementById('id').value = customer._id;
    document.getElementById('givenName').value = customer.givenName;
    document.getElementById('lastName').value = customer.lastName;
    document.getElementById('middleName').value = customer.middleName;
    document.getElementById('contactNum').value = customer.contactNum;
    document.getElementById('occupation').value = customer.occupation;
    document.getElementById('dob').value = customer.dob;
    document.getElementById('address').value = customer.address;
    setForm('customerForm', '/customers?_method=PUT', 'customerFormTitle','Edit Customer' );
  }
  
const setForm = (formId, formAction, titleId, formTitle) => {
  const form = document.getElementById(formId);
  const title  = document.getElementById(titleId)
  title.textContent=formTitle
  form.setAttribute('action', formAction);
}


const clearForm = (formId, formAction, titleId, formTitle) => {
  const form = document.getElementById(formId);
  const title = document.getElementById(titleId).textContent=formTitle
  form.setAttribute('action', formAction);
  form.reset();
}

const updateVideo  = async (video) => {
  setForm('videoForm', '/videos?_method=PUT', 'videoFormTitle','Edit Video' );
  document.getElementById('videoId').value = video._id;
  document.getElementById('title').value = video.title;
  document.getElementById('description').value = video.description;
  document.getElementById('copies').value = video.copies;
  document.getElementById('rentDays').value = video.rentDays;
  const category =document.getElementById('category');
  for (let i = 0; i < category.options.length; i++) {
    option = category.options[i];
    if (option.value === video.category) {
        option.selected = true;
    }
  }
}

const deleteVideo = (id) => {
  document.getElementById('deleteVideoId').value=id;
}

const updateRental = (id) => {
  document.getElementById('returnId').value=id;
}
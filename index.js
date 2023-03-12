
"use strict"

let inputName = document.querySelector(".name");
let inputProduct = document.querySelector(".product");
let inputColor = document.querySelector(".color");
let inputPrice = document.querySelector(".price");
let inputPaid = document.querySelector(".Paid");
let inputRemain = document.querySelector(".Remaining");
let inputCount = document.querySelector(".count");
let inputSearch = document.querySelector(".search");
let inputCreate = document.querySelector(".create");
let inputClear = document.querySelector(".clear");
let crudForm = document.querySelector(".crud-form");
let startCreate = document.querySelector(".creatanimated");
let close = document.querySelector(".crud-form .close");
let overlay = document.querySelector(".overlay");
let inputs = document.querySelectorAll(".input-crud input");
let tablehead = document.querySelector(".head");
let tableBody = document.querySelector(".bod");
let deleteall = document.querySelector(".deleteAll");

let style = "create";
let x;
//for locale
let dataArr;

if(localStorage.data != null) {
  
 dataArr=JSON.parse(localStorage.data);
} else {
    
  
    dataArr = [];
  }

//for styling crud-form
function crudFun() {
 
 crudForm.style.left = "50%";
  crudForm.style.zIndex = "22";
  overlay.classList.remove("hidden");


}
function hideCrud() {
  crudForm.style.left = "-100%";
  overlay.classList.add("hidden");
}
//to show crud form
startCreate.addEventListener("click", function () {

crudFun()




});
//to close form
close.addEventListener("click", function () {
 hideCrud();
  if (style == "update") {
 

inputName.focus();
  inputName.value ="";
  inputColor.value = "";
  inputPrice.value = "";
  // inputCount.value = "";
  inputPaid.value = "";
  inputCount.style.display = "block";
  inputClear.style.display = "block";
  inputCreate.value = "Create";

  style = "create";
  }
  
});

// create prouduct step one
function createFun() {
  if (
    inputName.value!==""&&
    inputProduct.value !==""&&inputPrice.value!=="") {
      
       
    let obj = {
      namee: inputName.value.toLowerCase().trim(),
      color : inputColor.value?inputColor.value.toLowerCase().trim():"purple",
      product: inputProduct.value.toLowerCase().trim(),
      price:  inputPrice.value>0? +inputPrice.value.toLowerCase().trim():+"0",
      paid: inputPaid.value!==""?+inputPaid.value.toLowerCase().trim():+"0",
      count: inputCount.value.toLowerCase().trim(),
      remain:remainingFun()
    };
       
    let countStatment = inputCount.value!==""?inputCount.value:+"1";
    let counter =countStatment
    if (style === "create") {
      for (let j = 0; j < counter; j++) {
        dataArr.push(obj);
                window.localStorage.setItem("data", JSON.stringify(dataArr));

      }
    
    } else {
      dataArr[x] = obj;
                      window.localStorage.setItem("data", JSON.stringify(dataArr));

      style = "create";
      inputCreate.value = "Create";
      inputCount.style.display = "block";
    }

    hideCrud();
  } else {
    alert("PLZ, Write Name,Product And Price At Least With Valid Data");
  }

  clearFun();
  showData();
  inputSearch.value=""
}
//when click on creat btn
inputCreate.addEventListener("click", createFun);

//when enter
crudForm.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    createFun();
  }
});


//for remain MONEY
function remainingFun(){
  if(+inputPrice.value> +inputPaid.value){
  return +(inputPrice.value) - +(inputPaid.value)
}else{
  return 0
}}
//create prouduct step two
function showData() {
  let html = "";
  for (let i = 0; i < dataArr.length; i++) {
    html += `
<tr>
          <td class="purple">${i + 1}</td>
          <td>${dataArr[i].namee}</td>
          <td>${dataArr[i].product}</td>
          <td>${dataArr[i].color}</td>
          <td>${dataArr[i].price}</td>
          <td>${dataArr[i].paid}</td>
          <td>${dataArr[i].remain}</td>
          <td onclick="deleteItem(${i})"class="del"><i class="fa-regular fa-trash-can" ></i>
          </td>
          <td onclick="update(${i})"class="edit"><i class="fa-solid fa-pen-to-square"></i>
            </td>
     
          </tr>


          `;
  }

  tableBody.innerHTML = html;

  showbtn();
}
showData();

//cleare inputs
function clearFun() {
  inputs.forEach((inp) => (inp.value = ""));
}

//for delete one item

function deleteItem(i) {
  dataArr.splice(i, 1);
  // localStorage data
  window.localStorage.data = JSON.stringify(dataArr);
   inputSearch.value=""
  showData();

}
// for show search , dell ALL
function showbtn() {
  if (dataArr.length > 0) {
    tablehead.classList.remove("hidden");
  } else {
    tablehead.classList.add("hidden");
  }

  if (dataArr.length > 1) {
    inputSearch.classList.remove("hidden");
    deleteall.classList.remove("hidden");
  } else {
    inputSearch.classList.add("hidden");

    deleteall.classList.add("hidden");
  }
}

// for delete all btn
deleteall.addEventListener("click", function () {
  window.localStorage.clear();
  dataArr = [];
  showData();
});
// forupdate btn

function update(i) {
  crudFun();
  inputName.focus();
  inputName.value = dataArr[i].namee;
  inputColor.value = dataArr[i].color;
  inputProduct.value = dataArr[i].product;
  inputPrice.value = dataArr[i].price;
  inputPaid.value = dataArr[i].paid;
  inputCount.style.display = "none";
  inputClear.style.display = "none";
  inputCreate.value = "Update";

  style = "update";
  x = i;
}

//for search function
function searchFun() {
  let html = "";

  for (let i = 0; i < dataArr.length; i++) {
    if (dataArr[i].namee.includes(inputSearch.value)) {
      html += `
        <tr>
          <td>${i + 1}</td>
          <td>${dataArr[i].namee}</td>
          <td>${dataArr[i].product}</td>
          <td>${dataArr[i].color}</td>
          <td>${dataArr[i].price}</td>
          <td>${dataArr[i].paid}</td>
          <td>${dataArr[i].remain}</td>
          <td onclick="deleteItem(${i})"class="del"><i class="fa-regular fa-trash-can" ></i>
          </td>
          <td onclick="update(${i})"class="edit"><i class="fa-solid fa-pen-to-square"></i>
            </td>
     
          </tr>

          `;

      tableBody.innerHTML = html;
    }
  }
}

inputSearch.addEventListener("keyup", searchFun);

//for clear btn
inputClear.addEventListener("click", function () {
  clearFun();
});

let caloreisItemsSave =
  JSON.parse(localStorage.getItem("caloreisItemsSave")) || [];

const addBtn = document.querySelector("#add-btn");
const goBack = document.querySelector("#go-back");
const caloriesList = document.querySelector(".calories-list");
const fooditemInput = document.querySelector("#item-add");
const caloriesInput = document.querySelector("#item-calories");
const updatBtn = document.querySelector("#update-btn");
const caloriesPlus = document.querySelector("#plus-value");

let totalCalories = 0;

const alertShow = (message) => {
  document.querySelector(".clear-alert").innerHTML = `
  <div class="bg-dark text-white p-2 alert-area">${message}</div>
  `;

  setTimeout(() => {
    document.querySelector(".clear-alert").innerHTML = "";
  }, 2000);
};

function caloriesPrinter() {
  caloriesList.innerHTML = "";
  totalCalories = 0;
  caloreisItemsSave.map(function (item, index) {
    totalCalories += Number(item.calories);
    caloriesList.innerHTML += `
    <li>
    <p>
    ${index + 1} / 
    <b>${item.food}</b> : ${item.calories} Calories </p>
    <p>
    <i onclick="editBtn(this,${index})" class="fa-solid fa-pen-to-square me-2"></i>
    <i onclick="deleteitem(this,${index})" class="fa fa-trash"></i>
    </p>
    </li>
    `;
  });
}
const addToCalories = (e) => {
  e.preventDefault();
  if (fooditemInput.value == "" || caloriesInput.value == "") {
    alertShow(`Please fill the field!`);
    return;
  }

  caloreisItemsSave.push({
    food: fooditemInput.value,
    calories: caloriesInput.value,
  });

  fooditemInput.value = "";
  caloriesInput.value = "";
  alertShow(`its Added!`);
  localStorage.setItem("caloreisItemsSave", JSON.stringify(caloreisItemsSave));
  caloriesPrinter();
};

const deleteitem = (e, id) => {
  e.parentElement.parentElement.remove();
  caloreisItemsSave.splice(id, 1);
  alertShow(`item Deleted!`);
  localStorage.removeItem("caloreisItemsSave");
  caloriesPlus.innerHTML = totalCalories.toLocaleString();
};

const editBtn = (e, id) => {
  fooditemInput.value = caloreisItemsSave[id].food;
  caloriesInput.value = caloreisItemsSave[id].calories;
  updatBtn.setAttribute("data-index", id);
  addBtn.classList.add("d-none");
  updatBtn.classList.remove("d-none");
  goBack.classList.remove("d-none");
  e.parentElement.parentElement.classList.add("bg-warning", id, 1);
};

// addEventListener

updatBtn.addEventListener("click", (e) => {
  const index = e.target.getAttribute("data-index");

  const caloreisSave = {
    food: fooditemInput.value,
    calories: caloriesInput.value,
  };

  caloreisItemsSave[index] = caloreisSave;
  addBtn.classList.remove("d-none");
  updatBtn.classList.add("d-none");
  goBack.classList.add("d-none");

  fooditemInput.value = "";
  caloriesInput.value = "";

  caloriesList.innerHTML = "";

  localStorage.setItem("caloreisItemsSave", JSON.stringify(caloreisItemsSave));

  alertShow(`Item Upadet!`);

  caloriesPrinter();
});

goBack.addEventListener("click", () => {
  alertShow(`Go Back!`);
});

document.querySelector("#add-btn").addEventListener("click", addToCalories);

document.querySelector(".btn-cleared").addEventListener("click", () => {
  caloreisItemsSave = [];
  caloriesList.innerHTML = "";
  localStorage.removeItem("caloreisItemsSave");
  alertShow(`its cleared ✔`);
});

caloriesPrinter();
caloriesPlus.innerHTML = totalCalories.toLocaleString();

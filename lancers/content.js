const startbutton = document.createElement("button");
startbutton.innerHTML = "開　始";
startbutton.style="width: 120px; height: 30px; position: fixed; top = 200px; left = 100px; z-index : 3;   border: none; text-align: center;  text-decoration: none;  display: inline-block;  font-size: 16px;  margin: 4px 2px;  transition-duration: 0.4s;  cursor: pointer;  background-color: white; color: black;  border: 2px solid #4CAF50;";startbutton.class="cw-button"
document.querySelector('p.p-search-talent__title').appendChild(startbutton);
startbutton.addEventListener('click', button_start);
// Select all buttons with the class "my-button"
const buttons = document.querySelectorAll("a.gtm-ts-new-message-button");
const storage = chrome.storage.local;
const employees = document.querySelectorAll("a.c-avatar__image-wrapper.js-search-talent__image")
let i = -1,firsty;
let qu = [];
// Iterate over the selected buttons and apply an action
let historydata = [];

buttons.forEach((button, index) => {
  // Perform an action on each button
  button.addEventListener("click", () => {

      setTimeout(() => {
     storage.get(['lancermessage','lancer_category'], function (items) {

        const category = JSON.parse(items.lancer_category);
        document.getElementById("ProjectStoreContactFormParentCategory").value = category['category'];
        document.getElementById("ProjectStoreContactFormParentCategory").dispatchEvent(new Event('change'));
        document.getElementById(`ProjectStoreContactFormCategoryId${category['category']}`).value = category['subcategory'];
        document.getElementById(`ProjectStoreContactFormCategoryId${category['category']}`).dispatchEvent(new Event('change'));
        document.getElementById("ProjectStoreContactFormBudget").value=category['estimate'];
        const [year, month, day] = category['date'].split("-");
        document.getElementById("ProjectStoreContactFormDeliveryTimeYear").value=year;
        document.getElementById("ProjectStoreContactFormDeliveryTimeMonth").value=month;
        document.getElementById("ProjectStoreContactFormDeliveryTimeDay").value=day;
        document.querySelector(`div[data-value=${category['business']}]`).click();
        const name = button.getAttribute('href').split('/')[2];
        if(historydata.includes(name) === true) {
          document.querySelector("button.c-modal__close.js-project-store-contact-modal-close").click();
          alert('こちらのワーカーにメッセージがすでに送信されました。');
          i=index+1;
        window.scrollTo(0, parseInt(qu[i].y)-firsty+600);
        url = employees[i].getAttribute("href");
        window.open(url, 'myname', 'left=1000,top=0,width=820,height=1000');
          return;
        }
        console.log(items.lancermessage);
        if(items.lancermessage) document.querySelector("textarea.js-project-store-contact-textarea").value = items.lancermessage.replace('{ワーカー名}',name);
        setTimeout(()=>{
          //  alert('sssss');
          document.getElementById('Finish').click();
        },1000);
        historydata.push(name);
        storage.set({ lancerdata: historydata});
         i=index+1;
        window.scrollTo(0, parseInt(qu[i].y)-firsty+600);
        url = employees[i].getAttribute("href");
        window.open(url, 'myname', 'left=1000,top=0,width=820,height=1000');
      });

    }, 2000);

  });
});


function init(){
    for (var j=0;j<employees.length;j++) qu.push(employees[j].getBoundingClientRect());
  
  storage.get('lancerdata', function (items) {
    if(items.lancerdata) historydata = items.lancerdata;
  });
}

init();
startbutton.addEventListener("mouseover", function() {
  startbutton.style.backgroundColor = "#4CAF50";
  startbutton.style.color = "white";
});

startbutton.addEventListener("mouseout", function() {
  startbutton.style.backgroundColor = "white";
  startbutton.style.color = "black";
});

function button_start() {
  // Get the current CSS snippet from the form.
    event.preventDefault();
    if(i===-1) {
      firsty = qu[0].y;
      startbutton.innerHTML = "次　へ";
    }
    i++;
    if(i>= employees.length) return;

    window.scrollTo(0, parseInt(qu[i].y)-firsty+600);
    url = employees[i].getAttribute("href");
    window.open(url, 'myname', 'left=1000,top=0,width=820,height=1000');
}
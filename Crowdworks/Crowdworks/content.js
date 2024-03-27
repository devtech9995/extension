const startbutton = document.createElement("button");
startbutton.innerHTML = "開　始";
startbutton.style="width: 120px; height: 30px; position: fixed; top = 200px; left = 100px; z-index : 3; border: none; text-align: center; text-decoration: none;  display: inline-block;  font-size: 16px;  margin: 4px 2px;  transition-duration: 0.4s;  cursor: pointer;  background-color: white; color: black;  border: 2px solid #4CAF50;";
startbutton.class="cw-button"
document.querySelector('ul.group_menu').appendChild(startbutton);
startbutton.addEventListener('click', start);
// Select all buttons with the class "my-button"
const buttons = document.querySelectorAll(".cw-button_action");
const storage = chrome.storage.local;
const employees = document.querySelectorAll("div.portrait.thumb_frame")
let i = -1,firsty;
let qu = [];
// Iterate over the selected buttons and apply an action
let historydata = [];
function captchar(name, index){
  iframe = document.querySelector('iframe[title="reCAPTCHA"]');
  fetch('http://localhost:5005/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({site_key: '6Lc6FCEUAAAAAN3iXAqEOpyyBSHmuG2hBisjNr1h', url: "https://crowdworks.jp"})
        })
        .then(response => response.json())
        .then(data => {
          console.log(`Response from recaptcha server ${JSON.stringify(data)}`);
          document.querySelector('textarea.g-recaptcha-response').innerHTML = data.g_response
          const nextbutton = document.querySelector('input[name="commit"]');
          nextbutton.click();
          var error_msg;
          setTimeout(() => {
            error_msg = document.querySelector("span.icon-warning-sign");
          
            if (error_msg !== null) {
              console.log("resolving...");
              document.querySelector('button.cw-close').click();
            // present_button.click();
            // captchar();
          } else{
              i=index+1;
              window.scrollTo(0, parseInt(qu[i].y)-firsty+500);
              url = employees[i].querySelector('a').getAttribute("href");
              window.open(url, 'myname', 'left=1000,top=0,width=920,height=1000');
              historydata.push(name);
              storage.set({ data: historydata});
          }
        }, 1000);
          
        })

        .catch(error => {
          console.error('Error:', error);
        });
}

buttons.forEach((button, index) => {
  // Perform an action on each button
  button.addEventListener("click", () => {
      setTimeout(() => {
      storage.get(['message','url'], function (items) {
        // To avoid checking items.css we could specify storage.get({css: ''}) to
        // return a default value of '' if there is no css value yet.
        const element = document.querySelector('textarea#message_body');
        const parentElement = button.parentNode.parentElement;
        const usernameElement = parentElement.querySelector('span.username');
        if(historydata.includes(usernameElement.textContent) === true) {
          alert('こちらのワーカーにメッセージがすでに送信されました。');
        }
        console.log(historydata);
        if (items.message) {
          element.value = items.message.replace('{URL}',items.url).replace('{ワーカー名}',usernameElement.textContent);
        }

         captchar(usernameElement.textContent, index);

      });

    }, 1000); 

  });
});


function init(){
  setTimeout(() => {
    for (var j=0;j<employees.length;j++) qu.push(employees[j].getBoundingClientRect());
  },500);
  storage.get('data', function (items) {
    if(items.data) historydata = items.data;
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

function start() {
  // Get the current CSS snippet from the form.
    if(i===-1) {
      firsty = qu[0].y;
    }
    i++;
    window.scrollTo(0, parseInt(qu[i].y)-firsty+500);
    url = employees[i].querySelector('a').getAttribute("href");
    window.open(url, 'myname', 'left=1000,top=0,width=920,height=1000');
    startbutton.innerHTML = "次　へ";
}
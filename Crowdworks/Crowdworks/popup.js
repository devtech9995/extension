const storage = chrome.storage.local;

const savebutton = document.querySelector('button#save');
const resetbutton = document.querySelector('button#reset');
const textarea = document.querySelector('textarea.w3-input');
const url = document.querySelector('input.w3-input');

loadChanges()

savebutton.addEventListener('click', saveChanges);
resetbutton.addEventListener('click', resetChanges);

async function saveChanges(event) {
  // Get the current CSS snippet from the form.
  event.preventDefault();
  const _message = textarea.value;
  const _url = url.value;
  // Check that there's some code there.
  
  if (!_message) {
    message('Error: No message specified');
    return;
  }
  // Save it using the Chrome extension storage API.
  await storage.set({ message: _message, url:_url});
  message('設定を保管しました。');
}

async function resetChanges(event) {
  event.preventDefault();
  await storage.remove('data');
  message('履歴が消去されました。');
  alert('F5キーを押してページを更新してください!');
}

function loadChanges() {
  storage.get(['message','url'], function (items) {
    // To avoid checking items.css we could specify storage.get({css: ''}) to
    // return a default value of '' if there is no css value yet.
    if (items.message) {
      textarea.value = items.message;
      message('メッセージを入力してください。');
    }
    if(items.url) {
      url.value = items.url;
    }
  });
}

let messageClearTimer;
function message(msg) {
  clearTimeout(messageClearTimer);
  const message = document.querySelector('.plus');
  message.innerText = msg;
  messageClearTimer = setTimeout(function () {
    message.innerText = '';
  }, 3000);
}

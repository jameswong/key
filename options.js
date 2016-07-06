function restoreOptions() {
  chrome.storage.sync.get(function (items) {
    items = items.options || {};
    var keys = Object.keys(items);
    if (keys.length) {
      for (var key in items) {
        var li = addOptions();
        li.getElementsByTagName('input')[0].value = key;
        li.getElementsByTagName('textarea')[0].value = items[key];
      }
    } else {
      addOptions();
    }
  })
}

function saveOptions() {
  var li = document.getElementsByTagName('li');
  var options = {};
  for (var i = 0; i < li.length; i++) {
    value = li[i];
    var site = value.getElementsByTagName('input')[0].value;
    var pass = value.getElementsByTagName('textarea')[0].value;
    if (site) {
      options[site] = pass;
    }
  }
  chrome.storage.sync.set({ options: options });
}

function addOptions() {
  var ul = document.getElementsByTagName('ul')[0];
  var li = document.createElement('li');
  li.innerHTML = '<input type="text" placeholder="site"><textarea rows="3" placeholder="pass"></textarea>';
  ul.appendChild(li);
  return li;
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('add').addEventListener('click', addOptions);

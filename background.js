function getCode(username, password) {
  return 'document.getElementsByName(\'username\')[0].value=\'' + username + '\'; ' +
    'document.getElementsByName(\'password\')[0].value=\'' + password + '\';';
}

chrome.commands.onCommand.addListener(function (command) {
  console.log(command);
  chrome.storage.sync.get(function (items) {
    var locations = items.options || {};
    chrome.tabs.getSelected(function (tab) {
      var url = tab.url;
      for (var location in locations) {
        if (url.indexOf(location) !== -1) {
          var value = locations[location];
          if (/https?:\/\//.test(value)) {
            chrome.tabs.update({ url: value });
          } else {
            value = value.split('\n')[0].trim().split(':');
            chrome.tabs.executeScript({
              code: getCode(value[0], value[1])
            });
          }
        }
      }
    });
  });
});

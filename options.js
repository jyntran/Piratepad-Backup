// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Trims Piratepad ID if a URL was pasted
function trimId(s) {
    if (s.indexOf("http://piratepad.net/") > -1) {
      var trunc = s.replace('http://piratepad.net/','')
      var id = document.getElementById('id');
      id.value = trunc;
	  return trunc;
    } else {
	  return s;
	}
}

// Saves options to chrome.storage
function save_options() {
  var idVal = trimId(document.getElementById('id').value);
  var formatVal = document.getElementById('format').value;
  chrome.storage.sync.set({
    id: idVal,
    format: formatVal
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1500);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
	id: '',
    format: 'html'
  }, function(items) {
    document.getElementById('id').value = items.id;
    document.getElementById('format').value = items.format;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
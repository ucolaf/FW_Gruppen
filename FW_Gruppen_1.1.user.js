// ==UserScript==
// @name        Standort Gruppenchat Freewar
// @namespace   Mordino
// @description Postet den aktuellen Standort im Gruppenchat
// @include     *.freewar.de/freewar/internal/*
// @downloadURL https://gist.github.com/ucolaf/b8198e41c1c13d1c5391dd0b9ab4c29e
// @version     1.2.2
// @grant       GM_getValue
// @grant       GM_setValue
// Changes: 1.2.2 Code optimize, URL http removed for work on https
// ==/UserScript==
//alert("test");
var frames = window.parent.frames;
var Tags = document.getElementsByClassName('mainheader');
for (var i = 0; i < Tags.length; i++) {
  var tag = Tags[i];
  var sendtext = tag.textContent;
  var sendtext = sendtext.trim();
}
var Tags = document.getElementsByClassName('listusersrow');
for (var i = 0; i < Tags.length; i++) {
  var tag = Tags[i];
  var sendtext2 = tag.textContent;
  var sendtext2 = sendtext2.trim();
  var npc = sendtext2.indexOf('(Gruppen-NPC)');
  if (npc != - 1) {
    var strleft = sendtext2.substring(0, npc);
    var frames = window.parent.frames;
    frames[3].document.getElementById('chat_text').value = strleft + ' (Gruppen-NPC)';
    GM_setValue('ct', '1');
  } 
  else {
    if (GM_getValue('ct') == '1') {
      clearChat();
    }
  }
  console.log(GM_getValue('ct') + npc);
}
var Tags = document.getElementsByClassName('personlistcaption');
for (var i = 0; i < Tags.length; i++) {
  var tag = Tags[i];
  var sendtext3 = tag.textContent;
  var sendtext3 = sendtext3.trim();
  var npc = sendtext3.indexOf('Du siehst keine Person an diesem Ort');
  if (npc != - 1) {
    if (GM_getValue('ct') == '1') {
      clearChat();
    }
  }
}
function clearChat() {
  var frames = window.parent.frames;
  frames[3].document.getElementById('chat_text').value = '';
  GM_setValue('ct', '0');
  // console.log('clearChat');
}
if (sendtext != null) {
  var input = frames[3].document.createElement('input');
  input.type = 'submit';
  input.name = 'group';
  input.className = 'input';
  input.value = 'Chat';
  input.onclick = sendChat;
  input.setAttribute('style', 'font-size:12px;position:absolute;top:20px;right:20px;');
  document.body.appendChild(input);
}
function sendChat() {
  var frames = window.parent.frames;
  //alert(frames[3].document.getElementById('group').value);
  frames[3].document.getElementById('chat_text').value = sendtext;
}

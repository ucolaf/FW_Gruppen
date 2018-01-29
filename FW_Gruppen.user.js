// ==UserScript==
// @name        Standort Gruppenchat Freewar
// @author      Mordino Mordas
// @namespace   Mordino
// @description Postet den aktuellen Standort im Gruppenchat
// @include     *.freewar.de/freewar/internal/main.php
// @version     1.2.4
// @downloadURL https://gist.github.com/ucolaf/b8198e41c1c13d1c5391dd0b9ab4c29e
// @updateURL   https://gist.github.com/ucolaf/b8198e41c1c13d1c5391dd0b9ab4c29e
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==
// Changes: 1.2.3 Code optimize, Firefox 57+ and Tamper Monkey ready, 1.2.4 only main.php, a little bit faster
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
    var npcname = strleft + ' (Gruppen-NPC)';
    var frames = window.parent.frames;
    // frames[3].document.getElementById('chat_text').value = strleft + ' (Gruppen-NPC)';
    GM_setValue('ct', '1');
  }
}

if (sendtext != null) {
  var input = frames[3].document.createElement('input');
  input.type = 'submit';
  input.name = 'group';
  input.className = 'input';
  input.value = 'Ort->Chat';
  input.onclick = sendChat;
  input.setAttribute('style', 'font-size:12px;position:absolute;top:20px;right:20px;');
  document.body.appendChild(input);
}
if (npcname != null) {
  var input = frames[3].document.createElement('input');
  input.type = 'submit';
  input.name = 'group';
  input.className = 'input';
  input.value = 'NPC->Chat';
  input.onclick = sendChat2;
  input.setAttribute('style', 'font-size:12px;position:absolute;top:40px;right:20px;');
  document.body.appendChild(input);
}
function sendChat() {
  var frames = window.parent.frames;
  //alert(frames[3].document.getElementById('group').value);
  frames[3].document.getElementById('chat_text').value = sendtext;
}
function sendChat2() {
  var frames = window.parent.frames;
  //alert(frames[3].document.getElementById('group').value);
  frames[3].document.getElementById('chat_text').value = npcname;
}
function clearChat() {
  var frames = window.parent.frames;
  frames[3].document.getElementById('chat_text').value = '';
  GM_setValue('ct', '0');
  // console.log('clearChat');
}

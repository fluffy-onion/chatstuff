'use strict';

console.log('Hello Dave.');

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      console.log('received!');
      if (isThere) {
        hideNav();
        isThere = false;
      } else {
        showNav();
        isThere = true;
      }
  }
);

var isThere = true;

var cachedData;
// getSavedUrls();
var observer = new MutationObserver(checkSticky);
var topObserver = new MutationObserver(addTopBar);
var thing = `<span id='mindmap'>
<a data-reactroot="" class="_48-k UFILikeLink" href="#" role="button" aria-label="Like this"
aria-live="polite" data-ft="{&quot;tn&quot;:&quot;>&quot;}">Map This!</a></span>`;
var chatBar = `<div id="chatBar" style="height: 3%; width: 100%; text-align:center; font-family:verdana; font-size:12px; position:static; background-color:white">
Well, Hello There I am adding a bunch of stuff to this text box
<button id="chatBarButton" class="chatBar" style="vertical-align:middle;float:right;">
Send
</button>
<input id="chatBarInput" class="chatBar" vertical-align="middle" align="right" type="text" style="float:right;"></input>
</div>`;

var testNav =
`<nav id="chatter" class="navbar navbar-default navbar-fixed-bottom" style="background-color:rgba(0,0,0,0); height:475px; font-family:verdana; font-size:12px">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <a class="navbar-brand" href="#">Chizzat</a>
    </div>
    <div id="firechat1"></div>
      <form class="navbar-form navbar-right" role="search">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search">
        </div>
        <button id="sendMessage" type="submit" class="btn btn-default">Submit</button>
        <button id='closebutton'>X</button>
      </form>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>`;

var firechatCSS = {
  "height": '475px',
  "position": 'relative',
  "max-width": '400px',
  "padding": '10px',
  "border": '1px solid #ccc',
  "background-color": '#fff',
  "margin": '50px auto',
  "text-align": 'center',
  "-webkit-border-radius": '4px',
  "-moz-border-radius": '4px',
  "border-radius": '4px',
  "-webkit-box-shadow":'0 5px 25px #666',
  "-moz-box-shadow": '0 5px 25px #666',
  "box-shadow": '0 5px 25px #666'
};

var fireChatNav = $(`<div id="firechat-wrapper"></div>`).css(firechatCSS);




$('body').find('.navbar-fixed-top').each(function(e){
  $(this).css('top','50px');
});
$('body').find('.nav-top').each(function(e){
  $(this).css('top','50px');
});
$('body').css('margin-top','50px');

$('body').prepend(testNav);
$('#firechat1').replaceWith(fireChatNav);






var chatRef = new Firebase("https://hackathon-chat1.firebaseio.com");
var chat = new FirechatUI(chatRef, document.getElementById("firechat-wrapper"));
chatRef.onAuth(function(authData) {
  if (authData) {
    chat.setUser(authData.uid, "Anonymous" + authData.uid.substr(10, 8));
  } else {
    chatRef.authAnonymously(function(error, authData) {
      if (error) {
        console.log(error);
      }
    });
  }
});

$('#submitButton').click(submitIt);
$('#closebutton').click(hideNav);

observer.observe(document.body, {childList: true});
topObserver.observe(document.getElementById('chatBar'), {childList: true});
// content.js

var chatter;

function submitIt(e) {
  e.preventDefault();
}

function showNav() {
  console.log('showing!');
  $('body').find('.navbar-fixed-top').each(function(e){
    if ($(this).find('#chatter').length !== 0) {
      return;
    } else {
      console.log('found something!');
      $(this).css('top','50px');
    }
  });
  $('body').find('.nav-top').each(function(e){
    if ($(this).find('#chatter').length !== 0) {
      return;
    } else {
      console.log('found something!');
      $(this).css('top','50px');
    }
  });
  console.log('moving the body down');
  $('body').css('margin-top','50px');
  console.log('showing chatbox');
  document.getElementById('chatter').style.display = 'inline';
  document.getElementById('chatter').style.top = '0px';
}

function hideNav() {
  $('#chatter').css('display','none');
  $('body').find('.navbar-fixed-top').each(function(e){
    if ($(this).attr('id') !== 'chatter'){
      $(this).css('top','0px');
    } else {
      return;
    }
  });
  $('body').find('.nav-top').each(function(e){
    if ($(this).attr('id') !== 'chatter'){
      $(this).css('top','0px');
    } else {
      return;
    }
  });
  $('body').css('margin-top','0px');
}

function addTopBar() {
  if ($('body').find('#chatBar').length === 0) {
    $('body').prepend(testNav);
  }
}


// function addButtons(mutations, observer) {
//
//   $('._42nr').each(function(){
//     var url = $(this).closest('.userContentWrapper').find('._52c6').attr('href');
//     if (url && $(this).find('#mindmap').length === 0) {
//       console.log(decodeURIComponent(stripIt(url)));
//       $(this).append(thing).click(saveArticle);
//       if (cachedData.indexOf(decodeURIComponent(stripIt(url))) !== -1) {
//         $(this).find('#mindmap').html('<b>Mizzapped!!</b>');
//       }
//     }
//   });
// }
//
// function saveArticle() {
//   var that = this;
//   $(this).find('#mindmap').html('<b>Mapping...</b>');
//   var rawUrl = $(this).closest('.userContentWrapper').find('._52c6').attr('href');
//   var url = (decodeURIComponent(stripIt(rawUrl)));
//   $.ajax({
//     type: 'POST',
//     url: 'http://localhost:3000/',
//     data: {
//       _url: url,
//       email: 'rico.moorer@gmail.com'
//     },
//     success: function(data) {
//       console.log(data);
//       $(that).find('#mindmap').html('<b>Mizzapped!!</b>');
//     }
//   });
// }
//
// function stripIt(urlString) {
//   var reg = new RegExp(/\?u=(.*?)&h/g);
//   return urlString.match(reg) ? urlString.match(reg)[0].replace(/\?u=/,'').replace(/\&h/,'') : urlString;
// }
//
// function getSavedUrls() {
//   $.ajax({
//     type: 'GET',
//     url: 'http://localhost:3000/getsavedurls',
//     success: function(data) {
//       cachedData = data.map(function(e) {
//         return e.url;
//       });
//       console.log(cachedData);
//     }
//   });
// }

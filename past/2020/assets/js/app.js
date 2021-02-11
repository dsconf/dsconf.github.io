/* Smooth scroll. */
if (typeof SmoothScroll !== 'undefined') {
  var scroll = new SmoothScroll('a[href*="#"]', {
    offset: function(anchor, toggle) {
      if (anchor.id === 'sponsors') {
        return 150;
      } else if (anchor.id.startsWith("time-")) {
        return 70;
      } else {
        return 30;
      }
    },
    updateURL: false,
    easing: 'easeInOutCubic',
    speed: 600,
	  speedAsDuration: true,
  });
}

// Hides "Read more" button of schedule items with less lines.
window.addEventListener('DOMContentLoaded', function() {
  var truncTexts = document.getElementsByClassName('section-schedule-item__right--text');
  for (var i = 0; i < truncTexts.length; i++) {
    if (truncTexts[i].clientHeight < 70) {
      var el = truncTexts[i].parentElement.getElementsByClassName('read-more')[0];
      el.style.display = 'none';
    }
  }
});

document.onclick = function(e) {
  if (e.target.className === 'collapse') {
    var parent = e.target.parentElement;
    var textEl = parent.getElementsByClassName('section-schedule-item__right--text')[0];
    var readMoreText = parent.getElementsByClassName('read-more')[0];
    textEl.style.maxHeight = '70px';
    e.target.style.display = 'none';
    readMoreText.style.display = 'inline-block';
  }

  // Expand schedule details
  if (e.target.className === 'read-more') {
    var trucTextEl = e.target.parentElement.getElementsByClassName('section-schedule-item__right--text')[0];
    trucTextEl.style.maxHeight = 'unset';
    e.target.style.display = 'none';
    var collapseEl = e.target.parentElement.getElementsByClassName('collapse')[0];
    collapseEl.style.display = 'inline-block';
  }

  // Handle navbar display on mobile
  if (e.target.className === 'nav-menu-icon') {
    document.getElementById('navbar-ul').style.display = 'block';
  }

  if (e.target.parentElement.className === 'navbar-ul--first' || e.target.className === 'navbar-ul--first') {
    document.getElementById('navbar-ul').style.display = 'none';
  }

  /* Close bottom bar. */
  if (e.target.className === 'sticky-signup-form--close' || e.target.parentElement.className === 'sticky-signup-form--close') {
    closeBottomBar();
  }
}

function closeBottomBar() {
  var footer = document.getElementById('footer');
  var elem = document.getElementById('mc_embed_signup');
  var position = 0;
  var intervals = setInterval(changePosition, 1);
  function changePosition() {
    if (position === 120) {
      clearInterval(intervals);
      elem.style.display = 'none';
      footer.style.padding = '0px';
    } else {
      position += 5;
      elem.style.transform = "translate(-50%, " + position + "px)";
      elem.style.webkitTransform = "translate(-50%, " + position + "px)";
    }
  }
}

// Add box-shadow to nav bar on scroll.
window.onscroll = function() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("navbar").classList.add('navbar-shadow');
  } else {
    document.getElementById("navbar").classList.remove('navbar-shadow');
  }
}

// Hide bottom tab upon submission.
var mcForm = document.getElementById('mc-embedded-subscribe-form');
var mcFormEl = document.getElementById('mc_embed_signup');
mcForm.addEventListener('submit', function(e) {
  closeBottomBar();
});


function myMove() {
  const HEART_1_POS = 150; //흰색 하트의 시작 높이값
  const HEART_2_POS = 420; //파랑색 하트의 시작 높이값
  var heart_1 = document.getElementById("heart_1");
  var heart_2 = document.getElementById("heart_2");
  var pos_1 = HEART_1_POS;
  var pos_2 = HEART_2_POS;
  var id = setInterval(frame, 8);
  function frame() {
    if (pos_1 == HEART_2_POS) {
      pos_1 = HEART_1_POS;
      pos_2 = HEART_2_POS;
    } else {
      pos_1++;
      pos_2--;
    }

    var x = $("#heart_2").position();
    heart_1.style.left = (x.left - 20) + "px";
    heart_1.style.top = pos_1 + 'px';
    heart_2.style.top = pos_2 + 'px';
  }
}

myMove();

function GATAGM(label, category, language) {
  ga('send', {
      'hitType':'event' ,
      'eventCategory' : category,
      'eventAction' : label,
      'eventValue' : language
    }
  );
}

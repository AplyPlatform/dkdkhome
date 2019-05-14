
function myMove() {
  const HEART_1_POS = 150; //흰색 하트의 시작 높이값
  const HEART_2_POS = 420; //파랑색 하트의 시작 높이값
  var heart_1 = document.getElementById("heart_1");
  var heart_2 = document.getElementById("heart_2");
  var pos_1 = HEART_1_POS;
  var pos_2 = HEART_2_POS;
  var id = setInterval(frame, 8);

  heart_1.style.left = "170px";

  function frame() {
    if (pos_1 == HEART_2_POS) {
      pos_1 = HEART_1_POS;
      pos_2 = HEART_2_POS;
    } else {
      pos_1++;
      pos_2--;
    }

    heart_1.style.top = pos_1 + 'px';
    heart_2.style.top = pos_2 + 'px';
  }
}

myMove();

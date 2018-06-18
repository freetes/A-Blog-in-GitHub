const animateTime = 400

function toggleList() {
  // 电脑端
  if(screen.width > 800){
    if($(".list").css('display') == 'none'){
      $(".markdown-body").animate({padding: '8px 1%', margin: '0 1% 0 0', width: '67%'}, animateTime)
      $(".list").toggle(animateTime)
    }
    else{
      $(".list").toggle(animateTime)
      $(".markdown-body").animate({padding: '8px 9%', margin: '0 1%', width: '80%'}, animateTime)
    }
  }
  else{
    $(".list").slideToggle(animateTime)
  }
}

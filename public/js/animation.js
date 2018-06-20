const animateTime = 300

function toggleList() {
  $("#blogName").attr("onclick", "")
  // 电脑端
  if(screen.width > 800){
    if($(".list").css('display') == 'none'){
      $(".markdown-body").animate({width: '67%', padding: '8px 1%', margin: '0 1% 0 0'}, animateTime).promise().done(()=>{
        $(".list").toggle(animateTime).promise().done(()=>{
          $("#blogName").attr("onclick", "toggleList()")
        })
      })
    }
    else{
      $(".list").toggle(animateTime).promise().done(function (){
        $(".markdown-body").animate({ width: '80%', padding: '8px 9%', margin: '0 1%'}, animateTime).promise().done(()=>{
          $("#blogName").attr("onclick", "toggleList()")
        })
      })
    }
  }
  // 手机端
  else{
    $(".list").slideToggle(animateTime).promise().done(()=>{
      $("#blogName").attr("onclick", "toggleList()")
    })
  }
}

const ANIMATION_TIME = 300

function toggleList (node) {
  $(node).removeAttr('onclick')
  // 电脑端
  if(screen.width > 960){
    if($('.list').css('display') == 'none'){
      $('.markdown-body').animate({width: '100%', padding: '20px 10px', margin: '0 10px'}, ANIMATION_TIME).promise().done(()=>{
        $('.list').toggle(ANIMATION_TIME).promise().done(()=>{
          $(node).attr('onclick', 'toggleList(this)')
        })
      })
    }
    else{
      $('.list').toggle(ANIMATION_TIME).promise().done(function (){
        $('.markdown-body').animate({ width: '70%', padding: '20px 14%', margin: '0 10px'}, ANIMATION_TIME).promise().done(()=>{
          $(node).attr('onclick', 'toggleList(this)')
        })
      })
    }
  }
  // 手机端
  else{
    $('.list').slideToggle(ANIMATION_TIME).done(()=>{
      $(node).attr('onclick', 'toggleList(this)')
    })
  }
}

// 节流函数
function debounce(idle, action){
  let last
  return function(){
    let ctx = this, args = arguments
    clearTimeout(last)
    last = setTimeout(function(){
      action.apply(ctx, args)
    }, idle)
  }
}

window.onscroll = debounce(100, function() {
  if( $(document).scrollTop() >= 200 )
    $('.tools').css({'display': 'block'})
  else
    $('.tools').css({'display': 'none'})
})

window.onhashchange = function () {
  if(decodeURIComponent(location.hash)){
    for(let item of $('.list').children()){
      if(item.id == decodeURIComponent(location.hash))
        return $(item).click()
    }
  }
}

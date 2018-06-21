const webConfigLink = './config/webConfig.json',
  artConfigLink = './config/artConfig.json'

// ajax(Promise version)
function ajaxPromise(method, url) {
  return new Promise((resolve, reject)=>{
    $.ajax({
      method: method || 'GET',
      url: url,
      success: res=>{
        resolve(res)
      },
      error: res=>{
        reject(res)
      }
    })
  })
}

function beginAnimation(node){
  $(node).css({'margin-top': '-20px'})
  return $(node).animate({'opacity': 1, 'margin-top': '0px'}, 500).promise().done()
}

function showArticle(node, info){
  $('.list').children().removeClass()
  $(node).addClass('selected')
  location.hash = node.id
  // 无缓存，调用ajax获取
  if(!sessionStorage.getItem(info.title)){
    const header = `
      <h2 class='title'>${info.title}</h4>
      <p class='subtitle'>${info.subtitle}</p>
      <p class='date'>${info.date}</p>
      ${info.tags}
    `
    $('.markdown-body').html(header)
    
    ajaxPromise('get', info.path).then(data=>{
      const html = `
        ${header}
        <div class='content'>
          ${marked(data)}
        </div>
      `
      sessionStorage.setItem(info.title, html)
      $('.markdown-body').html(html)
    })
  }
  // 直接获取缓存
  else{
    $('.markdown-body').html(sessionStorage.getItem(info.title))
  }
  $('html, body').animate({scrollTop: '0px'})
}

function getWebConfig() {
  return ajaxPromise('get', webConfigLink)
}

function getArtConfig() {
  return ajaxPromise('get', artConfigLink)
}

function createHeader(data) {
  document.title = `${data.title}-${data.subtitle}`
  $('#blogName').text(data.title)
  $('#subName').text(data.subtitle)
  $('#endWords').text(data.end)
}

function createArtList(data) {
  let articles = data.articles
  // 按时间排序
  articles.sort((a, b)=>new Date(b.date)-new Date(a.date))
  for(let item of articles){
    let li = document.createElement('li')
    let tagsSpan = ''
    for(let tag of item.tags){
      tagsSpan += `<span class='tag'>${tag}</span>`
    }
    item.tags = '<p>' + tagsSpan + '</p>'
    li.id = `#${item.title}`
    li.onclick = function () {
      showArticle(this, item)
    }

    li.innerHTML = `
      <p>
        <span class='title'>${item.title}</span>
        <span class='subtitle subtext'>${item.subtitle}</span>
      </p>
      ${item.tags}
    `
    $('.list').append(li)
  }
  // 根据URL#后的参数找到对应的文章并点击
  // 伪造搜索功能
  if(decodeURIComponent(location.hash)){
    for(let item of $('.list').children()){
      if(item.id == decodeURIComponent(location.hash))
        return $(item).click()
    }
  }
  $('.list').children().first().click()
}

function createHtml() {
  return new Promise(function (resolve, reject) {
    if(!sessionStorage.getItem('webInfo')){
      getWebConfig().then(res=>{
        // 保存网页信息缓存
        sessionStorage.setItem('webInfo', JSON.stringify(res))
        createHeader(res)
      })
    }
    else{
      createHeader(JSON.parse(sessionStorage.getItem('webInfo')))
    }
    if(!sessionStorage.getItem('artInfo')){
      getArtConfig().then(res=>{
        // 保存文章信息缓存
        sessionStorage.setItem('artInfo', JSON.stringify(res))
        createArtList(res)
      })
    }
    else{
      createArtList(JSON.parse(sessionStorage.getItem('artInfo')))
    }
    resolve()
  })
}

$(document).ready(()=>{
  createHtml().then(()=>{
    beginAnimation($('header')).then(()=>beginAnimation($('.list'))).then(()=>beginAnimation($('article'))).then(()=>beginAnimation($('footer')))
  })
})
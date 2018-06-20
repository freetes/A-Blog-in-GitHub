const webConfigLink = './config/webConfig.json',
      artConfigLink = './config/artConfig.json'

// ajax Promise version
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

function showArticle(node, info){
  $(".list").children().removeClass()
  $(node).addClass("selected")
  location.hash = node.id
  // 无缓存，调用ajax获取
  if(!localStorage.getItem(info.title)){
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
      localStorage.setItem(info.title, html)
      $('.markdown-body').html(html)
    })
  }
  // 直接获取缓存
  else{
    $('.markdown-body').html(localStorage.getItem(info.title))
  }
}

function getWebConfig() {
  return ajaxPromise('get', webConfigLink)
}

function getArtConfig() {
  return ajaxPromise('get', artConfigLink)
}

function createArtList(data) {
  let articles = data.articles
  // 按时间排序
  articles.sort((a, b)=>new Date(b.date)-new Date(a.date))
  for(let item of articles){
    let li = document.createElement("li")
    let tagsSpan = ''
    for(let tag of item.tags){
      tagsSpan += `<span class='tag'>${tag}</span>`
    }
    item.tags = "<p>" + tagsSpan + "</p>"
    li.id = `#${item.title}`
    li.onclick = function () {
      showArticle(this, item)
    }
    // <span class='date subtext'>写于${item.date}</span>
    // <p class='title'>${item.title}</p>

    li.innerHTML = `
      <p>
        <span class='title'>${item.title}</span>
        <span class='subtitle subtext'>${item.subtitle}</span>
      </p>
      ${item.tags}
    `
    $(".list").append(li)
  }
  // 根据URL#后的参数找到对应的文章并点击
  // 伪造搜索功能
  let hash = decodeURIComponent(location.hash).split('#')[1]
  if(decodeURIComponent(location.hash)){
    for(let item of $(".list").children()){
      if(item.id == decodeURIComponent(location.hash))
        return $(item).click()
    }
  }
  $(".list").children().first().click()
}

function createHtml() {
  if(!localStorage.getItem('title') || !localStorage.getItem('subtitle') || !localStorage.getItem('end')){
    getWebConfig().then(res=>{
      // 保存缓存
      localStorage.setItem('title', res.title)
      localStorage.setItem('subtitle', res.subtitle)
      localStorage.setItem('end', res.end)
      document.title = res.title
      $("#blogName").text(res.title)
      $("#subName").text(res.subtitle)
      $("#endWords").text(res.end)
    })
  }
  else{
    document.title = localStorage.getItem('title')
    $("#blogName").text(localStorage.getItem('title'))
    $("#subName").text(localStorage.getItem('subtitle'))
    $("#endWords").text(localStorage.getItem('end'))
  }
  getArtConfig().then(res=>{
    createArtList(res)
  })
}

$(document).ready(()=>{
  createHtml()
})
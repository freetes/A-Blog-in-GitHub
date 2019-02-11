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
  // 切换选择栏
  $('.list').children().removeClass()
  $(node).addClass('selected')

  // 切换地址
  location.hash = node.id

  // 无缓存，调用ajax获取
  if(!sessionStorage.getItem(info.title)){
    const header = `
      <h2 class='title' onclick='toggleList(this)'>${info.title}</h2>
      <p class='subtitle'>${info.subtitle}</p>
      <p class='date'>
        <img width='20px' height='20px' src='data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxwYXRoIGQ9Ik05NTUuOCwxMjcuNkg4MTAuNlY1Mi4zYzAtMTguOC0xNS4zLTM0LjItMzQuMi0zNC4ySDYzOS43Yy0xOC44LDAtMzQuMiwxNS4zLTM0LjIsMzQuMnY3NS40aC0yMDVWNTIuM2MwLTE4LjgtMTUuMy0zNC4yLTM0LjItMzQuMkgyMjkuN2MtMTguOCwwLTM0LjIsMTUuMy0zNC4yLDM0LjJ2NzUuNEg0NC4yQzI1LjMsMTI3LjYsMTAsMTQzLDEwLDE2MS44djc4NS45YzAsMTguOCwxNS4zLDM0LjIsMzQuMiwzNC4yaDQxNS41aDgwLjdoNDE1LjVjMTguOCwwLDM0LjItMTUuMywzNC4yLTM0LjJWNTg5Ljh2LTQyOEM5OTAsMTQzLDk3NC43LDEyNy42LDk1NS44LDEyNy42eiBNNjM5LjcsMTYxLjh2LTM0LjJWNTIuM2gxMzYuN2wwLDc1LjRsMCwzNC4ybDAsNTkuOGMwLDAsMCwwLDAsMEg2MzkuN1YxNjEuOHogTTIyOS43LDE2MS44di0zNC4yVjUyLjNoMTM2LjdsMCw3NS40bDAsMzQuMmwwLDU5LjhjMCwwLDAsMCwwLDBIMjI5LjdWMTYxLjh6IE00NC4yLDE2MS44aDE1MS40djU5LjhjMCwxOC44LDE1LjMsMzQuMiwzNC4yLDM0LjJoMTM2LjdjMTguOCwwLDM0LjItMTUuMywzNC4yLTM0LjJ2LTU5LjhoMjA1djU5LjhjMCwxOC44LDE1LjMsMzQuMiwzNC4yLDM0LjJoMTM2LjdjMTguOCwwLDM0LjItMTUuMywzNC4yLTM0LjJ2LTU5LjhoMTQ1LjJ2MjA1SDQ0LjJWMTYxLjh6IE05NTUuOCw5NDcuN0g1NDAuM2gtODAuN0g0NC4yVjQwMWg5MTEuN3YxODguOFY5NDcuN3oiIHN0eWxlPSJmaWxsOiNhOWI3YjciPjwvcGF0aD48cGF0aCBkPSJNMzUwLDUzNC4xbC01MS4zLDUxLjNjLTQuMyw0LjMtOS40LDYuNC0xNS41LDYuNGMtMTQuOCwwLTIyLjMtNy40LTIyLjMtMjIuM2MwLTYuMSwyLjEtMTEuMiw2LjQtMTUuNWw4Ny4xLTg3LjFjNS44LTUuOCwxMS44LTguOCwxNy45LTguOGMxNC44LDAsMjIuMyw3LjQsMjIuMywyMi4zdjQwMC45YzAsMTQuOC03LjQsMjIuMy0yMi4zLDIyLjNjLTE0LjksMC0yMi4zLTcuNC0yMi4zLTIyLjNMMzUwLDUzNC4xTDM1MCw1MzQuMXoiIHN0eWxlPSJmaWxsOiNhOWI3YjciPjwvcGF0aD48cGF0aCBkPSJNNjExLjUsNzAzLjFINTk1Yy0xNC45LDAtMjIuMy03LjQtMjIuMy0yMi4zYzAtMTQuOSw3LjQtMjIuMywyMi4zLTIyLjNoMjYuM0w2NTYsNTAyLjdINTA1LjljLTE0LjgsMC0yMi4zLTcuNC0yMi4zLTIyLjNzNy40LTIyLjMsMjIuMy0yMi4zaDE3OC4yYzE0LjYsMCwyMiw3LjIsMjIuMywyMS42YzAsMS4zLTAuMiwzLjItMC43LDUuNGwtMzguNSwxNzMuNWgxNi45YzE0LjgsMCwyMi4zLDcuNCwyMi4zLDIyLjNjMCwxNC44LTcuNCwyMi4zLTIyLjMsMjIuM2gtMjdsLTQwLjUsMTgyLjljLTIuNywxMS43LTkuOCwxNy41LTIxLjMsMTcuNWMtMTUuMSwwLTIyLjYtNy40LTIyLjYtMjIuM2MwLTIuMiwwLjEtMy45LDAuMy01LjFMNjExLjUsNzAzLjF6IiBzdHlsZT0iZmlsbDojYTliN2I3Ij48L3BhdGg+PC9nPjwvc3ZnPiAg'>
        ${info.date}
      </p>
      ${info.tags}
    `
    $('.markdown-body').html(header)
    
    // 获取文章数据
    ajaxPromise('get', info.path).then(data=>{
      const html = `
        ${header}
        <div class='content'>
          ${marked(data)}
        </div>
      `
      // 保存缓存
      sessionStorage.setItem(info.title, html)
      $('.markdown-body').html(html)
    })
  }

  // 直接获取缓存
  else{
    $('.markdown-body').html(sessionStorage.getItem(info.title))
  }
  $('html, body').css({scrollTop: '0px'})
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
    ajaxPromise('get', item.path).then(data=>{
      const html = `
        <h2 class='title' onclick='toggleList(this)'>${item.title}</h4>
        <p class='subtitle'>${item.subtitle}</p>
        <p class='date'>
          <img width='20px' height='20px' src='data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxwYXRoIGQ9Ik05NTUuOCwxMjcuNkg4MTAuNlY1Mi4zYzAtMTguOC0xNS4zLTM0LjItMzQuMi0zNC4ySDYzOS43Yy0xOC44LDAtMzQuMiwxNS4zLTM0LjIsMzQuMnY3NS40aC0yMDVWNTIuM2MwLTE4LjgtMTUuMy0zNC4yLTM0LjItMzQuMkgyMjkuN2MtMTguOCwwLTM0LjIsMTUuMy0zNC4yLDM0LjJ2NzUuNEg0NC4yQzI1LjMsMTI3LjYsMTAsMTQzLDEwLDE2MS44djc4NS45YzAsMTguOCwxNS4zLDM0LjIsMzQuMiwzNC4yaDQxNS41aDgwLjdoNDE1LjVjMTguOCwwLDM0LjItMTUuMywzNC4yLTM0LjJWNTg5Ljh2LTQyOEM5OTAsMTQzLDk3NC43LDEyNy42LDk1NS44LDEyNy42eiBNNjM5LjcsMTYxLjh2LTM0LjJWNTIuM2gxMzYuN2wwLDc1LjRsMCwzNC4ybDAsNTkuOGMwLDAsMCwwLDAsMEg2MzkuN1YxNjEuOHogTTIyOS43LDE2MS44di0zNC4yVjUyLjNoMTM2LjdsMCw3NS40bDAsMzQuMmwwLDU5LjhjMCwwLDAsMCwwLDBIMjI5LjdWMTYxLjh6IE00NC4yLDE2MS44aDE1MS40djU5LjhjMCwxOC44LDE1LjMsMzQuMiwzNC4yLDM0LjJoMTM2LjdjMTguOCwwLDM0LjItMTUuMywzNC4yLTM0LjJ2LTU5LjhoMjA1djU5LjhjMCwxOC44LDE1LjMsMzQuMiwzNC4yLDM0LjJoMTM2LjdjMTguOCwwLDM0LjItMTUuMywzNC4yLTM0LjJ2LTU5LjhoMTQ1LjJ2MjA1SDQ0LjJWMTYxLjh6IE05NTUuOCw5NDcuN0g1NDAuM2gtODAuN0g0NC4yVjQwMWg5MTEuN3YxODguOFY5NDcuN3oiIHN0eWxlPSJmaWxsOiNhOWI3YjciPjwvcGF0aD48cGF0aCBkPSJNMzUwLDUzNC4xbC01MS4zLDUxLjNjLTQuMyw0LjMtOS40LDYuNC0xNS41LDYuNGMtMTQuOCwwLTIyLjMtNy40LTIyLjMtMjIuM2MwLTYuMSwyLjEtMTEuMiw2LjQtMTUuNWw4Ny4xLTg3LjFjNS44LTUuOCwxMS44LTguOCwxNy45LTguOGMxNC44LDAsMjIuMyw3LjQsMjIuMywyMi4zdjQwMC45YzAsMTQuOC03LjQsMjIuMy0yMi4zLDIyLjNjLTE0LjksMC0yMi4zLTcuNC0yMi4zLTIyLjNMMzUwLDUzNC4xTDM1MCw1MzQuMXoiIHN0eWxlPSJmaWxsOiNhOWI3YjciPjwvcGF0aD48cGF0aCBkPSJNNjExLjUsNzAzLjFINTk1Yy0xNC45LDAtMjIuMy03LjQtMjIuMy0yMi4zYzAtMTQuOSw3LjQtMjIuMywyMi4zLTIyLjNoMjYuM0w2NTYsNTAyLjdINTA1LjljLTE0LjgsMC0yMi4zLTcuNC0yMi4zLTIyLjNzNy40LTIyLjMsMjIuMy0yMi4zaDE3OC4yYzE0LjYsMCwyMiw3LjIsMjIuMywyMS42YzAsMS4zLTAuMiwzLjItMC43LDUuNGwtMzguNSwxNzMuNWgxNi45YzE0LjgsMCwyMi4zLDcuNCwyMi4zLDIyLjNjMCwxNC44LTcuNCwyMi4zLTIyLjMsMjIuM2gtMjdsLTQwLjUsMTgyLjljLTIuNywxMS43LTkuOCwxNy41LTIxLjMsMTcuNWMtMTUuMSwwLTIyLjYtNy40LTIyLjYtMjIuM2MwLTIuMiwwLjEtMy45LDAuMy01LjFMNjExLjUsNzAzLjF6IiBzdHlsZT0iZmlsbDojYTliN2I3Ij48L3BhdGg+PC9nPjwvc3ZnPiAg'>
          ${item.date}
        </p>
        ${item.tags}
        <div class='content'>
          ${marked(data)}
        </div>
      `
      sessionStorage.setItem(item.title, html)
    })
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
    beginAnimation($('header')).then(()=>
    beginAnimation($('.list'))).then(()=>
    beginAnimation($('article'))).then(()=>
    beginAnimation($('footer')))
  })
})
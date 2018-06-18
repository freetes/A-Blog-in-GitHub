const configLink = 'https://freetes.github.io/My-Blog-in-GitHub/config.json'

function showArticle(info){
  // 无缓存，调用ajax获取
  if(!localStorage.getItem(info.title)){
    const header = `
      <h2 class='title'>${info.title}</h4>
      <p class='subtitle'>${info.subtitle}</p>
      <p class='date'>${info.date}</p>
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

function createHtml(data) {
  document.title = data.name
  $("#blogName").text(data.name)
  $("#subName").text(data.subname)
  $("#endWords").text(data.end)
  data.articles.sort((a, b)=>new Date(b.date)-new Date(a.date))
  for(let item of data.articles){
    let li = document.createElement("li")
    li.className = 'list-group-item'
    li.onclick = function () {
      showArticle(item)
    }
    li.innerHTML = `
      <p class='title'>${item.title}</p>
      <span class='subtitle subtext'>${item.subtitle}</span>
      <span class='date subtext'>写于${item.date}</span>
    `
    $(".list").append(li)
  }
  $(".list").children().first().click()
}

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

ajaxPromise('get', configLink).then(res=>{
  createHtml(res)
})

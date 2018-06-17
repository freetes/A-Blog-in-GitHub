/*
  

*/
function showArticle(info){
  $('.entry-content').html(`    
    <h1 class='text-center'>${info.title}</h1>
    <p class='text-center'>${info.subtitle}</p>
    <p class='text-right'>${info.date}</p>
  `)
  
  $.get(info.path, data=>{
    const html = `
      <h1 class='text-center'>${info.title}</h1>
      <p class='text-center'>${info.subtitle}</p>
      <p class='text-right'>${info.date}</p>
      <div class='content'>
        ${markdown.toHTML(data)}
      </div>
    `
    $('.entry-content').html(html)
  })
}
const fs = require('fs')
const readline = require('readline')
const path = require('path')

let artConfig

//创建readline接口实例
var rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
})

function readDirPromise(url) {
  return new Promise((resolve, reject)=>{
    fs.readdir(url, (err, files)=>{
      if(err) return reject(err)
      resolve(files)
    })
  })
}

function readFilePromise(url) {
  return new Promise((resolve, reject)=>{
    fs.readFile(url, {encoding: 'utf-8'}, (err, data)=>{
      if(err) return reject(err)
      resolve(data)
    })
  })
}

function getFileStat(url) {
  return new Promise((resolve, reject)=>{
    fs.stat(url, (err, data)=>{
      if(err) return reject(err)
      resolve(data)
    })
  })
}

function addArticles(files) {
  if(files.length==0) {
    rl.close()
    updateConfig(artConfig)
    return 
  }
  let item = files.pop()
  console.log('现在请输入 '+item.path+' 的信息：')
  rl.question('文章标题是：', function(answer){
    item.title = answer
    rl.question('文章副标题是：', function(answer){
      item.subtitle = answer
      rl.question('标签有（中间用空格隔开）：', function(answer){
        item.tags = answer.split(' ')
        console.log('录入 '+item.path+' 完成！')
        artConfig.articles.push(item)
        addArticles(files)
      })
    })
  })
}

function updateConfig() {
  fs.writeFile(path.join(__dirname, '../config/artConfig.json'), JSON.stringify(artConfig, null, space=2), (err)=>{
    if(err) console.log(err)
    process.exit()
  })
}

readFilePromise(path.join(__dirname, '../config/artConfig.json')).then(json=>{
  artConfig = JSON.parse(json)
  return readDirPromise(path.join(__dirname, '../articles'))
}).then(files=>{
  let articles = []
  for(let file of files){
    getFileStat(path.join(__dirname, '../articles/', file)).then(time=>{
      let date = new Date(time.birthtime)
      date = date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
      articles.push({
        path: './articles/' + file,
        date
      })
      // 读取完毕
      if(articles.length == files.length){
        let notAdded = []
        for(let item of articles){
          // 找到尚未更新的文章
          if(!artConfig.articles.filter((element, index, array)=>element.path == item.path).length){
            notAdded.push(item)
          }
        }
        if(notAdded.length == 0){
          console.log('无新文章！')
          process.exit()
        }
        addArticles(notAdded)
      }
    })
  }
})

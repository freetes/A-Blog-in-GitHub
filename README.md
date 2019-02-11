# A Blog in GitHub

## 特色

* 搭建起来简单且快捷；
* **markdown**写作；
* 部署于**Github-Pages**

## 环境搭建

1. 按需修改配置文件
    ```json
    webConfig.json //博客信息配置
    {
      "title": "你的个人博客", // 博客标题
      "subtitle": "",         // 座右铭
      "end": "Hello,world"    // 最后的一段话
    }
    ```
    <!-- ```json
    artConfig.json 文章信息配置
    {
      "articles": [
        {
          "path": "./articles/about-site.md", // 文章路径
          "title": "关于本站",                 // 文章标题
          "subtitle": "",                     // 文章副标题
          "date": "2018/6/17 13:02",          // 写作时间
          "tags": ["原创", "生活"]             // 文章标签
        },
        ...
      ],
      "tags": [""]  // 未来功能，用于伪造搜索
    }
    ``` -->
2. 在GitHub上新建**github-pages**的仓库，并上传此项目；
3. 浏览器打开 **username.github.io**；
4. 环境搭建完成，这是一个属于你的博客！

## 新增文章

1. 在 **articles文件夹** 里新建 **以.md结尾的markdown文件** ;
2. 开始写作~
3. 打开控制台，输入`npm run add`按提示进行添加文章；
4. 使用 **git push** 更新远程仓库里的文件。

## 本地预览

1. 在当前文件夹下打开控制台，输入`npm i`安装环境；
2. 安装完成后，再输入`npm start`运行本地服务器；
3. 在浏览器里进入 [本地网站 http://localhost:3000](http://localhost:3000)

## 未来计划

* 标签分类功能
* 多端页面适应
* 本地写作（石墨SDK）

## 成功案例

* [作者的个人博客](https://freetes.github.io/)

#### [反馈与建议](https://github.com/freetes/A-Blog-in-GitHub/issues/new)

### Good luck

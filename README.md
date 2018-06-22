# A Blog in GitHub

## 特色

* 简便快速的部署
* 无需购买服务器
* markdown写作

## 环境搭建

1. 安装 **[git](https://git-scm.com/downloads)**
2. 建议安装 **[vscode](https://code.visualstudio.com/)**
3. **[下载项目压缩包](https://github.com/freetes/A-Blog-in-GitHub/archive/master.zip)** 到本地并解压
4. 文件夹目录如下
   
   ![目录信息](./public/img/directory.png)
5. 按需修改配置文件
    ```json
    webConfig.json 博客信息配置
    {
      "title": "你的个人博客", // 博客标题
      "subtitle": "",         // 座右铭
      "end": "Hello,world"    // 最后的一段话
    }
    ```
    ```json
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
    ```
6. 在GitHub上新建名称为 **用户名.github.io** 的仓库
7. 使用 **git** 将全部文件 **push** 到刚刚创建的仓库
8. 浏览器打开 **你的用户名.github.io**
9. 环境搭建完成！这是一个属于你的博客！

## 新增文章

1. 在 **articles文件夹** 里新建 **以.md结尾的markdown文件** ([关于markdown的语法](https://freetes.github.io/#Markdown语法))
2. 写你想写的
3. 写完之后，打开控制台，输入`npm run add`进行添加文章
4. 使用 **git push** 更新远程仓库里的文件 

## 本地预览

1. 在当前文件夹下打开控制台，直接输入`npm i`安装express（需先安装node环境）
2. 安装完成后，再输入`npm start`打开本地服务器
3. 在浏览器里进入 [本地网站 http://localhost:3000](http://localhost:3000)
4. 本地服务器搭建完成！

## 未来计划

* 用react/vue重构
* 增加若干功能，例如：
  1. 文章的标签分类
  2. 更换主题功能
  3. 完善更多细节
  4. 等等

## 成功案例

* [作者的个人博客](https://freetes.github.io/)

#### [反馈与建议](https://github.com/freetes/A-Blog-in-GitHub/issues/new)

### Good luck

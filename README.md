# A Blog in GitHub

## 特色

* 简便快速的部署
* 无需购买服务器
* markdown写作

## 适合人群

* 有一定的编程基础
* 有一定的动手能力

## 环境搭建

1. 安装 **[git](https://git-scm.com/downloads)**
2. 建议安装 **[vscode](https://code.visualstudio.com/)**，用于写文章
3. [直接下载](https://github.com/freetes/A-Blog-in-GitHub/archive/master.zip)项目压缩包到本地并解压
4. 打开文件夹里的config.json文件，其标准如下
    ```javascript
    {
      "name": "你的个人博客", /* 博客标题 */
      "subname": "",  /* 座右铭 */
      "articles": [ /* 文章 */
        {
          "path": "./articles/about-site.md", /* 文章路径 */
          "title": "关于",  /* 文章标题 */
          "subtitle": "", /* 文章副标题 */
          "date": "2018/6/17 13:02" /* 上传时间 */
        },
        ...
      ],
      "end": "Hello,world" /* 最后的一段话 */
    }
    ```
5. **使用 git push** 到自己的GitHub
6. 在仓库设置页打开 **GitHub Pages**

## 新增文章

1. 在 **articles文件夹** 里新建**以.md结尾的markdown文件**([关于markdown的语法](https://www.appinn.com/markdown/))
2. 写你想写的
3. 在 **config.json** 里配置新增文章的信息
4. 使用 **git** 将修改后的项目 **push** 到自己的GitHub

## 未来计划

* 用react/vue重构
* 增加若干功能，例如：
  1. 更换主题
  2. 完善更多细节
  3. 等等

## 成功案例

* [作者的个人博客](https://freetes.github.io/My-Blog-in-GitHub/)

#### [反馈与建议](https://github.com/freetes/A-Blog-in-GitHub/issues/new)

### Good luck

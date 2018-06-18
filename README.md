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
2. 建议安装 **[vscode](https://code.visualstudio.com/)**

## 部署步骤
1. **直接下载**或**使用git克隆**此[仓库](https://github.com/freetes/A-Blog-in-GitHub)到本地
2. 配置属于自己的config.json文件
    ```
    {
      "name": "你的个人博客", // 博客标题
      "articles": [
        {
          "path": "./articles/about-site.md", // 文章路径
          "title": "关于",  // 文章标题
          "subtitle": "",   // 文章副标题
          "date": "2018/6/17 13:02" // 上传时间
        },
        ...
      ]
    }
    ```
3. 在articles文件夹里新增以.md结尾的markdown文件([关于markdown的语法](https://www.appinn.com/markdown/))，并写作
4. 在config.json里配置新增文章的信息
5. **使用 git push** 到自己的GitHub

## 未来计划
* 用react/vue重构
* 增加若干功能，例如：
  1. 更换主题
  2. 评论功能
  3. 等等

## [反馈与建议](https://github.com/freetes/A-Blog-in-GitHub/issues/new)

# Good luck!

# lehe-music

> 基于vue全家桶实现的web音乐app

基于 Vue(2.5) + vuex + vue-router + vue-axios +better-scroll + stylus + ES6 等开发一款移动端音乐 WebApp，UI 界面参考了安卓版的网易云音乐和网上的一些开源项目、flex 布局适配常见移动端。



## 技术栈

### 前端

 +	Vue：用于构建用户界面的 MVVM 框架
 +      Vuex：组件间公共数据状态管理
 +	vue-router：为单页面应用提供的路由系统
 +	vue-lazyload ：实现图片懒加载，节省用户流量，优化页面加载速度
 +	stylus：css 预编译处理器
 +	better-scroll：一款重点解决移动端（已支持 PC）各种滚动场景需求的插件 
 +	ES6：ECMAScript 新一代语法，模块化、解构赋值、Promise、Class 等方法非常好用
 +	fastclick:  解决移动端点击事件300ms延迟的问题
 +	mint-ui:  基于vue .js的移动端UI框架 ,播放器的轮播图，搜索，歌曲进度条使用的mint ui

### 后端

 +	vue-axios：用来请求后端 API 音乐数据
 +	NeteaseCloudMusicApi：网易云音乐 NodeJS 版 API，提供音乐数据

### 相关工具

+ vue-cli：Vue 脚手架工具，快速初始化项目代码
+ font-awesome:  字体图标库



## 实现功能

播放器内核，推荐页面，热门歌手页面，歌曲排行榜页面，搜索页面，歌单详情页，歌手详情页，排行榜详情页，用户播放历史和喜爱歌曲收藏页面，当前播放歌曲列表和列表歌曲增删，搜索历史列表和历史列表增删



### 推荐页面

推荐页分成三个部分，分别是 banner 轮播图、相关歌单推荐，mv推荐，数据都是使用 axios 请求 API 获取得到的，图片都使用 vue-lazyload 实现懒加载。

轮播图：使用 mint-ui 的slider组件。在使用的时候必须设置固定高度设置slider的高度，这里我为了是页面布局适应设备，采用监听img的加载事件，动态设置slider的高度

推荐歌单：flex布局。使用 vuex 管理数据，方便组件之间的数据交互（播放器播放歌曲）。

### 排行榜页面

同样是通过 API 获取到排行榜的数据，但是因为 API 获取到的是排行榜中所有歌曲的数据，所以难免在加载速度上有点慢，后期再看能不能优化一下，加载的慢毕竟太影响用户体验了，别的就没什么了。

### 歌手页面

这个页面亮点就是实现歌手列表的左右联动

### 歌曲列表组件

用来显示歌曲列表，在很多的地方都进行了复用，例如：歌单详情页、排行榜详情页、歌手详情页。我这里其实抽象两个歌曲列表组件，在项目中期抽象考虑不是非常周全，导致前面的详情页使用了一个抽象的基础组件，后面的当前播放列表，搜索历史记录，播放历史记录，喜爱歌曲由重新抽象了一个



### 歌单详情页

通过歌单的 ID 来获取歌单中的歌曲数据，然后还做了一些体验上面的交互，随着歌单向上滚动，播放按钮组件隐藏，歌单列表随着向上滚动动态上移动拉升，直到页面头部固定，向下滚动又组件还原

然后就是复用 歌曲列表组建 来显示歌曲。



### 排行榜详情、歌手详情，

和歌单详情基本上没有什么区别，除了 UI 界面方面有细微的改动（根据不同的内容作出不同的优化）。



### 播放器

整个项目最核心的组件

实现功能：切换歌曲播放模式、收藏歌曲，歌曲播放进度控制，歌曲前后控制，歌词展示等。

播放、暂停使用 HTML5 的 audio 实现。

数据、播放状态、播放历史、习惯歌曲等方面使用了 vuex 来进行管理

图标使用 font-awesome图标库，中间的唱片旋转动画使用了 animation 实现。

歌词部分获取到网易的歌词数据，使用js解析成固定格式，利用audio播放时的事件。实现显示歌词、拖动进度条歌词同步滚动。

通过 localstorage 存储喜欢歌曲、播放历史数据。



### 播放列表

显示和管理当前播放歌曲，可以用来删除列表中的歌曲、以及选择播放歌曲。



### 搜索功能

实现功能：搜索歌手、歌曲、热门搜索、数据节流、上拉刷新、保存搜索记录。

通过关键字请求 API 获取搜索数据，显示歌手、歌曲。

实现了上刷新，因为搜索可以设置请求数据的条数，所以可以用来实现上刷新的功能。

通过节流函数实现数据节流，通过 localstorage 存储搜索数据。



### 用户中心

将在本地存储的数据显示出来，方便用户使用，后期准备添加更多功能。



## 感谢

感谢 Binaryify 对接口文档 NeteaseCloudMusicApi 的不断维护与更新

感谢 caijinyc开源项目提供的参考





## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).








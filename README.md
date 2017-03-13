## 只求极致

[ **M** ] arkdown + E [ **ditor** ] = **Mditor** 

Mditor 是一个简单、自由、舒服的 Markdown 编辑软件，除常规的编辑功能，Mditor 还支持「多文件编辑、表格、列表自动完成、导出 HTML/PDF/Image」等功能。

![image](http://mditor.com/assets/screen-shot.png)  

## 简单说明

Mditor 目前有两个版本
- 可嵌入到任意 Web 应用的 Embed 版本，这是一桌面版的基础，Repo: [https://github.com/houfeng/mditor](https://github.com/Houfeng/mditor) 
- 独立的桌面版本，目前仅有 Mac 版本，主页：[http://mditor.com](http://mditor.com)  


## 如何参与
- 如果有任何问题或建议，可以直接发起 [Issue](https://github.com/Houfeng/mditor-desktop/issues)
- 当然，你也可以直接向 Mditor 发起 [Pull Request](https://github.com/Houfeng/mditor-desktop/pulls)
- 我们也很高兴，直接给 Mditor 加一个 Star，一来收藏，二来表示对 Midior 鼓励，它会变成动力。

## 构建 Mditor 桌面版

##### Clone 源码
```sh
$ git clone git@github.com:Houfeng/mditor-desktop.git your_path
```

##### 安装依赖
前提是需要安装好 Nodejs 和 npm（建议用 cnpm 可以通过国内镜象加速）
```sh
$ npm i
```

##### 启动自动构建
```sh
$ npm run dev
```

##### 运行程序
```sh
$ npm start
```
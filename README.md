# smartflow

> 简易工作流程图组件，可用于树状结构或者组织架构等类似的展示，关键字：javascript、SVG

作者：darker.wang&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
日期：2020年12月9日

## 一、如何使用
- 1、克隆下载smartflow.js通过script标签引入项目
- 2、新建一个SmartFlow对象设置其数据以及调用show方法
```
//获取DIV展示容器
var obj = document.getElementById("demoId");
//新建一个工作流对象
var sm = new SmartFlow(obj);
//设置其数据结构
sm.setNodes(data);
//设置展示维度，默认水平展示
//sm.setDirection("vertical");
//点击事件监听
sm.onClick(function(status,svg,node){
	console.log("点击了:title="+node.title);
});
sm.show();
```

## 二、使用案例
[案例展示](https://localhost)
[代码下载](https://github.com/godbirds/smartflow.git)

## 三、关于拓展
下载smartflow.js文件后，代码内有拓展注释。

## 四、友情推广
- [阿里云的服务器](https://www.aliyun.com/minisite/goods?taskCode=pintuan20201212&recordId=298718&userCode=b2yi9nin)
- [阿里云新人福利](https://www.aliyun.com/1111/new?userCode=b2yi9nin)

## 五、有用就打个赏吧
![赞赏](https://upload-images.jianshu.io/upload_images/9599406-dbbf508da73177b3.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

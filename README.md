# smartflow

> 简易工作流程图组件，可用于树状结构或者组织架构等类似的展示，关键字：javascript、SVG

作者：darker.wang&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
日期：2020年12月9日

## 一、如何使用
- 1、克隆下载smartflow.js通过script标签引入项目
- 2、新建一个SmartFlow对象设置其数据以及调用show方法
- 3、使用案例参考[演示地址](http://www.motry.net/smartflow)中的Demo
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
- 3、支持状态主题，由节点中status属性决定

| 状态 | 描述 |
| :-----| :---- |
| default | 默认 |
| active | 活动 |
| success | 成功 |
| fail | 失败 |
| warning | 警告 |
| forbidden | 禁用 |

## 二、使用案例
- [演示地址](http://www.motry.net/smartflow)
- [代码下载](https://github.com/godbirds/smartflow.git)

## 三、关于拓展
下载smartflow.js文件后，代码内有拓展注释。自定义更改更新等一看注释都明白！

## 四、友情推广
- [阿里云的服务器](https://www.aliyun.com/minisite/goods?taskCode=pintuan20201212&recordId=298718&userCode=b2yi9nin)
- [阿里云新人福利](https://www.aliyun.com/1111/new?userCode=b2yi9nin)

## 五、有用就点个Star吧
![赞赏](https://images.gitee.com/uploads/images/2020/1212/182216_ab43082a_1506477.jpeg "zanshang_20201211155826.jpg")

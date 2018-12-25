/**
 * @author: LYLG_zkx
 * @Email: 347487522@qq.com
 * @date: 2018/6/13 16:17
 * @IDE: WebStorm
 */


/** IE8*************************  获取/设置 元素  **********************兼容 */

/**1
 * 兼容IE--获取元素文本
 * @param ele 元素
 * @return {*}  文本
 */
function getText(ele) {
    //能力检测
    if (ele.textContent) {//IE8浏览器  如果textContent可以获取则使用textContent
        return ele.textContent;
    } else {//如果textContent不能获取，就是用innerText
        return ele.innerText;
    }
    ;
};

/**2
 * 兼容IE--设置元素文本
 * @param ele 元素
 * @param text 要修改的文本
 * @return {*}  文本
 */

function setText(ele, text) {
    //能力检测
    if (ele.textContent) {//IE8浏览器  如果textContent可以获取则使用textContent
        ele.textContent = text;
    } else {//如果textContent不能获取，就是用innerText
        ele.innerText = text;
    }
    ;
};


/**3
 * 兼容IE--获取上一个元素节点
 * @param e 节点
 * @returns {*} 上一个子元素
 */
function getPreviousElementSibling(e) {
    if (e.previousElementSibling) {     //谷歌浏览器
        return e.previousElementSibling;
    } else { //IE8
        var node = e.previousSibling;
        while (node != null && node.nodeType != 1) {    //只要上一个还有节点,并且不是元素节点(nodeType != 1)
            node = node.previousSibling;    //继续向上寻找
        }
        return node;
    }
}

/**4
 * 兼容封装--获取下一个元素节点
 * @param e 节点
 * @returns {*} 下一个子元素
 */
function getNextElementSibling(e) {
    if (e.nextElementSibling) {      //谷歌浏览器
        return e.nextElementSibling;
    } else {    //IE8
        var node = e.nextSibling;
        while (node != null && node.nodeType != 1) {
            node = node.nextSibling;
        }
        return node;
    }
}

/**5
 * 兼容封装--获取第一个子元素
 * @param e 父节点
 * @returns {*} 第一个子元素
 */
function getFirstElementChild(e) {
    if (e.firstElementChild) {  //谷歌
        return e.firstElementChild;
    } else { //IE8
        var node = e.firstChild;
        while (node != null && node.nodeType != 1) {
            node = node.nextSibling;    //向下寻找到第一个元素
        }
        return node;
    }
}

/**6
 * 兼容封装--获取最后一个子元素
 * @param e 父节点
 * @returns {*} 最后个子元素
 */
function getLastElementChild(e) {
    if (e.firstElementChild) {  //谷歌
        return e.firstElementChild;
    } else {    //IE8
        var node = e.lastChild;
        while (node != null && node.nodeType != 1) {
            node = node.previousSibling;    //向上寻找
        }
        return node;
    }
}

/**7
 * 兼容封装--获取元素属性
 * @param e         元素
 * @param attribute 属性名字符串
 * @return 属性值
 */
function getStyle(e, attribute) {
    if (window.getComputedStyle) {
        //字符串,不能使用点语
        return window.getComputedStyle(e, null)[attribute];
    } else {    //IE8
        return e.currentSyle[attribute];
    }
}

/** IE8****拖拽**** scrollLeft/Right | clientWitdh/Height | pageX/Y  ********兼容 */

/**8
 * 兼容封装--获取页面滚动距离
 * @return {{scrollLeft: number, scrollTop: number}}
 */
function getPageScroll() {
    return {
        scrollLeft: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
        scrollTop: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
    };
};

/**9
 * 兼容封装--获取可视区域大小
 * @return {{clientWidth: number, clientHeight: number}}
 */
function getClientSize() {
    //能力检测
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
    var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
    return {
        clientWidth: w,
        clientHeight: h
    }
}

/**10
 * 兼容封装--获取对象的pageX,pageY(主要用于兼容IE8)
 * @param e 传入事件对象
 * @return {{pageY: (*|number), pageX: (*|number)}}
 */
function getPagePoint(e) {
    e = e || window.event;    //获取事件对象
    var X = e.pageX || e.clientX + getPageScroll().scrollLeft;
    var Y = e.pageY || e.clientY + getPageScroll().scrollTop;
    return {
        pageX: X,
        pageY: Y
    }
}

/** IE8********添加******** 注册多个同名事件 |  |   ********函数********兼容 */

/**11
 * 注册多个同名事件
 * @param e 元素
 * @param type  事件类型_不带on
 * @param fun    事件处理函数
 */
function addEvent(e,type,fun) {
    //能力检测
    if (e.addEventListener){    //谷歌
        e.addEventListener(type,fun);
    } else {    //  IE8
        e.attachEvent('on'+type,fun);
    }
}

/**
 * 移出事件
 * @param e 元素
 * @param type    事件类型_不带on
 * @param fun     事件处理函数
 */
function removeEvent(e,type,fun) {
    if (e.removeEventListener){ //谷歌浏览器
        e.removeEventListener(type,fun);
    } else {    //IE8
        e.deattachEvent('on'+type,fun);
    }
}
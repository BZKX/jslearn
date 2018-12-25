/**
 * @author: LYLG_zkx
 * @Email: 347487522@qq.com
 * @Email: 347487522@qq.com
 * @date: 2018/12/17 11:57
 * @IDE: WebStorm
 */

/**
 * 匀速移动位置
 * @param target
 * @param distance
 */
function animationMove(target, distance) {
    clearInterval(target.Id);
    target.Id = setInterval(function () {
        var ofLeft = target.offsetLeft;

        var tag = ofLeft <= distance;
        tag ? ofLeft += 50 : ofLeft -= 50;
        target.style.left = ofLeft + 'px';
        //边界检测
        if (tag ? ofLeft >= distance : ofLeft < distance) {
            //清除定时器
            clearInterval(target.Id);
            //元素复位
            target.style.left = distance + 'px';
        }
    }, 50)
}

/**
 *  缓动动画,需要改变的属性组成对象传入
 * @param {*} target    元素名
 * @param {Object} propertyObj 需要改变的内容组成的对象(属性名 : Number)
 */
function slowAnimation(target, propertyObj, fn) {
    clearInterval(target.timeId);   //  清除定时器
    target.timeId = setInterval(function () {   //定时器
        //是否清除定时器,取决于是否所有属性都到达目标位置(开关思想)
        //假设全部属性都已经到达终点,设为true
        var isOver = true;
        //遍历对象里的属性内容
        for (var key in propertyObj) {
            //zindex层级没有动画
            if (key == 'zIndex') {
                target.style.zIndex = propertyObj[key];
            } else if (key == 'opacity') { //透明度是小数,无法计算比较大小
                //将对象的属性和内容赋值
                var property = key;     //属性名
                var distance = propertyObj[key] * 100;    //属性值
                //获取属性当前位置
                // var value = parseInt(getComputedStyle(target, null)[property]);
                //调用兼容IE获取属性的方法
                var value = parseFloat(getStyle(target, property)) * 100
                //计算移动距离
                var record = (distance - value) / 10;
                record = record > 0 ? Math.ceil(record) : Math.floor(record);
                value += record;
                //移动目标啊
                target.style[property] = value / 100;
                //(开关判断)若有任何一个属性没有到达目标值,则返回false
                if (distance != value) {
                    isOver = false
                }
            } else {
                //将对象的属性和内容赋值
                var property = key;     //属性名
                var distance = propertyObj[key];    //属性值
                //获取属性当前位置
                // var value = parseInt(getComputedStyle(target, null)[property]);
                //调用兼容IE获取属性的方法
                var value = parseInt(getStyle(target, property))
                //计算移动距离
                var record = (distance - value) / 10;
                record = record > 0 ? Math.ceil(record) : Math.floor(record);
                value += record;
                //移动目标啊
                target.style[property] = value + 'px';
                //(开关判断)若有任何一个属性没有到达目标值,则返回false
                if (distance != value) {
                    isOver = false
                }
            }
        }

        //(验证)当所有的属性都到达目标值,经过这次遍历后 isOver仍然会返回true,关闭定时器
        if (isOver) {
            clearInterval(target.timeId);   //关闭定时器
            if (typeof fn == 'function') {
                fn();
            }
        }

    }, 30)
}
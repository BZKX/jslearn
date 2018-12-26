/**
 *   █████▒█    ██  ▄████▄   ██ ▄█▀       ██████╗ ██╗   ██╗ ██████╗
 * ▓██   ▒ ██  ▓██▒▒██▀ ▀█   ██▄█▒        ██╔══██╗██║   ██║██╔════╝
 * ▒████ ░▓██  ▒██░▒▓█    ▄ ▓███▄░        ██████╔╝██║   ██║██║  ███╗
 * ░▓█▒  ░▓▓█  ░██░▒▓▓▄ ▄██▒▓██ █▄        ██╔══██╗██║   ██║██║   ██║
 * ░▒█░   ▒▒█████▓ ▒ ▓███▀ ░▒██▒ █▄       ██████╔╝╚██████╔╝╚██████╔╝
 *  ▒ ░   ░▒▓▒ ▒ ▒ ░ ░▒ ▒  ░▒ ▒▒ ▓▒       ╚═════╝  ╚═════╝  ╚═════╝
 * @author: LYLG_zkx
 * @Email: 347487522@qq.com
 * @date: 2018/12/25 9:38
 * @IDE: WebStorm
 */

/**
 * 用自执行函数是为了防止全局变量污染,模块化开发
 * dot:但是要把需要的方法暴露出来,将方法添加给window实现外部调用
 */
(function (window) {
    //s声明一个list数组,用来保存显示食物的div
    var list = [];
    //食物是一个对象.创建构造函数
    function Food(width,height,bgColor,x,y) {
        this.width = width || 20;
        this.height = height || 20;
        this.bgColor = bgColor || 'green';
        this.x = x||0;
        this.y = y||0;
    }

    /**
     * 把食物对象渲染到地图上,要写一个方法函数
     * 这个函数添加到原型中比较好,所有食物都可以调用
     */

    Food.prototype.render = function (map) {
        //渲染之前,删除老食物
        remove();
        //谁调用render方法,this就是是谁
        //1.随机坐标
        this.x = Math.floor(Math.random() * (map.offsetWidth/this.width))*this.width;
        this.y = Math.floor(Math.random() * (map.offsetHeight/this.height))*this.height;
        //2渲染
        var div1 = document.createElement('div');
        div1.style.position = 'absolute';
        div1.style.left = this.x + 'px';
        div1.style.top = this.y + 'px';
        div1.style.backgroundColor = this.bgColor;
        div1.style.width = this.width + 'px';
        div1.style.height = this.height + 'px';
        //添加到地图上
        map.appendChild(div1);
        //把显示的食物的div存起来
        list.push(div1);
    };
    //删除老食物
    function remove (){
        for (let i = 0; i < list.length; i++) {
            map.removeChild(list[i]);
            //清空list数组
            list.length = 0;
        }
    }
    /**
     * 因为是局部变量,外部无法调用Food构造函数
     * 所以把写的Food方法添加给window对象
     * 给window对象添加了一个我们自己写的Food方法
     */
    window.Food = Food;
}(window));
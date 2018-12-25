/**
 *   █████▒█    ██  ▄████▄   ██ ▄█▀       ██████╗ ██╗   ██╗ ██████╗
 * ▓██   ▒ ██  ▓██▒▒██▀ ▀█   ██▄█▒        ██╔══██╗██║   ██║██╔════╝
 * ▒████ ░▓██  ▒██░▒▓█    ▄ ▓███▄░        ██████╔╝██║   ██║██║  ███╗
 * ░▓█▒  ░▓▓█  ░██░▒▓▓▄ ▄██▒▓██ █▄        ██╔══██╗██║   ██║██║   ██║
 * ░▒█░   ▒▒█████▓ ▒ ▓███▀ ░▒██▒ █▄       ██████╔╝╚██████╔╝╚██████╔╝
 *  ▒ ░   ░▒▓▒ ▒ ▒ ░ ░▒ ▒  ░▒ ▒▒ ▓▒       ╚═════╝  ╚═════╝  ╚═════╝
 * @author: LYLG_zkx
 * @Email: 347487522@qq.com
 * @date: 2018/12/25 10:11
 * @IDE: WebStorm
 */

(function (window) {
    //关于蛇的代码
    var list = [];

    /**
     *
     */
    function Snake(width, height, direction) {
        this.width = width || 20;
        this.height = height || 20;
        this.direction = direction || 'right';
        //蛇每一节身体存在数组中,蛇吃食物,长长添加元素
        this.body = [
            {x: 3, y: 1, bgColor: 'red'},
            {x: 2, y: 1, bgColor: 'green'},
            {x: 1, y: 1, bgColor: 'yellow'},
        ];
    }

    /**
     * 渲染蛇的方法写在原型中
     */
    Snake.prototype.render = function (map) {
        //遍历蛇的每一节身体,渲染
        for (var i = 0; i < this.body.length; i++) {
            //拿到身体
            var snakeUnit = this.body[i];
            //渲染->创建div添加到map中
            var div1 = document.createElement('div');
            div1.style.position = 'absolute';
            div1.style.left = snakeUnit.x * this.width + 'px';  //显示每一节的位置
            div1.style.top = snakeUnit.y * this.height + 'px';
            div1.style.width = this.width + 'px';
            div1.style.height = this.height + 'px';
            div1.style.backgroundColor = snakeUnit.bgColor;
            //把蛇添加到地图上
            map.appendChild(div1);
        }
    };
    window.Snake = Snake;
}(window))
/**
 *   █████▒█    ██  ▄████▄   ██ ▄█▀       ██████╗ ██╗   ██╗ ██████╗
 * ▓██   ▒ ██  ▓██▒▒██▀ ▀█   ██▄█▒        ██╔══██╗██║   ██║██╔════╝
 * ▒████ ░▓██  ▒██░▒▓█    ▄ ▓███▄░        ██████╔╝██║   ██║██║  ███╗
 * ░▓█▒  ░▓▓█  ░██░▒▓▓▄ ▄██▒▓██ █▄        ██╔══██╗██║   ██║██║   ██║
 * ░▒█░   ▒▒█████▓ ▒ ▓███▀ ░▒██▒ █▄       ██████╔╝╚██████╔╝╚██████╔╝
 *  ▒ ░   ░▒▓▒ ▒ ▒ ░ ░▒ ▒  ░▒ ▒▒ ▓▒       ╚═════╝  ╚═════╝  ╚═════╝
 * @author: LYLG_zkx
 * @Email: 347487522@qq.com
 * @date: 2018/12/25 11:25
 * @IDE: WebStorm
 */

//游戏控制器
(function (window) {
    //声明一个变量来存游戏控制器的对象
    let that = null;

    //游戏控制器构造函数
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        //给that赋值
        that = this;
    }

    //开始-->>
    Game.prototype.start = function () {
        //生成食物-->>
        this.food.render(this.map);
        //生成蛇-->>
        this.snake.render(this.map);
        //蛇动起来(直接调用移动方法)-->>
        snakeAutoMove();

        bindKey();
    };

    /**
     * 让蛇跟着按键(键盘)移动
     * 注意:事件是由document触发,this不是指代游戏控制器的对象
     *      使用全局变量that代替this指代对象
     */
    function bindKey() {
        document.onkeydown = function (e) {
            // 37 38 39 40 左 上 右 下
            //根据按键改变蛇的方向
            console.log(String.fromCharCode(e.keyCode));
            switch (e.keyCode) {
                case 37 :
                    if (that.snake.direction !== 'right') {
                        that.snake.direction = 'left';
                    }
                    break;
                case 38 :
                    if (that.snake.direction !== 'bottom') {
                        that.snake.direction = 'top';
                    }
                    break;
                case 39 :
                    if (that.snake.direction !== 'left') {
                        that.snake.direction = 'right';
                    }
                    break;
                case 40 :
                    if (that.snake.direction !== 'top') {
                        that.snake.direction = 'bottom';
                    }
                    break;
            }
        }
    }

    //自动移动的方法,计时器
    function snakeAutoMove() {
        var timeId = setInterval(function () {
            /**
             * 这里的this指向的是window,因为是计时器的函数,是由window.出来的的
             * 使用bind()方法让this指向游戏控制器的对象
             * 声明一个全局变量that来存储this(游戏控制器对象)
             * 给函数使用bind()方法让指向游戏控制器对象
             * -->或者直接使用that代替内部的this,that是全局变量,指向游戏控制器的对象
             */
            //盒子移动,创建坐标
            this.snake.move(this.food);
            //判断是否出边界
            var snakeHeadX = this.snake.body[0].x * this.snake.width;
            var snakeHeadY = this.snake.body[0].y * this.snake.height;
            //判断
            if (snakeHeadX < 0 || snakeHeadY < 0 ||
                snakeHeadX >= this.map.offsetWidth || snakeHeadY >= this.map.offsetHeight) {
                console.log(this.snake);
                alert('Game over');
                clearInterval(timeId);
                return; //跳出函数,不执行渲染,注意但是蛇的坐标已经被计算出来,只是没有渲染
            }

            //盒子显示,坐标渲染
            this.snake.render(this.map);

        }.bind(that), 500)
    }

    window.Game = Game
}(window));
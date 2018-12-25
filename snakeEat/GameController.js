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
    };
   //自动移动的方法,计时器
    function snakeAutoMove(){
        setInterval(function () {
            /**
             * 这里的this指向的是window,因为是计时器的函数,是由window.出来的的
             * 使用bind()方法让this指向游戏控制器的对象
             * 声明一个全局变量that来存储this(游戏控制器对象)
             * 给函数使用bind()方法让指向游戏控制器对象
             */
            this.snake.move();

            this.snake.render(this.map);
        }.bind(that),1000)
    }

    window.Game = Game
}(window));
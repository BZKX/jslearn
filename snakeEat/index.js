/**
 * @author: LYLG_zkx
 * @Email: 347487522@qq.com
 * @date: 2018/12/25 17:55
 * @IDE: WebStorm
 */
/**
 * 食物Food
 */
;(function (window) {
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

//---------------------------------------------------------------//
/**
 * 蛇
 */
;(function (window) {
    //声明list数组用来存储蛇的身体div
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
     * 蛇移动的方法
     */
    Snake.prototype.render = function (map) {
        //每次渲染之前删除之前的蛇
        remove();
        //遍历蛇的每一节身体,渲染
        for (let i = 0; i < this.body.length; i++) {
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

            //将蛇的div存在list列表里
            list.push(div1);
        }
    };

    Snake.prototype.move = function (food) {
        //从尾部开始移动
        for (let i = this.body.length - 1; i > 0; i--) {   //身体移动循环
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        switch (this.direction) {
            case 'left' :
                this.body[0].x--;
                break;
            case 'right' :
                this.body[0].x++;
                break;
            case 'top' :
                this.body[0].y--;
                break;
            case 'bottom' :
                this.body[0].y++;
                break;
        }
        /**
         * 蛇移动就可能吃到食物,所以在这里进行判断
         */
        var snakHeadX = this.body[0].x * this.width;
        var snakHeadY = this.body[0].y * this.height;
        var foodX = food.x;
        var foodY = food.y;
        //获取蛇尾,一会添加
        var snakeLastUnit = this.body[this.body.length-1];
        //判断,是否重合,吃到食物张一节
        if (snakHeadX === foodX && snakHeadY === foodY) {
            this.body.push({
                x: snakeLastUnit.x,
                y: snakeLastUnit.y,
                bgColor : getColorForRandom()
            });
            //产生新的食物
            food.render(map)
        }
    };

    //删除蛇的方法
    function remove() {
        //让map删除list数组中的div
        for (let i = 0; i < list.length; i++) {
            //从map中删除
            map.removeChild(list[i]);
        }
        //把list数组清空
        list.length = 0;
    }
    //随机产生一个十六进制的颜色的函数.
    function getColorForRandom(){
        const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];  //下标0-15
        let str = "#";
        //循环产生 6个 0-15的数.
        for(let i = 0 ; i < 6; i++){
            const num = Math.floor(Math.random() * 16);
            //根据这个随机数,在arr数组中去取值.
            str += arr[num];
        }
        return str;
    }
    window.Snake = Snake;
}(window));
//---------------------------------------------------------------//
//游戏控制器
;(function (window) {
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
            this.snake.move(this.food,this.map);
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
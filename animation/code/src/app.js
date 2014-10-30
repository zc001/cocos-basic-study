
/*
    背景层
*/
var bgLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var winSize = cc.director.getWinSize();
        var sprite = new cc.Sprite(res.background);
        sprite.x = winSize.width / 2;
        sprite.y = winSize.height / 2;
        this.addChild(sprite);
        return true;
    }
});

/*
    cocos2d-js中的基本动画是由Animation和Animate两个类的配合而完成的。
    Animation：用于存储动画相关的信息。其中包含用于动画的所有动画帧信息，单位帧的时间间隔，总帧数，动画重复次数等等信息。 
    Animate：用于创建动画的CCAction动作，需要CCAnimation作为创建的参数。
*/

/*
    创建动画的第一种方式
*/
var runnerLayer_01 = cc.Layer.extend({
    ctor: function () {
        this._super();
        var sprite = new cc.Sprite("res/runner.png");
        sprite.attr({x: 200, y: 600});
        //将plist文件加载入精灵帧缓冲区
        cc.spriteFrameCache.addSpriteFrames('res/running.plist');
        //依次获得精灵帧，并加入数组
        var animFrames = [];
        for(var i = 0; i < 8; i++){
            var str = 'runner' + i + '.png';
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        //以精灵帧数组创建Animation实例
        var animation = new cc.Animation(animFrames, 0.1);
        //创建Animate实例
        var action = new cc.RepeatForever(new cc.Animate(animation));
        //运行动画
        sprite.runAction(action);
        this.addChild(sprite);
        return true;        
    }
});

/*
    创建动画的第二种方式
    直接从每一帧图片中创建精灵动画    
*/
var flyLayer_01 = cc.Layer.extend({
    ctor: function () {
        this._super();
        var layer = new cc.Layer();
        var sprite = new cc.Sprite("res/fly/fly_0001.png");
        var animation = new cc.Animation();
        for (var i = 1; i < 20; i++) {
            //直接将图片创建为精灵帧并加载 
            animation.addSpriteFrameWithFile("res/fly/fly_00" + (i<10?('0'+i):i) + ".png");
        }
        animation.setDelayPerUnit(1/20);
        var action = cc.animate(animation).repeatForever();
        sprite.runAction(action);
        sprite.attr({x: 200, y: 400});
        this.addChild(sprite);
        return true;
    }
});

var runnerLayer_02 = cc.Layer.extend({
    ctor: function () {
        this._super();
        cc.spriteFrameCache.addSpriteFrames('res/running.plist');
        var layer = new cc.Layer();
        var sprite = new cc.Sprite('res/runner.png');
        var animation = new cc.Animation();
        for (var i = 0; i < 8; i++) {
            animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame('runner' + i + '.png'));
        }
        animation.setDelayPerUnit(1/20);
        var action = cc.animate(animation).repeatForever();
        sprite.runAction(action);
        sprite.attr({x: 200, y: 200});
        this.addChild(sprite);
        return true;
    }
});

var backgroundScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var bg = new bgLayer();
        this.addChild(bg);
        var runner_01 = new runnerLayer_01();
        this.addChild(runner_01);
        var fLayer_01 = new flyLayer_01();
        this.addChild(fLayer_01);
        var runner_02 = new runnerLayer_02();
        this.addChild(runner_02);
    }
});


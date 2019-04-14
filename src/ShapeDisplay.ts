class ShapeDisplay extends egret.Sprite{
	public constructor() {
		super();
		this.$addListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);

	}

	private shp:egret.Shape;
	private onAddToStage() {
		this.drawCircle();
		this.shp = new egret.Shape();
		this.shp.graphics.lineStyle(10,0x00ff00); // 1.线条宽度,2.描边颜色(0x00ff00=绿色)
		this.shp.graphics.beginFill(0xff0000,1); // 填充颜色红色,alpha=1,完全不透明 
		this.shp.graphics.drawRect(0,0,100,100);
		this.shp.graphics.endFill();
		//this.shp.graphics.clear(); // 清空绘图
		this.addChild(this.shp);
		this.stage.frameRate = 60;
		this.$addListener(egret.Event.ENTER_FRAME,this.move,this);

		
		// spr对象是容器,它里面还没有任何内容
		var spr:egret.Sprite = new egret.Sprite();
		spr.x = 100;
		spr.y = 100;
		this.addChild(spr);
		//spr.addChild(this.shp);


		// 绘制直线
		var line:egret.Shape = new egret.Shape();
		line.graphics.lineStyle(2,0xff0000);
		line.graphics.moveTo(100,100); //设置线条的起始点
		line.graphics.lineTo(100,200); // 设置线条的终点
		line.graphics.lineTo(233,143);
		line.graphics.lineTo(452,123);
		line.graphics.endFill();
		spr.addChild(line);

		// 绘制曲线
		var curve:egret.Shape = new egret.Shape();
		curve.graphics.lineStyle(2,0x00ff00);
		curve.graphics.moveTo(500,500);
		curve.graphics.curveTo(100,100,200,50);
		curve.graphics.endFill();
		this.addChild(curve);

		//绘制圆弧
		var arc:egret.Shape = new egret.Shape();
		arc.graphics.beginFill(0x1122cc);
		arc.graphics.drawArc(400,400,100,0,Math.PI,false);
		arc.graphics.endFill();
		this.addChild(arc);

		// 多个形状的绘制
		var rect1:egret.Shape = new egret.Shape();
		rect1.graphics.beginFill(0x0000ff);
		rect1.graphics.drawRect(0,0,50,50);
		rect1.graphics.endFill();
		this.addChild(rect1);
		var rect2:egret.Shape = new egret.Shape();
		rect2.graphics.beginFill(0x0000ff);
		rect2.graphics.drawRect(50,50,50,50);
		rect2.graphics.endFill();
		this.addChild(rect2);	

		var rect3:egret.Shape = new egret.Shape();
		rect3.graphics.beginFill(0xff0000);
		rect3.graphics.drawRect(50,0,50,50);
		rect3.graphics.endFill();
		this.addChild(rect3);	
		var rect4:egret.Shape = new egret.Shape();
		rect4.graphics.beginFill(0xff0000);
		rect4.graphics.drawRect(0,50,50,50);
		rect4.graphics.endFill();
		this.addChild(rect4);

		// 相对坐标系
		var sprcon1:egret.Sprite = new egret.Sprite();
		sprcon1.graphics.beginFill(0x00ff00);
		sprcon1.graphics.drawRect(0,0,100,100);
		this.addChild(sprcon1);
		sprcon1.x = 400;
		var sprcon2:egret.Sprite = new egret.Sprite();
		sprcon2.graphics.beginFill(0xff0000);
		sprcon2.graphics.drawRect(0,0,100,100);
		sprcon2.graphics.endFill();
		this.addChild(sprcon2);
		sprcon2.y = 600;

		var sprcon3:egret.Sprite = new egret.Sprite();
		sprcon3.graphics.beginFill(0xff0000);
		sprcon3.graphics.drawRect(0,0,50,50);
		sprcon3.graphics.endFill();
		sprcon1.addChild(sprcon3);
		sprcon3.x = 10;
		sprcon3.y = 10;

		/* 删除操作的注意点 */
		if (sprcon3.parent) {
			sprcon3.parent.removeChild(sprcon3);
		}

		// 添加一个bitmap
		var bmp:egret.Bitmap = new egret.Bitmap(RES.getRes("imbg_png"));
		bmp.x = 300;
		bmp.y = 600;
		bmp.width = 300;
		bmp.height = 300;
		this.addChild(bmp);
		// 遮罩的使用
		var rect:egret.Rectangle = new egret.Rectangle(50,50,400,300);
		bmp.mask = rect;
		//bmp.mask = null; // 屏蔽遮罩

		console.log(bmp.hitTestPoint(30,30,true)); // 开启精确碰撞检测
		console.log(bmp.hitTestPoint(490,650,true)); // 开启精确碰撞检测

		// 非精确碰撞检测
		var shp:egret.Shape = new egret.Shape();
		shp.graphics.beginFill(0xff0000);
		shp.graphics.drawRect(0,0,100,100);
		shp.graphics.endFill();
		this.addChild(shp);
		console.log(shp.hitTestPoint(30,30));
		console.log(shp.hitTestPoint(300,300));

		// 包围盒碰撞
		var shp1:egret.Shape = new egret.Shape();
		shp1.graphics.beginFill(0x0000ff);
		shp1.graphics.drawRect(0,0,100,100);
		shp1.graphics.endFill();
		this.addChild(shp1);
		var shp2:egret.Shape = new egret.Shape();
		shp2.graphics.beginFill(0xff0000);
		shp2.graphics.drawRect(50,50,100,100);
		shp2.graphics.endFill();
		this.addChild(shp2);	

		var rect_1:egret.Rectangle = new egret.Rectangle(shp1.x,shp1.y,shp1.width,shp1.height);
		var rect_2:egret.Rectangle = new egret.Rectangle(shp2.x,shp2.y,shp2.width,shp2.height);
		console.log(rect_1.intersects(rect_2));


		var bit:egret.Bitmap = new egret.Bitmap(RES.getRes("egret_icon_png"));
		this.addChild(bit);
		bit.y = 600;
		bit.blendMode = egret.BlendMode.ADD;
	}

	private ang:number = 0;
	private r:number = 30;
	private move(evt:egret.Event) {
		this.shp.x = 50 + Math.cos(this.ang*Math.PI / 180)*this.r;
		this.shp.y = 50 + Math.sin(this.ang*Math.PI / 180)*this.r;
		this.ang++;

		if(this.ang >=360) {
			this.shp.graphics.clear(); // 清空绘图
		}
	}

	private drawCircle() {
		var cir:egret.Shape = new egret.Shape();
		cir.graphics.lineStyle(10,0xff0000);
		cir.graphics.beginFill(0x00ff00,1);
		cir.graphics.drawCircle(0,0,30);
		cir.graphics.endFill();
		cir.x = 50;
		cir.y = 50;
		this.addChild(cir);
	}

}
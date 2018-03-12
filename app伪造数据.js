var express = require('express');  // 加载express模块

var path = require('path')
// 引入path模块的作用：因为页面样式的路径放在了bower_components，告诉express，请求页面里所过来的请求中，如果有请求样式或脚本，都让他们去bower_components中去查找

var port = process.env.PORT || 3000;
var app = express(); // 启动Web服务器

var serveStatic = require('serve-static');  // 静态文件处理
app.use(serveStatic('public')); // 路径：public

var bodyParser = require('body-parser');
// 因为后台录入页有提交表单的步骤，故加载此模块方法（bodyParser模块来做文件解析），将表单里的数据进行格式化
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', './views/pages');     // 设置视图默认的文件路径
app.set('view engine', 'jade');  // 设置视图引擎：jade
//app.use(express.bodyParser());  // 后台录入表单，提交时表单格式化

app.use(express.static(path.join(__dirname,'bower_components')))
app.listen(port)

console.log('imooc started on port ' + port)

//路由,在express中使用路由非常简单
//index page
app.get('/', function(req,res){
	res.render('index',{
		title: '首页',
		movies: [{
	      title: '异形：契约',
	      _id: 1,
	      poster: 'https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2167448161.webp'
	    },
	    {
	      title: '异形：契约',
	      _id: 2,
	      poster: 'https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2167448161.webp'
	    },
	    {
	      title: '异形：契约',
	      _id: 3,
	      poster: 'https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2167448161.webp'
	    },
	    {
	      title: '异形：契约',
	      _id: 4,
	      poster: 'https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2167448161.webp'
	    },
	    {
	      title: '异形：契约',
	      _id: 5,
	      poster: 'https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2167448161.webp'
	    }],
  });
});

// 详情页
app.get('/movie/:id', function(req,res){
	res.render('detail',{
		title: '电影详情',
    	movie: {
			director: '雷德利·斯科特',
			country: '美国',
			title: '异形：契约',
			year: 2017,
			poster: 'https://img3.doubanio.com/img/celebrity/small/32214.jpg',
			language: '英语',
			flash: 'http://119.188.38.131/youku/65743530DBB4C838FBA166544F/0300080100585FB87B799839BBD120136343F3-AD4F-8451-FC2A-A9554D727689.mp4?sid=049846040186412f9e92c&ctype=12&ccode=0401&duration=133&expire=18000&psid=599c21659cf2ed62339a7ba955d34987&ups_client_netip=114.240.103.157&ups_ts=1498460401&ups_userid=&utid=LT%2FBEcSPnjsCAXt3LLqrfLyH&vid=XMTg4NTUxNjQ5Ng%3D%3D&vkey=A57113a190f13ec64fa327c44ec8d116e&nk=411351972806_24974340174&ns=0_22165960&special=true',
			summary:'“科幻之父”雷德利-斯科特将为他所开创的《异形》系列带来新篇章。《异形：契约》的故事发生在《普罗米修斯》10年后，一群新的宇航员乘坐着“契约号”飞船前往遥远的星系寻找殖民地，他们来到一处看似天堂般的星球，实则是黑暗、危险的地狱，在那里他们见到了“普罗米修斯”号唯一的幸存者——由迈克尔·法斯宾德饰演的生化人大卫，一场毁灭性的巨大灾难即将到来。'
    	}
  });
});

app.get('/admin/movie', function(req,res){
	res.render('admin',{
		title: '电影录入',
		movie: {
            title: '',
            doctor: '',
            country: '',
            year: '',
            poster: '',
            summary: '',
            flash: '',
            language: ''
        }
	})
})

//列表页
app.get('/admin/list', function(req,res){
	res.render('list',{
		title: '电影列表',
	    movies: [{
			title: '异形：契约',
			_id: 1,
			doctor: '雷德利·斯科特',
			country: '美国',
			year: 2017,
			poster: 'https://img3.doubanio.com/img/celebrity/small/32214.jpg',
			language: '英语',
			flash: 'http://119.188.38.131/youku/65743530DBB4C838FBA166544F/0300080100585FB87B799839BBD120136343F3-AD4F-8451-FC2A-A9554D727689.mp4?sid=049846040186412f9e92c&ctype=12&ccode=0401&duration=133&expire=18000&psid=599c21659cf2ed62339a7ba955d34987&ups_client_netip=114.240.103.157&ups_ts=1498460401&ups_userid=&utid=LT%2FBEcSPnjsCAXt3LLqrfLyH&vid=XMTg4NTUxNjQ5Ng%3D%3D&vkey=A57113a190f13ec64fa327c44ec8d116e&nk=411351972806_24974340174&ns=0_22165960&special=true',
			summary:'“科幻之父”雷德利-斯科特将为他所开创的《异形》系列带来新篇章。《异形：契约》的故事发生在《普罗米修斯》10年后，一群新的宇航员乘坐着“契约号”飞船前往遥远的星系寻找殖民地，他们来到一处看似天堂般的星球，实则是黑暗、危险的地狱，在那里他们见到了“普罗米修斯”号唯一的幸存者——由迈克尔·法斯宾德饰演的生化人大卫，一场毁灭性的巨大灾难即将到来。'
    	}]
  	});
});
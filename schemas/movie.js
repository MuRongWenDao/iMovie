var mongoose = require('mongoose');
var MovieSchema = new mongoose.Schema({
	doctor:String,
	title:String,
	country:String,
	summary:String,
	flash:String,
	poster:String,
	year:Number,
	meta:{
		createdAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		},
	}
})

//为模式添加方法
//每次存储数据前都执行 pre(save)
MovieSchema.pre('save',function(next){
	if (this.isNew){  //是新加的数据
		this.meta.createdAt = this.meta.updateAt = Date.now();
	}else {
		this.meta.updateAt = Date.now();
	}
	next()
})

MovieSchema.statics = {
	fetch: function(cb){  //获取所有数据的方法
		return this.find({}).sort('meta.updateAt').exec(cb)
	},
	findById: function(id,cb){  //根据id获取数据
		return this.findOne({_id:id}).exec(cb)
	}
}

module.exports = MovieSchema
var qiniu = require("qiniu");

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'Rkjz9sZJ-quZ0hZYD--lWUPwXromZgKW3YckqIAX';
qiniu.conf.SECRET_KEY = 'Oy3OWuu_iN1hS6jEjj-T8kyl7IM9U1YEIwnOegEN';

//要上传的空间
bucket = 'tigertest';

//上传到七牛后保存的文件名
key = 'dist/scripts/main.1ff06a9298a0f0fbdcfc.js';

//构建上传策略函数
function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
    return putPolicy.token();
}

//生成上传 Token
token = uptoken(bucket, key);

//要上传文件的本地路径
filePath = './dist/scripts/main.1ff06a9298a0f0fbdcfc.js';

//构造上传函数
function uploadFile(uptoken, key, localFile) {
    var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
        if(!err) {
            // 上传成功， 处理返回值
            console.log(ret.hash, ret.key, 'success');
        } else {
            // 上传失败， 处理返回代码
            console.log(err);
        }
    });
}

//调用uploadFile上传
uploadFile(token, key, filePath);


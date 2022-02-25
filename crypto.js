'use strict'
const crypto = require('crypto')
var fs = require('fs')


//共享密钥
var key = crypto.randomBytes(30).toString('hex')

//加密数据
var data = 'more hardness, more hapiness'




function aesEncrypt(data,key){
    var encrypted = crypto.createCipher('aes192',key);
    var result = encrypted.update(data,'utf8','hex')+encrypted.final('hex');
    return result;
}

function aesDecrypt(encrypted,key){
    var decrypted = crypto.createDecipher('aes192',key)
    var result = decrypted.update(encrypted,'hex','utf8') + decrypted.final('utf8')
    return result
}


// AES对称加密算法使用示例
function do_aes(){
var filepath = process.argv[2]
if(filepath){
    fs.stat(filepath,function(err,stats){
	if(!err && stats.isFile()){
	    fs.readFile(filepath,'utf-8',function(err,data){
		if(!err){
		    console.log('原字符串：' + data)
		    console.log('共享密钥：' + key)
		    var encrypted = aesEncrypt(data,key)
		    console.log('加密后的结果: ' + encrypted)
		    var result = aesDecrypt(encrypted,key)
		    console.log('解密字符串: ' + result)
		}else{
		    console.log('文件读取失败')
		}
	    })

	}else{
	    console.log('文件不存在或读取错误')
	}
    })
}else{
    console.log('\n原字符串：' + data)
    console.log('共享密钥：' + key)
    var encrypted = aesEncrypt(data,key)
    console.log('加密后的结果: ' + encrypted)
    var result = aesDecrypt(encrypted,key)
    console.log('解密字符串: ' + result)
}
}


//哈希算法使用示例
function do_hash(){
    var str = 'helloworld'
    //使用MD5的hash算法
    console.log('原字符串: ' + str +'\n')
    var md5 = crypto.createHash('md5')
    md5.update(str)
    var output = md5.digest('hex')

    //使用SHA1的hash算法
    console.log('MD5: ' + output)
    var sha1 = crypto.createHash('sha1')
    sha1.update(str)
    output = sha1.digest('hex')
    console.log('SHA1：' + output)

    //使用HMAC的加密hash算法
    var key  = crypto.randomBytes(30)
    var hmac = crypto.createHmac('sha256',key)
    hmac.update(str)
    output = hmac.digest('hex')
    console.log('HMAC: '+output)
}













//do_aes()
do_hash()

do_aes()




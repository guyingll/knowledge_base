var fs = require('fs'), crypto = require('crypto');
/*
 * GET home page.
 */

module.exports = function (app) {

    app.get('/',function (req,res) {
        var files = fs.readdirSync('./public/images/');
        res.render('index',{
            title: '首页',
            success: 'success',
            error: 'error',
            flag: false,
            urls: files
        });
    });

    app.get('/upload',function (req,res) {
        console.log("test");
        res.render('upload',{
            title: '文件上传',
            success: 'success',
            error: 'error',
            flag: false
        });
    });

    app.post('/upload',function (req,res) {
        var path = './public/images/';
        var target_paths=[];
        for (var i in req.files) {
            if (req.files[i].size == 0) {
                // 使用同步方式删除一个文件
                fs.unlinkSync(req.files[i].path);
                console.log('Successfully removed an empty file!');
            } else {
                var fileName = req.files[i].name;
                var oldfileName=fileName;
                var oldpath=req.files[i].path;
                var target_path = path + fileName;
                var i=1;

                // 使用同步方式判断是否存在一个文件
                while (fs.existsSync(target_path)) {
                    var fileNametmp=oldfileName.split(".");
                    fileNametmp[fileNametmp.length-2]+="_"+i;
                    fileName=fileNametmp.join(".");
                    target_path=path+fileName;
                    i++;
                }
                console.log(target_path);
                // 使用同步方式重命名一个文件
                fs.renameSync(oldpath,target_path);
                target_paths.push(fileName);
            }
        }

        res.render('upload',{
            title: '文件上传成功',
            flag: true,
            urls: target_paths
        });
    });


    app.get('/search',function (req,res) {
        Post.search(req.query.keyword,function (err,posts) {
            if (err) {
                return res.redirect('/');
            }
            res.render('search',{
                title: "SEARCH:" + req.query.keyword,
                success: 'success',
                error: 'error'
            });
        });
    });

};

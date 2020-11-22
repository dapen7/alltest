const Koa = require('koa');
const koaBody = require('koa-body');
const send = require('koa-send');
const Router = require('koa-router');
const fs = require('fs');
const cors = require('koa-cors');
const app = new Koa();
const router = new Router();

//upload
router.post('/upload', async (ctx)=>{
	const file = ctx.request.files.myfile;
	const reader = fs.createReadStream(file.path);
	const upStream = fs.createWriteStream(`upload/${file.name}`);
	reader.pipe(upStream);
	return ctx.body = {
        code:0,
        msg:"上传成功!"
    };
});
//dowload
router.all('/download/:name', async (ctx)=>{
	const name = ctx.params.name;
	const path = `upload/${name}`;
	ctx.attachment(path);
    await send(ctx, path);
});
//normal
router.get('/test', async (ctx)=>{
    ctx.body = {
        code:0,
        msg:"测试成功！"
    };
});
//use
app.use(cors());
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024
    }
}));
app.use(router.routes()).use(router.allowedMethods());
app.listen(3001);
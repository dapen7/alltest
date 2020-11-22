# 设置镜像
npm config set registry https://registry.npm.taobao.org
npm config set disturl https://npm.taobao.org/dist
npm config set electron_mirror https://npm.taobao.org/mirrors/electron/

# 添加依赖
将【依赖】文件夹中的内容分别解压到
C:\Users\XXXXXXX\AppData\Local\electron-builder\Cache\nsis\nsis-3.0.5.0
C:\Users\XXXXXXX\AppData\Local\electron-builder\Cache\winCodeSign\winCodeSign-2.6.0
C:\Users\XXXXXXX\AppData\Local\electron-builder\Cache\nsis\nsis-resources-3.4.1
注意：npm run build 会用到依赖项，如果不是依赖文件夹中的版本需要自己手动下载或扶墙下载

# 单应用docker
FROM nginx:alpine

# 将前端应用的构建结果复制到 Nginx 的默认静态文件目录
COPY ./packages/base/dist /www/base
COPY ./packages/app1/dist /www/app1
COPY ./packages/app2/dist /www/app2
COPY ./nginx.conf /etc/nginx/conf.d

# 可选：如果需要自定义 Nginx 配置，可以将你的配置文件复制到容器内的 /etc/nginx/conf.d/ 目录

# 暴露容器的 80 端口
EXPOSE 80

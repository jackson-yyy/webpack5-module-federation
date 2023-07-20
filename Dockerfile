FROM nginx:alpine

# 将前端应用的构建结果复制到 Nginx 的默认静态文件目录
COPY ./packages/base/dist /usr/share/nginx/html
COPY ./packages/app1/dist /usr/share/nginx/html/app1
COPY ./packages/app2/dist /usr/share/nginx/html/app2

# 暴露容器的 80 端口
EXPOSE 80

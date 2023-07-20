FROM nginx:alpine

# 将前端应用的构建结果复制到 Nginx 的默认静态文件目录
COPY ./dist /usr/share/nginx/html

# 暴露容器的 80 端口
EXPOSE 80

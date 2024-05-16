@echo off
cd /d %~dp0

rem 启动前端服务器
start cmd /k "python -m http.server 8000"

rem 启动后端服务器
start cmd /k "node src/server.js"

pause
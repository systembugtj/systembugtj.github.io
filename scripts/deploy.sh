#!/bin/bash

# Jekyll + CMS 自动部署脚本
# 这个脚本用于在CMS内容更新后自动构建和部署网站

set -e

echo "🚀 开始构建和部署网站..."

# 检查Ruby和Jekyll环境
if ! command -v ruby &> /dev/null; then
    echo "❌ Ruby 未安装，请先安装 Ruby"
    exit 1
fi

if ! command -v bundle &> /dev/null; then
    echo "❌ Bundler 未安装，请先安装 Bundler"
    exit 1
fi

# 安装依赖
echo "📦 安装依赖..."
bundle install

# 清理旧的构建文件
echo "🧹 清理旧的构建文件..."
rm -rf _site

# 构建Jekyll网站
echo "🔨 构建Jekyll网站..."
bundle exec jekyll build

# 检查构建是否成功
if [ $? -eq 0 ]; then
    echo "✅ 网站构建成功！"
    echo "📁 构建文件位于 _site 目录"
    
    # 如果使用GitHub Pages，可以在这里添加自动提交和推送的代码
    # git add .
    # git commit -m "Auto-deploy: $(date)"
    # git push origin master
    
else
    echo "❌ 网站构建失败！"
    exit 1
fi

echo "🎉 部署完成！"


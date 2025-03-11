使用python3.13版本 pip3.13

# 安装指定版本python
brew install python@3.11

# 查看当期有哪些python版本
ls /usr/local/bin/python*
ls /usr/local/bin/pip*

# 安装包命令示例
pip3.13 install akshare --upgrade --break-system-packages 

# 额外文档
[解决 externally-managed-environment 错误，在 python 中使用 pip 安装包时](https://www.shejibiji.com/archives/9682)
[如何优雅解决 Ubuntu 下的 --break-system-packages 警告](https://www.mehaei.com/1242.html)
[多个python环境下，如何在指定的版本下pip安装包](https://www.cnblogs.com/xiaocaitailang/p/16565927.html)
[python查看包版本、全部可更新包、更新单个包、更新全部包](https://blog.csdn.net/wjh2622075127/article/details/88323044)
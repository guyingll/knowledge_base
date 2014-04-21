## 安装Ubuntu 13.04后要做的六件事

1. 移除亚马逊购物滤镜

        sudo apt-get remove unity-lens-shopping

2. 选择你所在地的速度最快的更新服务器

        从Launcher（启动器）再次打开System Settings（系统设置），鼠标双击Software & Updates（软件与更新）。
        然后点击其中的"Download from:"（下载来源：）下拉框，之后选择"Other..."（其他…）。在弹出来的下一个菜单中，
        点击"Select Best Server"（选择最佳服务器），该实用工具会开始为你搜寻速度最快的更新服务器。一旦搜索完毕，
        它会高亮显示速度最快的那台服务器，你只要点击"Choose Server"（选择服务器），就可以完成任务。
        最后，点击Software & Updates（软件与更新）菜单里面的"Close"（关闭）。

3. 安装Unity Tweak工具。

        sudo apt-get install unity-tweak-tool

4. 安装多媒体编解码器。

        sudo -E wget --output-document=/etc/apt/sources.list.d/medibuntu.list http://www.medibuntu.org/sources.list.d/$(lsb_release -cs).list && sudo apt-get --quiet update && sudo apt-get --yes --quiet --allow-unauthenticated install medibuntu-keyring && sudo apt-get --quiet update

        sudo apt-get install non-free-codecs libdvdcss
5. 安装新立得软件包管理器。

        sudo apt-get install synaptic
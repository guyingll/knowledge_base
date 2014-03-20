##  ubuntu 12.10 xrdp安装

1.  安装xrdp

		sudo apt-get install xrdp

2.  安装gnome-panel

		sudo apt-get install gnome-panel

3. 设置xrdp

 		echo "gnome-session --session=gnome-classic" > .xsession

		将上面的一句话放在 /etc/xrdp/startwm.sh 
		这个脚本里面调用 . /etc/X11/Xsession 之前

4. 重启 xrdp

		sudo /etc/init.d/xrdp restart

5. 快捷键设置

		1. 问题：
    	通过xrdp远程访问ubuntu，打开终端输入命令或文本写入，只要输入d就会最小化应用，
		导致带d的命令和文本无法输入，如终端sudo和cd两个命令，一到d就最小化；

		2. 处理：
   		远程设置一下键盘热键即可，方法 如下：系统-》首选项-》键盘快捷键，
		找到“隐藏所有正常窗口并将桌面设置为焦点”项，点一下后面的D，显示为“重设快捷键”，
		按下组合键ctrl+d代替d作为该操作的快捷键，关闭窗口打开终端重新输入带d的命令，
		不再最小化窗口。
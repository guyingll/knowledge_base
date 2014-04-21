## change password

* ubuntu 12.04忘记密码解决办法:启动电脑，按esc或者shift，进入gurb界面，
* 在第一行按e，在linux /boot/vmlinuz 最后一行加入 rw init=/bin/bash
* 然后按ctrl+x或者按F10进入。
* 修改用户密码 passwd 你的用户名，输入两次新密码。
* 按ctrl+alt+delete重启电脑，搞定。看图片。

![change password][1]

[1]:images/修改密码.jpg
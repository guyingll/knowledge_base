## ping命令
Linux系统的ping命令是常用的网络命令，它通常用来测试与目标主机的连通性，我们经常会说“ping一下某机器，看是不是开着”、
不能打开网页时会说“你先ping网关地址192.168.1.1试试”。它通过发送ICMP ECHO_REQUEST数据包到网络主机（send ICMP ECHO_REQUEST to network hosts），
并显示响应情况，这样我们就可以根据它输出的信息来确定目标主机是否可访问（但这不是绝对的）。有些服务器为了防止通过ping探测到，
通过防火墙设置了禁止ping或者在内核参数中禁止ping，这样就不能通过ping确定该主机是否还处于开启状态。

linux下的ping和windows下的ping稍有区别,linux下ping不会自动终止,需要按ctrl+c终止或者用参数-c指定要求完成的回应次数。

1. 命令格式：

        ping [参数] [主机名或IP地址]
2. 命令功能：

        ping命令用于：确定网络和各外部主机的状态；跟踪和隔离硬件和软件问题；测试、评估和管理网络。
        如果主机正在运行并连在网上，它就对回送信号进行响应。每个回送信号请求包含一个网际协议（IP）和 ICMP 头，
        后面紧跟一个 tim 结构，以及来填写这个信息包的足够的字节。缺省情况是连续发送回送信号请求直到接收到中断信号（Ctrl-C）。
        ping 命令每秒发送一个数据报并且为每个接收到的响应打印一行输出。ping 命令计算信号往返时间和(信息)包丢失情况的统计信息，
        并且在完成之后显示一个简要总结。ping 命令在程序超时或当接收到 SIGINT 信号时结束。
        Host 参数或者是一个有效的主机名或者是因特网地址。
3. 命令参数：

        -d 使用Socket的SO_DEBUG功能。
        -f  极限检测。大量且快速地送网络封包给一台机器，看它的回应。
        -n 只输出数值。
        -q 不显示任何传送封包的信息，只显示最后的结果。
        -r 忽略普通的Routing Table，直接将数据包送到远端主机上。通常是查看本机的网络接口是否有问题。
        -R 记录路由过程。
        -v 详细显示指令的执行过程。
        <p>-c 数目：在发送指定数目的包后停止。
        -i 秒数：设定间隔几秒送一个网络封包给一台机器，预设值是一秒送一次。
        -I 网络界面：使用指定的网络界面送出数据包。
        -l 前置载入：设置在送出要求信息之前，先行发出的数据包。
        -p 范本样式：设置填满数据包的范本样式。
        -s 字节数：指定发送的数据字节数，预设值是56，加上8字节的ICMP头，一共是64ICMP数据字节。
        -t 存活数值：设置存活数值TTL的大小。
4. 使用实例：

* 实例1：ping的通的情况

        命令：ping 192.168.120.205
        输出：
        [root@localhost ~]# ping 192.168.120.205
        PING 192.168.120.205 (192.168.120.205) 56(84) bytes of data.
        64 bytes from 192.168.120.205: icmp_seq=1 ttl=64 time=0.720 ms
* 实例2：ping不通的情况

        命令：ping 192.168.120.202
* 实例3：ping网关

        命令：ping -b 192.168.120.1
* 实例4：ping指定次数

        命令：ping -c 10 192.168.120.206
* 实例5：时间间隔和次数限制的ping

        命令：ping -c 10 -i 0.5 192.168.120.206
* 实例6：通过域名ping公网上的站点

        命令：ping -c 5 www.58.com
* 实例7：多参数使用

        命令：ping -i 3 -s 1024 -t 255 192.168.120.206
        说明：
        -i 3 发送周期为 3秒 -s 设置发送包的大小为1024 -t 设置TTL值为 255
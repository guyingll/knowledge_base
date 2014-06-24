#-*- coding:utf-8 -*-

import urllib.request as ur
import re

# 设置代理,不需要代理的此段注释掉
# proxy_support = ur.ProxyHandler({'http': '10.19.110.31:8080'})
# opener = ur.build_opener(proxy_support)
# ur.install_opener(opener)

#设置正则表达式
pattern = re.compile(r'<li[\s\S]+?>#(\d+)<[\s\S]+?img src="(http://.+?)"[\s\S]+?</li>')

#全局变量
url_base = 'http://jandan.net/ooxx/page-%s#comments'
img_set = set()

# range是下载的页码范围
for p in range(900,901):
    url = url_base%p
    data = ur.urlopen(url).read().decode()
    img_list = pattern.findall(data)
    print(p,len(img_list))
    img_set1 = set(img_list)
    img_set = img_set.union(img_set1)
    #当前页不足25张图片，说明是最新一页，退出，不查下一页
    if len(img_list) < 25 : break

print('共有%s张图片'%len(img_set))

for s in img_set:
    try:
        url = s[1]
        gs = s[1].rsplit('.',1)[1]
        # 保存路径和文件名称，命名规则：图片楼层号
        path_1 = 'd://plmm/%s.%s'%(s[0],gs)
        ur.urlretrieve(url,path_1)
        print(path_1,'get !')
    except:
        print(s)

print('下载完成')
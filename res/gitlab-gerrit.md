## 服务安装注意


- 启用root用户：

		sudo passwd root      //修改密码后就启用了。

- 测试replication

		ssh -p 29418 yanpeng@172.26.176.176 replication start --all

### gerrit安装注意设置
- 安装删除插件 delete-project
  
		git clone https://gerrit.googlesource.com/gerrit
		cd gerrit
		git clone https://gerrit.googlesource.com/plugins/delete-project
		buck build delete-project:delete-project
		You should then find the delete-project.jar in buck-out/gen/delete-project/delete-project.jar

- 上面的 url 是用 root 用户来做 Gerrit 的 testgerrit 项目复制到 Gitlab 的 testgerrit 项目中，需要免密码登录，生成密钥

		ssh-copy-id -i cmstest1.pset.suntec.net  # 输入 root 用户密码

- 设置 ~/.ssh/config

		vim ~/.ssh/config
		Host cmstest1.pset.suntec.net:
		    IdentityFile ~/.ssh/id_rsa
		    PreferredAuthentications publickey

- ~/.ssh/known_hosts

		ssh-keyscan -t rsa cmstest1.pset.suntec.net > ~/.ssh/known_hosts
		ssh-keygen -H -f ~/.ssh/known_hosts

- gerrit的root用户需要能够clone gitlab服务器的项目


- 添加用户（注意用户名、邮箱及sshkey要与gitlab的一致）

  		ssh root@172.26.176.176 /opt/lampstack-5.4.28-0/apache2/bin/htpasswd /opt/gerrit/etc/htpasswd.conf username

## 服务端准备

### gitlab准备
1. gitlab上建立需要审核的项目 。

2. clone下来后在项目路径下建立 .gitreview文件； 配置参考如下：host为gerrit服务器地址

		[gerrit]
		host=172.26.176.176
		port=29418
		project=testdemo.git

3. git push入库

4. 设置工程其他成员的权限为reporter（reporter没有提交的权限，强制走gerrit审核流程）

5. 删除gitlab库中/home/git/repositories/yanpeng/testgerrit.git/hooks/update文件


### gerrit准备
1. 建立项目

		ssh -p 29418 yanpeng@172.26.176.176 gerrit create-project testgerrit

2. clone –bare Gitlab 上的仓库到 Gerrit

		cd /opt/gerrit/git
		rm -fr testgerrit.git
		git clone --bare git@cmstest1.pset.suntec.net:yanpeng/testgerrit.git

3. gerrit中添加 replication.config 文件

		vim /opt/gerrit/etc/replication.config
		[remote "testgerrit"]
		  # Gerrit 上要同步项目的名字      
		  projects = testgerrit
		  url = root@cmstest1.pset.suntec.net:/home/git/repositories/yanpeng/testgerrit.git
		  push = +refs/heads/*:refs/heads/*
		  push = +refs/tags/*:refs/tags/*
		  push = +refs/changes/*:refs/changes/*
		  threads = 3

4. 重新load replication插件

		ssh -p 29418 yanpeng@172.26.176.176 gerrit plugin reload replication


###  客户端使用

1. 客户端安装git-review

	1. 安装[python](https://www.python.org/downloads/ "python")
	2. 下载get-pip.py文件，运行python get-pip.py
	3. Add your python scripts directory to the system path
	4. 执行pip install git-review；	
	参考 [pip安装](https://pip.pypa.io/en/latest/installing.html#install-or-upgrade-pip)

2. 从Gitlab中clone工程到本地

3. 做完修改后不要使用git push提交，使用git review提交。



### gerrit使用

1. 代码评审
	正确提交git review后，会在 https://review.openstack.org生成一个review页面。如果你的code还没有完全完成，你可以把你的patch设置为”working in progress”。一旦完成，你就可以增加评审人来评审你的代码。Gerrit支持在线的review，可以针对你提交的每一个文件，到对应的行上边去增加评审意见。一旦有人提交评审意见，你需要尽快的给出你的意见，然后通过”Review”里边的“publish comments”发布你的意见，这样别人就可以看到你的修改情况了。
	如果别人的评审意见你采纳了，这时你修改了你的代码。你需要重新再上传一个patch，让评审人再次评审。

		git commit -a --amend
		git review

	直到没有人再给出评审意见。这时一般Openstack的核心开发人员会批准你的code进入正式仓库。
	如果在你开发过程当中，仓库里边的代码有人提交了新代码，那么你再提交新的patch的时候后出新冲突，这时你要

		git checkout master
		git pull origin master
		git checkout TOPIC-BRANCH
		git rebase -i master

2. 增加依赖

	如果你需要在别人提交的patch的基础上工作

		#fetch config
		git fetch https://review.openstack.org/openstack/nova refs/changes/16/10816/9 && git checkout FETCH_HEAD
		git checkout -b SOMEBRANCHNAME
		git review -R
		注意：-R选项十分重要，否则初始的提交会被错误的修改

	如果你依赖的提交的代码有更新，这时你要

		# check out the parent commit of the depended commit. SHA1 is the commit id. 
		git checkout -b aNewBranch SHA1
		# cherry pick the depended commit
		git fetch https://review.openstack.org/openstack/nova refs/changes/80/28880/40 && git cherry-pick FETCH_HEAD
		# cherry pick your last commit
		git fetch https://review.openstack.org/openstack/nova refs/changes/28/30028/6 && git cherry-pick FETCH_HEAD
		# Do the revisions
		# commit 
		git commit -a --amend
		# submit for review
		git review -R



删除项目

		ssh -p 29418 $yourGerritServer deleteproject delete --help



sql删除

	How to remove group and project in Gerrit ? (2011-01-20 17:48:38)转载▼

Group

	1. access gerrit sql database
	   cmd: ssh -p 29418 150.236.40.165 gerrit gsql
	2. gerrit> delete from ACCOUNT_GROUP_NAMES where name=<group name>;
	3. gerrit> delete from ACCOUNT_GROUPS where name=<group name>;
	
Project

	1. access gerrit sql database
	   cmd: ssh -p 29418 150.236.40.165 gerrit gsql
	2. gerrit> delete from projects where name=<project name>;
	3. gerrit> delete from ref_rights where project_name=<project name>;
	4. go to folder /gerrit/review_site/git, remove <project name>.git
	
Example for remove project:

	Step 1:
	ecdshawk@mtvserver2:/project/ecds/gerrit/review_site/db>ssh -p 29418 150.236.40.165 gerrit gsql
	Welcome to Gerrit Code Review 2.1.6.1
	(H2 1.2.134 (2010-04-23))
	 
	Type '\h' for help.  Type '\r' to clear the buffer.
	 
	gerrit>
	 
	Step 2:
	gerrit> delete from projects where name='rmproject';
	UPDATE 1; 1 ms
	 
	Step 3:
	gerrit> delete from ref_rights where project_name='rmproject';
	UPDATE 1; 1 ms
	
	Step 4:
	ecdshawk@mtvserver2:/project/ecds/gerrit/review_site/git>ls
	fproject.git  rmproject.git
	ecdshawk@mtvserver2:/project/ecds/gerrit/review_site/git>rm -rf rmproject.git/
	ecdshawk@mtvserver2:/project/ecds/gerrit/review_site/git>ls
	fproject.git
	
	Note: The projects is removed from database with Gerrit version 2.2. The method is simply. Delete project folder from Gerrit repo folder directly and restart Gerrit service.






htpasswd.cgi 网页远程修改gerrit ht 认证的密码文件
在搭建gerrit系统时，一般都会采用apache的.htacces 认证方法 但trac本身并不提供修改密码的功能，修改密码只能通过htpasswd/htpasswd2命令来进行，这的确是一件相当不make sense的事。
其实，利用一个免费的perl脚本可以方便的通过http方式修改apache的认证文件。
　 文件名：htpasswd.pl,获取地址http://home.xnet.com/~efflandt/pub/htpasswd.pl
该脚本可以通过web浏览器从你的htpasswd文件直接增加或者删除用户，管理者密码是经过加密的。该脚本本身并不保护一个目录，也不创建一个口令保护功能。它仅用来帮助你管理你的口令文件。这就是说在你的服务器上事先应有口令文件时，该脚本方可发挥作用。
 
安装&配置

1.拷贝htpasswd.pl至cgi-bin目录
linux对应 /var/www/cgi-bin
suse对应/srv/www/cgi-bin
fedora对应/var/www/cgi-bin
或者放置在例如如/usr/lib 的任意位置，不过需要在apache的配置文件vi /etc/apache2/sites-available/default添加：
ScriptAlias /cgi-bin/ /usr/lib/cgi-bin/
    <Directory "/usr/lib/cgi-bin">
        AllowOverride None
        Options +ExecCGI -MultiViews +SymLinksIfOwnerMatch
        Order allow,deny
        Allow from all
    </Directory>

2.改名
把htpasswd.pl改名为htpasswd.cgi
3.用文本编辑器打开配置脚本(cfg.pl) 
编辑如下变量： 
#!/usr/local/bin/perl 修改为 #!/bin/perl
配置要修改的apache认证文件,找到以下几行
# Password file with full system path (where not accessible by URL).
$file = '/home/gerrit/gerrit.passwd'; 修改为你的验证文件是/etc/apache2/auth-file 
step4 chmod 755 htpasswd.cgi

已经配置搭建好apache的话，访问http://localhost/cgi-bin/htpasswd.cgi即可出现密码修改页面
#!/usr/bin/perl  

# htpasswd.cgi by David Efflandt (efflandt@xnet.com) 8/97
# Last update 10/4/99
#
# Update password file from the web for use with user authentication.
# Stores each line in the format: username:crypted_password
#
# Built-in form is provided if you GET the script.
# Form is processed if you POST to this script.
#
# If you want your passwords to be secure, it is best to run this
# suid as you (chmod 4705 htpasswd.cgi) which may require C wrapper.
# Also keep this script in a directory that requires user authentication
# unless you allow new users to set their own password (see $allow_new).
#
# If not running suid you should touch the password file first and
# chmod 606 (or whatever is req'd to access it as you and webserver).
#
# To add or remove users by an administrator, create a user called 'admin'
# with a password.  Enter username you want to add or remove with admin
# password as "Current Password" (plus new passwords for new users).
#
# Anyone may remove their own name from the password file if they supply
# their correct password.

### Variables

# Password file with full system path (where not accessible by URL).
$file = '/home/gerrit/gerrit.passwd';

# Allow anyone to add new users (1 = yes, 0 = no)
$allow_new = 0;

# Set untainted path for suid scripts
$ENV{PATH} = '/bin:/usr/bin:/usr/local/bin';
$ENV{IFS} = "" if $ENV{IFS} ne "";

### End of Variables

# Create form and exit on GET
&make_form unless ($ENV{'REQUEST_METHOD'} eq "POST");

# Get POST input
read(STDIN, $buffer, $ENV{'CONTENT_LENGTH'});

# Split the name-value pairs
@pairs = split(/&/, $buffer);

foreach $pair (@pairs)
{
  ($name, $value) = split(/=/, $pair);

  $value =~ tr/+/ /;
  $value =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack("C", hex($1))/eg;
  $name =~ tr/+/ /;
  $name =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack("C", hex($1))/eg;

  $FORM{$name} = $value;
}

if ($FORM{user}) {
  $user = $FORM{user};
} else {
  &error("Error", "Username missing from form.");
}
$pwd = $FORM{old};
$command = $FORM{command};
unless (($command eq 'remove')
    ||($FORM{new} && $FORM{new} eq $FORM{new2})) {
  &error("Password Mismatch", "New password mismatch or missing.");
}

# Get existing passwords
if (-e $file) {
  open (IN, $file) or &error("Error", "Can't open password file: $!");
  flock(IN,2);
  seek(IN,0,0);
  while (<IN>) {
    chomp;
    ($name, $value, $tail) = split(/:/, $_, 3);
    $hash{$name} = $value;
    $tail{$name} = $tail; # maintain any additional fields
  }
  close IN;
}

# Salt for crypt
@range = ('0'..'9','a'..'z','A'..'Z','.','/');
srand ( time() ^ ($$ + ($$ << 15)) );
$salt = $range[rand(int($#range)+1)] . $range[rand(int($#range)+1)];

# Check for valid password or existing user
$pass = $hash{$user} if $hash{$user};
$cpwd = crypt($pwd, $pass);
$admin = $hash{admin} && crypt($pwd, $hash{admin}) eq $hash{admin};

if (($command ne 'new') && ($admin || $pass && $cpwd eq $pass)) {
  if ($command eq 'remove') {
    delete($hash{$user}); delete($tail{$user});
    $msg = "User <B>$user</B> was removed from password file.";
  } elsif (!$pass) {
    $msg = "WARNING! 'Change Password' checked for non-existing user?\n"
    . "<P>Assigning password for new user <B>$user</B> anyway.\n"
    . "<P>If this was an error, go back and 'Remove User'";
  } else {
    $msg = "Password has been updated for $user.";
  }
} elsif ($FORM{command} eq 'new') {
  if ($pass) {
    &error("Sorry", "User <B>$user</B> is already assigned.");
  }elsif ($allow_new || $admin) {
    $msg = "Password has been assigned for new user $user.";
  } else {
    &begin_html("Sorry, New User");
    print "Contact file owner for password you can change later.";
    &end_html;
    exit;
  }
} else {
  &error("Password Error", 
    "Invalid user or password or forgot to check 'New User'.");
}

# Assign new password to user and write to file
$hash{$user} = crypt($FORM{new}, $salt) if $command ne 'remove';
if (open(OUT, ">$file")) {
  flock(OUT,2);
  seek(OUT,0,0);
  foreach $name (sort keys %hash) {
    print OUT "$name:$hash{$name}";
    print OUT ":$tail{$name}" if $tail{$name};
    print OUT "\n";
  }
} else {
  &error("Error","Can't update password file: $!");
}

# Print Return HTML
&begin_html("Thank You");
print "$msg\n";
&end_html;

### Subroutines

#subroutine begin_html(title)
sub begin_html {
  local ($title) = @_;
  print "Content-type: text/html\n\n";
  print "<html><head><title>$title</title></head><body>\n";
  print "<center><h1>$title</h1></center>\n<hr><p>\n";
}

#subroutine end_html
sub end_html {
# Add footer links here
  print "<P></body></html>\n";
}

#subroutine make_form
sub make_form {
  &begin_html("Change password for Gerrit");

print <<NEW_FORM;
Use this form to change your password for access to Gerrit code review system.

<FORM METHOD="POST" ACTION="$ENV{SCRIPT_NAME}">

<DL>
<DT> Username: 
<DD><INPUT NAME="user">

<DT> Current Password: 
<DD><INPUT TYPE=PASSWORD NAME="old">

<DT> New Password: 
<DD><INPUT TYPE=PASSWORD NAME="new">

<DT> Confirm New Password: 
<DD><INPUT TYPE=PASSWORD NAME="new2">

<DT>Request:
<DD>
  <INPUT TYPE="radio" NAME="command" VALUE="change" CHECKED> Change Password
</DL>

<P><INPUT TYPE="submit" VALUE=" Submit ">
</FORM>
NEW_FORM
  &end_html;
  exit;
}

sub error {
  local($title,$msg) = @_;
  &begin_html($title);
  print "<P>$msg\n";
  print "<P>Please check your name and re-enter passwords.\n";
  &end_html;
  exit;
}







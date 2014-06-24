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
$file = '/opt/gerrit/etc/htpasswd.conf';

# Allow anyone to add new users (1 = yes, 0 = no)
$allow_new = 1;

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
  &begin_html("Regist Or Change password for Gerrit");

print <<NEW_FORM;
<h3 id="title3">Use this form to add user for access to Gerrit code review system.</h3>

<FORM METHOD="POST" ACTION="$ENV{SCRIPT_NAME}">

<DL>
<DT> Username: 
<DD><INPUT NAME="user">

<DT name="curPwd" style="display:none"> Current Password: 
<DD name="curPwd" style="display:none"><INPUT TYPE=PASSWORD NAME="old">

<DT> New Password: 
<DD><INPUT TYPE=PASSWORD NAME="new">

<DT> Confirm New Password: 
<DD><INPUT TYPE=PASSWORD NAME="new2">

<DT>Request:
<DD>
  <INPUT id="rd_newuser" TYPE="radio" NAME="command" VALUE="new" CHECKED> New User
  <INPUT id="rd_changePwd" TYPE="radio" NAME="command" VALUE="change"> Change Password
</DL>

<P><INPUT TYPE="submit" VALUE=" Submit ">
</FORM>

<script>

var rd_changePwd = document.getElementById("rd_changePwd"), 
  title3 = document.getElementById("title3"), 
  rd_newuser = document.getElementById("rd_newuser"), 
  curPwd = document.getElementsByName("curPwd");

rd_newuser.onchange = rd_changePwd.onchange = function() {
  var value = this.value;
  if(value==="change") {
    for (var i=0, cnt=curPwd.length; i<cnt; i++) {
      curPwd[i].style.display = "";
    }

    title3.innerHTML="Use this form to change your password for access to Gerrit code review system."
  } else {
    for (var i=0, cnt=curPwd.length; i<cnt; i++) {
      curPwd[i].style.display = "none";
    }
    title3.innerHTML="Use this form to add user for access to Gerrit code review system."
  }
}


</script>
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

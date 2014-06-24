@echo off
if "%1"=="" (goto :error)
if "%1"=="/?" (goto :help)
if "%1"=="/help" (goto :help)
if "%2"=="" (goto :error)

set "flag=0"
if "%3"=="ant" (set "flag=1")

set projectPath=%2
set cpktool="%1/tools/WebCPKTool/cpktool-exec/cpktool.win32.x86.exe"

if not exist "%cpktool%" (goto :sdkpatherror)
for /f "delims=" %%a in ("%2") do (
	set "projectName=%%~nxa"
)

set yuicompressorpath="%1/tools/webtools/yuicompressor_2_4_8_jar"

set nowpath=%cd%

cd /d %projectPath%
rd /s/q gen
mkdir gen\package\chrome\content gen\package\chrome\skin
set srcpath="web"

echo %flag%
if "%flag%"=="1" (
if not exist "%yuicompressorpath%" (goto :yuicompressorpatherror)
call ant -Dyuicompressor="%yuicompressorpath%"
echo ant commpressor success
set srcpath="build"
)

xcopy %srcpath% gen\package\chrome\content /e /y /q
xcopy res gen\package\res /e /y /q

copy  nutshell.mk   gen\package\
copy  Manifest.xml   gen\package\
copy  README   gen\package\
%cpktool% -a "%projectPath%\gen\%projectName%" -u ngi.root.dev -e "%projectPath%\gen\package" 
echo gen cpk success
goto :end

:help
echo package project to cpk
echo    ##########################################################################
echo    first  args   pathtoiAutoSDK -- the path to iAutoSDK
echo    second args   pathtoproject  -- the path to project
echo    third  args   ant  -- if use the ant compress the source (default not use)
echo    e.g.  genCpk.cmd pathtoiAutoSDK pathtoproject ant
echo    ##########################################################################
goto :end

:error
echo please use the cmd like this:   
echo        "genCpk.cmd pathtoiAutoSDK pathtoproject"
echo use "genCpk.cmd /?" to see the help doc
goto :end

:sdkpatherror
echo cpktool error!!
echo Can't find the cpktool,please check the iAutoSKD Path
goto :end

:yuicompressorpatherror
echo yuicompressor error!!
echo Can't find the yuicompressor.jar,please email ruanhaiqiang@pset.suntec.net
goto :end

:end
echo %nowpath%
cd /d %nowpath%
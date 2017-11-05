@echo off
set /p frage=Sleep Timer starten? (y/n)
if %frage%==n (GOTO:EOF)
set /p time=Bitte Sleep-Zeit eintragen(suffix *s*econds, *M*inutes, *h*ours)

REM if the last character of time is "s", set factor to 1, nosuffix to false; if statement not true set nosuffix to true
If %time:~-1%==s set factor=1 && set nosuffix=false  || set nosuffix=true 
If %time:~-1%==m set factor=60 && set nosuffix=false  || set nosuffix=true
If %time:~-1%==h set factor=360 && set nosuffix=false || set nosuffix=true

echo %time%

If %nosuffix%==true set factor=60 ELSE (echo error)

set /A timeS=%time:~0,-1%*%factor%
REM %time:time=timeS%

REM timeout /T /NOBREAK %time%
if %frage%==y (Shutdown /s /t %timeS%)
pause >nul

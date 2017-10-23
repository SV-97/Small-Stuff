@echo off
set /p pfad=Pfad Hauptverzeichnis adb(Standart C:\adb) 
if defined %pfad% (GOTO:EOF)
if %pfad%==nul ( set %pfad% = "C:\adb" )
cd %pfad%
adb devices
echo "ggf. Verbindung am Handy akzeptieren"
timeout /T 10
adb devices
adb shell
pm unistall -k --user 0 net.oneplus.odm
exit
exit

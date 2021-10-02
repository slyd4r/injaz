call ionic cordova build android --prod --release 
call pause
call cd platforms\android\app\build\outputs\apk\release
call echo about to sign the app
call pause 
call jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore C:\Users\slyd4r\Documents\dev\mahotpass.keystore app-release-unsigned.apk slyd4r
call zipalign -v 4 app-release-unsigned.apk app-release-signed.apk
call echo done successfull
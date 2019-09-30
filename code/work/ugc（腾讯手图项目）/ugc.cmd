del /s/q ugcFeedback.zip
mkdir ugcFeedback
xcopy dist\*.* ugcFeedback\ /s /e /y
7z a ugcFeedback.zip ugcFeedback
rmdir /s/q ugcFeedback
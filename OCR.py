#!/usr/bin/env python
# coding: utf-8
import numpy as np
import cv2
import pytesseract
import re
import sys 


#開啟網路攝影機
cap = cv2.VideoCapture(0)

while(cap.isOpened()):
    #讀取影像
    ret, frame = cap.read()
    
    kernel = np.ones((5, 5), np.uint8)
    frame = cv2.morphologyEx(frame, cv2.MORPH_OPEN, kernel, iterations=2)
    
    frame = cv2.blur(frame, (5, 5))
    
    ret, thresh = cv2.threshold(frame, 220, 255, cv2.THRESH_BINARY_INV)
    
    #若讀取至影片結尾，則跳出
    if not ret:
        print("Can't receive frame (stream end?). Exiting ...")
        break
        
    #顯示偵測影像
    cv2.imshow('frame', thresh)
    
    pytesseract.pytesseract.tesseract_cmd = r'Tesseract-OCR\tesseract.exe'
    #指定tesseract.exe執行檔位置
    text = pytesseract.image_to_string(thresh, lang='eng') #讀英文
    
    if(re.compile('[Oo0-9]+').match(text) != None):
        text = int((re.findall('[Oo0-9]+', text))[0].lower().replace("o", "0"))
        print(text)
        break
   
    #為每一毫秒偵測是否有從鍵盤輸入的訊號
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
        
cap.release()
cv2.destroyAllWindows()

sys.stdout.flush()





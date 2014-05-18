[![Stories in Ready](https://badge.waffle.io/the-lay/comfy-home.png?label=ready&title=Ready)](https://waffle.io/the-lay/comfy-home)
homemade-smart-home
===================
DIY smarthome   
Expecting some kind of beta in the beginning of June 2014.


Old readme
==

**Now:**  
*Early pre-pre-pre-prototype.*  
Arduino as node with temperature sensor. 
Raspberry Pi as base station with SQLite DB to store sensor values. Both have nRF24L01.

**TODO:**  
Software side:  
* Web frontend for Pi (more than just one graph) - Probably switch to another framework stack too
* Switch to another DB. SQLite isn't great for more than one concurrent query (table locking and stuff)

Hardware side:  
* ATMegas as nodes  
* Add more types of nodes, actuators and more different sensors  

Organization side:  
* Rename repo (probably easier to make another one)
* Add instructions on how to install all this to README file
* Add description to project
* Documentation
* Trello board? Mind map?

**Ideas:**  
Technical:
* Write it on Go language? it can be hipster cool. Note to myself - look at https://github.com/ktoso/go-home-raspberry and https://github.com/davecheney/gpio . Binding with C - I won't have to rewrite nRF24L01 library - plausible. No dependencies for Pi. Sounds good, should research. Dave Cheney's GPIO should provide easier access directly to GPIO. Also: https://github.com/galaktor/gorf24

General:
* Multiple room speakers
* Microphones, speech detection (who we are kidding here?)
* NFC/RFID reader to monitor who's home
* light control with regards to day of the year, time, current weather and presence of habitants


Used libraries
--------------
[github.com/stanleyseow/RF24](https://github.com/stanleyseow/RF24) - for Arduino and Pi communication with nRF24L01.  
[Dalla Temperature Control](http://www.milesburton.com/?title=Dallas_Temperature_Control_Library) and [OneWire](http://www.pjrc.com/teensy/td_libs_OneWire.html) - for easy polling temperature from DS18B20 temperature sensor.

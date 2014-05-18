/*
 * Code for sensor node
 */
//Includes
#include <SPI.h>
#include "nRF24L01.h"
#include "RF24.h"
#include <OneWire.h>
#include "dataStruct.h"
#include "DallasTemperature.h"

//Set up radio pins
RF24 radio(9, 10);

//Setting up DS18B20
OneWire oneWire(7);
DallasTemperature sensors(&oneWire);

//NodeID
const float nodeId = 1.f;

//Radio pipe addresses
const uint64_t pipes[2] = {0xF0F0F0F0E1LL, 0xF0F0F0F0D2LL};

void setup(void) {
  Serial.begin(57600);
  Serial.println("Sensor node");

  //Sensor
  sensors.begin();

  //Radio settings
  radio.begin();
  radio.setRetries(15, 15);
  radio.setChannel(76);

  radio.openWritingPipe(pipes[0]);
  radio.openReadingPipe(1, pipes[1]);
  radio.startListening();
  Serial.println("Setup successful");
}

void loop(void) {
  
  radio.stopListening();
  sensors.requestTemperatures();

  data_t message;
  message.netID = 11075.f;
  message.nodeID = nodeId;
  message.valueType = 1.f;
  message.value = sensors.getTempCByIndex(0);

  if (!radio.write(&message, sizeof(message))) {
    Serial.println("Sending failed! Retrying...");
    byte counter = 0;
    bool done = false;
    while(counter < 15 && !done) {
      done = radio.write(&message, sizeof(message));
      counter++;
      delay(50);
    }
    if (done) {
      Serial.println("Retry was successful!");
    } else {
      Serial.println("I tried my best :(");
    }
  }

  radio.startListening();
  if (radio.available()) {
    //Place holder for future use?
    //If not - remove radio listening
    Serial.println("Got something");
  }

  delay(10000); //10 minutes
}
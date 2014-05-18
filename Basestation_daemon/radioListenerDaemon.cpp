/*
 * Code for radio listener daemon.
 * Listens to radio and on new (correct) message writes it to local SQLite DB
 */
//Includes
#include <cstdlib>
#include <unistd.h>
#include <string>
#include <sstream>
#include <iostream>
#include "/home/pi/RF24/librf24-rpi/librf24/RF24.h"
#include "dataStruct.h"
#include <sqlite3.h>
using namespace std;

//Set up radio 
RF24 radio("/dev/spidev0.0", 8000000, 25);

//Radio pipe addresses
const uint64_t pipes[2] = {0xF0F0F0F0E1LL, 0xF0F0F0F0D2LL};

void radioSetup() {
  radio.begin();
  radio.setRetries(15, 15);
  radio.setChannel(0x4c); //76
  radio.setPALevel(RF24_PA_MAX);
  radio.setPALevel(RF24_PA_MAX);

  radio.openWritingPipe(pipes[0]);
  radio.openReadingPipe(1, pipes[1]);
  radio.startListening();
  radio.printDetails();
  printf("Radio setup is complete!\n");
}

static int callback(void *NotUsed, int argc, char **argv, char **azColName){
  int i;
  for(i=0; i<argc; i++){
    printf("%s = %s\n", azColName[i], argv[i] ? argv[i] : "NULL");
  }
  printf("\n");
  return 0;
}

int main() {
  data_t receivedMessage; //temporary packet storage
  sqlite3 *db; //database
  char *zErrMsg = 0; //database error message

  //Connecting to DB
  if (sqlite3_open("sensorData.db", &db)) {
    printf("Can't open database: %s\n", sqlite3_errmsg(db));
    exit(0);
  } else {
    printf("Everything's okay, folks! Database up!\n\r");
  }

  //Radio setup
  radioSetup();

  while(1) {
    if (radio.available()) {
      radio.read(&receivedMessage, sizeof(data_t));

      //Debug stuff
      printf("netID: %i, nodeID: %i, valueType: %i, value: %f \n", 
        (int)receivedMessage.netID, (int)receivedMessage.nodeID, 
        (int)receivedMessage.valueType, receivedMessage.value);

      //Write to DB
      stringstream ss; 
      ss << "INSERT INTO SENSORDATA (NETID, NODEID, VALUETYPE, VALUE) VALUES ("
         << (int)receivedMessage.netID << ", " << (int)receivedMessage.nodeID << ", "
         << (int)receivedMessage.valueType << ", " << receivedMessage.value << ");"; 
         //sql injection security is overradted
      string sql = ss.str(); //that's definitely not pretty, use just str.append()??

      if (sqlite3_exec(db, sql.c_str(), callback, 0, &zErrMsg) != SQLITE_OK) {
        printf("SQL error: %s\n", zErrMsg);
        sqlite3_free(zErrMsg);
      } else {
        //Debug stuff
        printf("Insert successful, folks!\n");
      }

    }
  }

  //wait, we'll never reach here. out of the loop man, out of the loop man,,
  sqlite3_close(db);
}
# comfy-home
### DIY Smarthome

What's here
==
**Currently:**  
Backend to MongoDB and frontend for endusers.

**In plans:**   
What's now + node's code + raspberry daemon.

How to get it running
==
- Install Mongo.   
- Install Sails.js - `sudo npm install sails@beta -g` Beta because Sails 0.9 don't support model association.  
- Clone this repo.  
- `npm install` `bower install`  
- Modify connection settings for Mongo, if needed - `config/adapters.js`
- `sails lift`

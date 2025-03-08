// const path = require('path');
// TODO : fix the import to take from ../src/common/constants/migrationConstants instead of using the constants here
// const { USER_SETTINGS_COLLECTION } = require(path.resolve(__dirname, '../src/common/constants/migrationConstants'));
const USER_SETTINGS_COLLECTION = "userSettings";

module.exports = {
  async up(db, client) {
    const collections = await db.listCollections({ name: USER_SETTINGS_COLLECTION }).toArray();
    if (collections.length === 0) {
      await db.createCollection(USER_SETTINGS_COLLECTION, {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            properties: {
              _id: { bsonType: "objectId", description: "Unique identifier" },
              recieveNotifications: { bsonType: "bool", description: "Does user wants to recieve notifications" },
              recieveEmails: { bsonType: "bool", description: "Does user wants to recieve emails" },
              recieveSMS: { bsonType: "bool", description: "Does user wants to recieve SMS" }, 
              createdAt: { bsonType: "date", description: "Timestamp of creation" },
              updatedAt: { bsonType: "date", description: "Timestamp of last update" }
            }
          }
        }
      });
      
      console.log(`✅ '${USER_SETTINGS_COLLECTION}' collection created successfully with indexes.`);
    } else {
      console.log(`⚠️ '${USER_SETTINGS_COLLECTION}' collection already exists, skipping creation.`);
    }
  },

  async down(db, client) {
    const collections = await db.listCollections({ name: USER_SETTINGS_COLLECTION }).toArray();
    if (collections.length > 0) {
      await db.collection(USER_SETTINGS_COLLECTION).drop();
      console.log(`❌ '${USER_SETTINGS_COLLECTION}' collection dropped.`);
    } else {
      console.log(`⚠️ '${USER_SETTINGS_COLLECTION}' collection does not exist, skipping drop.`);
    }
  }
};

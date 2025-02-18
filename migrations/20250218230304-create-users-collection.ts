const path = require('path');
// TODO : fix the import to take from ../src/common/constants/migrationConstants instead of using the constants here
// const { USERS_COLLECTION } = require(path.resolve(__dirname, '../src/common/constants/migrationConstants'));
const USERS_COLLECTION = "users";

module.exports = {
  async up(db, client) {
    const collections = await db.listCollections({ name: USERS_COLLECTION }).toArray();
    if (collections.length === 0) {
      await db.createCollection(USERS_COLLECTION, {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: ["firstName", "lastName", "email", "passwordHash", "role", "createdAt", "updatedAt"],
            properties: {
              _id: { bsonType: "objectId", description: "Unique identifier" },
              firstName: { bsonType: "string", description: "First name of the user" },
              lastName: { bsonType: "string", description: "Last name of the user" },
              email: { bsonType: "string", pattern: "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$", description: "Email address" },
              passwordHash: { bsonType: "string", description: "Hashed password" },
              role: { bsonType: "string", enum: ["user", "admin"], description: "User role" },
              createdAt: { bsonType: "date", description: "Timestamp of creation" },
              updatedAt: { bsonType: "date", description: "Timestamp of last update" }
            }
          }
        }
      });

      // Create the necessary indexes
      await db.collection(USERS_COLLECTION).createIndex({ email: 1 }, { unique: true });
      await db.collection(USERS_COLLECTION).createIndex({ role: 1 });
      await db.collection(USERS_COLLECTION).createIndex({ createdAt: 1 });
      await db.collection(USERS_COLLECTION).createIndex({ updatedAt: 1 });
      
      console.log(`✅ '${USERS_COLLECTION}' collection created successfully with indexes.`);
    } else {
      console.log(`⚠️ '${USERS_COLLECTION}' collection already exists, skipping creation.`);
    }
  },

  async down(db, client) {
    const collections = await db.listCollections({ name: USERS_COLLECTION }).toArray();
    if (collections.length > 0) {
      await db.collection(USERS_COLLECTION).drop();
      console.log(`❌ '${USERS_COLLECTION}' collection dropped.`);
    } else {
      console.log(`⚠️ '${USERS_COLLECTION}' collection does not exist, skipping drop.`);
    }
  }
};
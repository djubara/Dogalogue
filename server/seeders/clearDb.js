import * as models from "../models/index.js"

export async function clearDb(db, modelName, collectionName) {
    try {
        let modelExists = await models[modelName].db.db.listCollections({
          name: collectionName
        }).toArray()
    
        if (modelExists.length) {
          await db.connection.dropCollection(collectionName);
        }
      } catch (err) {
        throw err;
      }
}
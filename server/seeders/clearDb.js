import models from "../models"

export async function clearDb(db, modelName, collectionName) {
    try {
        let modelExists = await models[modelName].db.db.listCollections({
          name: collectionName
        }).toArray()
    
        if (modelExists.length) {
          await db.dropCollection(collectionName);
        }
      } catch (err) {
        throw err;
      }
}
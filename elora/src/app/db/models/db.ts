import { getMongoClientInstance } from "../config";
import { NAME_BD } from "./constants";

export const getBD = async () => {
    const client = await getMongoClientInstance()
    const db = client.db(NAME_BD)

    return db
}
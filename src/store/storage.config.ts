import {createStorage} from "@/utils"
import type {StorageType,IndexedDBOptions} from "@/utils"


const options:IndexedDBOptions = {
    dbName:"Turnip-Vue3",
    storeName:"Pinia_Store",
    version:1,
    expire:0
}

const storageType:StorageType = "indexedDB";
export const LSInstance = createStorage(storageType,options)

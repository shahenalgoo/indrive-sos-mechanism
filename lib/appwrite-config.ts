/**
 * Appwrite Client SDK Configuration
 * 
 */

import { Client, Account, Databases, Storage, Functions } from 'appwrite';


/**
 * Assign Appwrite IDs
 * 
 */
export const AppwriteIds = {
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
    sosReqId: process.env.NEXT_PUBLIC_COLLECTION_SOSREQ_ID as string,
    messagesId: process.env.NEXT_PUBLIC_COLLECTION_MESSAGES_ID as string
}


/**
 * Initiate Appwrite client
 * 
 */
export const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);


/**
 * Initiate Account
 * 
 */
export const account = new Account(client);


/**
 * Initiate Database
 * 
 */
export const databases = new Databases(client);


/**
 * Initiate Functions
 * 
 */
export const functions = new Functions(client);


/**
 * Initiate Bucket
 * 
 */
export const storage = new Storage(client);
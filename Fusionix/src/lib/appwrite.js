import { Client, Account, Avatars, Databases } from "appwrite";

/**
 * Initialize Appwrite Client
 */
const client = new Client();

const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const endpoint = "https://cloud.appwrite.io/v1";

client
  .setProject(projectId) // Set the project ID from environment variables
  .setEndpoint(endpoint); // Set the endpoint

// console.log("Appwrite Project ID:", projectId); // Debugging

/**
 * Initialize Appwrite Account
 */
const account = new Account(client);

/**
 * Intial appwrite avatars
 */

 export const avatars = new Avatars(client);

/**
 * Initial appwrite databases
 */
export const databases = new Databases(client);

export default account;

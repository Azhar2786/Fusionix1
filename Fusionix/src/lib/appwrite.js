import { Client, Account, Avatars, Databases } from "appwrite";

// Use environment variables for security
const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Appwrite Cloud endpoint
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);

export default account;

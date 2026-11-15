import { Client, Account, Databases } from "appwrite";

const endpoint =
  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://sfo.cloud.appwrite.io/v1";
const projectId =
  process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "6ad0f8ab0025a03812f7";

const client = new Client().setEndpoint(endpoint).setProject(projectId);

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };

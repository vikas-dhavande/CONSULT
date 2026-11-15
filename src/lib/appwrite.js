import { Client, Account, Databases } from "appwrite";

const client = new Client()
  .setEndpoint("https://sfo.cloud.appwrite.io/v1")
  .setProject("6ad0f8ab0025a03812f7");

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };

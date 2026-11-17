import { Client, Account, Databases, Teams, ID } from "appwrite";

const endpoint =
  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://sfo.cloud.appwrite.io/v1";
const projectId =
  process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "6ad0f8ab0025a03812f7";
const databaseId =
  process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "6ad10e56000c6dabf276";

const client = new Client().setEndpoint(endpoint).setProject(projectId);

const account = new Account(client);
const databases = new Databases(client);
const teams = new Teams(client);

/**
 * Save lead or chat inquiry
 * Attempts to save to Appwrite, falls back safely to localStorage
 */
async function saveCalculatorLead({
  email,
  name = "",
  company = "",
  phone = "",
  calculatorType = "chat_inquiry",
  score = null,
  metrics = {},
}) {
  const timestamp = new Date().toISOString();
  const leadPayload = {
    email,
    name,
    company,
    phone,
    calculatorType,
    score: score !== null ? parseFloat(score) : null,
    metrics: typeof metrics === "string" ? metrics : JSON.stringify(metrics),
    timestamp,
  };

  try {
    const response = await databases.createDocument(
      databaseId,
      "leads",
      ID.unique(),
      leadPayload
    );
    return { success: true, id: response.$id, source: "appwrite" };
  } catch (err) {
    if (typeof window !== "undefined") {
      try {
        const local = JSON.parse(localStorage.getItem("consulting_leads") || "[]");
        local.push({ ...leadPayload, id: "local_" + Date.now() });
        localStorage.setItem("consulting_leads", JSON.stringify(local));
      } catch (storageErr) {
        console.error("Local storage error:", storageErr);
      }
    }
    return { success: true, id: "local_" + Date.now(), source: "local", note: err.message };
  }
}

export { client, account, databases, teams, saveCalculatorLead, databaseId };

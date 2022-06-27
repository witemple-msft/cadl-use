import { DefaultAzureCredential } from "@azure/identity";

import { analyzeSentiment } from "./analyzeSentiment.js";

import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";
import { getSecret } from "./getSecret.js";
dotenv.config();

const keyvaultUrl = new URL(process.env.KEYVAULT_URL ?? "<endpoint>");

const languageUrl = new URL(process.env.LANGUAGE_URL ?? "<language endpoint>");

const credential = new DefaultAzureCredential();

const { value: languageApiKey } = await getSecret(
  keyvaultUrl,
  credential,
  "ta-key",
  "7.3"
);

if (!languageApiKey) {
  throw new Error("Unable to retrieve language API key from KeyVault");
}

const sentimentResult = await analyzeSentiment(
  languageUrl,
  new AzureKeyCredential(languageApiKey),
  {
    documents: [
      {
        id: "1",
        text: "Wow! I am so impressed with Cadl's capabilities. It really makes me smile.",
        language: "en",
      },
    ],
  },
  { opinionMining: true, stringIndexType: "Utf16CodeUnit" }
);

const sentences = sentimentResult.documents.find(
  (d) => d.id === "1"
)?.sentences;

for (const sentence of sentences ?? []) {
  console.log(`(${sentence.sentiment}) "${sentence.text}"`);

  for (const assessment of sentence.assessements ?? []) {
    console.log(`- Assessed: (${assessment.sentiment}) ${assessment.text}`);
  }
}

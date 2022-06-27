import { DefaultAzureCredential } from "@azure/identity";
import { getSecret } from "./getSecret.js";
import { setSecret } from "./setSecret.js";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = new URL(process.env.KEYVAULT_URL ?? "<endpoint>");

const credential = new DefaultAzureCredential();

const setResult = await setSecret(endpoint, credential, "test-secret", "7.3", {
  value: "test-value" + new Date().toISOString(),
  tags: {
    foo: "bar",
  },
});

const getResult = await getSecret(endpoint, credential, "test-secret", "7.3");

console.log(getResult.value);

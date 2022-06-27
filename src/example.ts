import { DefaultAzureCredential } from "@azure/identity";
import { setSecret } from "./setSecret";

const endpoint = new URL(process.env.KEYVAULT_ENDPOINT ?? "<endpoint>");

const credential = new DefaultAzureCredential();

const result = await setSecret(endpoint, credential, "test-secret", "7.3", {
  value: "test-value" + new Date().toISOString(),
  tags: {
    foo: "bar",
  },
});

console.log(result.json());

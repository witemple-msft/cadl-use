import type { TokenCredential } from "@azure/identity";
interface SetSecretRequestBody {
    value: string;
    contentType?: string;
    tags?: {
        [k: string]: string;
    };
}
export declare function setSecret(baseUrl: URL, credential: TokenCredential, name: string, apiVersion: "7.3", body: SetSecretRequestBody): Promise<Response>;
export {};
//# sourceMappingURL=setSecret.d.ts.map
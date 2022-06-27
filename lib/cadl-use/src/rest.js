import { getAllRoutes } from "@cadl-lang/rest/http";
export function getRestOperationDefinition(program, operation) {
    const [routes, _diagnostics] = getAllRoutes(program);
    const [info] = routes.filter((r) => r.operation === operation);
    if (!info) {
        throw new Error("No route for operation.");
    }
    return info;
}
//# sourceMappingURL=rest.js.map
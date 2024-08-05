import { type SchemaTypeDefinition } from "sanity";

import service from "./schemaTypes/servicevice";
import benefit from "./schemaTypes/benefitefit";
import order from "./schemaTypes/orderrder";

export const schemaTypes: { types: SchemaTypeDefinition[] } = {
  types: [service, benefit, order],
};

import { type SchemaTypeDefinition } from "sanity";

import service from "./service";
import benefit from "./benefit";
import order from "./order";

export const schemaTypes: { types: SchemaTypeDefinition[] } = {
  types: [service, benefit, order],
};

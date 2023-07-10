import { type SchemaTypeDefinition } from "sanity";

import service from "./schemas/service";
import benefit from "./schemas/benefit";
import order from "./schemas/order";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [service, benefit, order],
};

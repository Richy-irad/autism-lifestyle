import { createClient } from "@sanity/client";

import { apiVersion, dataset, projectId, token, useCdn } from "../env";

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  token,
  useCdn,
});

export const writeClient = createClient({
  apiVersion,
  dataset,
  projectId,
  token,
  useCdn,
});

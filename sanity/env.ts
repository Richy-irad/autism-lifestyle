export const apiVersion =
  process.env.SANITY_STUDIO_API_VERSION || "2023-06-08";

export const dataset = assertValue(
  process.env.SANITY_STUDIO_DATASET,
  "Missing environment variable: SANITY_STUDIO_DATASET"
);

export const projectId = assertValue(
  process.env.SANITY_STUDIO_PROJECT_ID,
  "Missing environment variable: SANITY_STUDIO_PROJECT_ID"
);

export const useCdn = false;

export const token = assertValue(
  process.env.SANITY_STUDIO_API_TOKEN,
  "Missing API token: SANITY_STUDIO_API_TOKEN"
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}

import packages from "../packages/packages.json" assert { type: "json" };

// getAllPackagesSlugs
export const getAllPackagesSlugs = () => {
  // loop over the packages and return the slugs only

  return packages.map((service) => {
    return {
      params: {
        slug: service.slug,
      },
    };
  });
};

// getPackage(slug)
export const getPackage = (slug: string | undefined) => {
  const pckg = packages.find((pckg) => pckg.slug === slug);

  //  combine slug with package
  return {
    slug,
    ...pckg,
  };
};

// getAllPackages
export const getAllPackages = () => {
  return packages;
};

// getMinPackages
export const getMinPackages = () => {
  return packages.slice(0, 3);
};

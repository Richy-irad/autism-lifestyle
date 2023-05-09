import packages from "../packages/packages.json" assert { type: "json" };

// getAllPackagesTitles
export const getAllPackagesTitles = () => {
  // loop over the packages and return the titles only

  return packages.map((service) => {
    return {
      params: {
        slug: service.slug,
      },
    };
  });
};

// getPackage(title)
export const getPackage = (slug: string | undefined) => {
  const pckg = packages.find((pckg) => pckg.slug === slug);

  //  combine title with package
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
  return packages.slice(3);
};

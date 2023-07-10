export default {
  name: "service",
  title: "Services",
  type: "document",
  fields: [
    {
      name: "service",
      title: "Service",
      type: "string",
      validation: (Rule: { required: () => any }) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "service",
      },
    },
    {
      name: "description",
      title: "Description",
      type: "string",
      validation: (Rule: { required: () => any }) => Rule.required(),
    },
    {
      name: "videoDescription",
      title: "Video description",
      type: "url",
      options: {
        scheme: "https",
      },
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule: {
        required: () => {
          (): any;
          new (): any;
          positive: { (): any; new (): any };
        };
      }) => Rule.required().positive(),
    },
  ],
};

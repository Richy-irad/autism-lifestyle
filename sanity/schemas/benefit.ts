export default {
  name: "benefit",
  title: "Benefits",
  type: "document",
  fields: [
    {
      name: "service",
      title: "Service",
      type: "reference",
      to: [{ type: "service" }],
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
};

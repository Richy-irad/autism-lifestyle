export default {
  name: "order",
  title: "Orders",
  type: "document",
  fields: [
    {
      name: "orderTrackingID",
      title: "Order tracking ID",
      type: "string",
    },
    {
      name: "orderDate",
      title: "Order date",
      type: "datetime",
    },
    {
      name: "billingAddress",
      title: "Billing address",
      type: "object",
      readOnly: true,
      fields: [
        { name: "firstName", title: "First name", type: "string" },
        { name: "lastName", title: "Last name", type: "string" },
        { name: "email", title: "E-mail", type: "string" },
        { name: "phone", title: "Phone number", type: "string" },
        { name: "addressLine1", title: "Address line 1", type: "string" },
        { name: "addressLine2", title: "Address line 2", type: "string" },
        { name: "country", title: "Country", type: "string" },
        { name: "city", title: "City", type: "string" },
      ],
    },
    {
      name: "orderItems",
      title: "Order items",
      type: "array",
      // of: [{ type: "orderItem" }],
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
              readOnly: true,
            },
            {
              name: "quantity",
              title: "Quantity",
              type: "number",
              readOnly: true,
              validation: (Rule) => Rule.positive(),
            },
            {
              name: "price",
              title: "Price",
              type: "number",
              readOnly: true,
              validation: (Rule) => Rule.positive(),
            },
            {
              name: "subTotal",
              title: "Subtotal",
              type: "number",
              readOnly: true,
              validation: (Rule) => Rule.positive(),
            },
          ],
        },
      ],
    },
  ],
};

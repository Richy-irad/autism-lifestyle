import { NextApiRequest, NextApiResponse } from "next";
import { writeClient } from "../../../sanity/lib/client";
import { CartItemType } from "@/lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // do the submit order request
    const { address, transaction_id, authToken, cart } = req.body;
    console.log(authToken)
    try {
      const submitOrderRequestResponse = await fetch(
        process.env.PESAPAL_SUBMIT_ORDER_REQUEST_URL as string,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authToken.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: transaction_id,
            currency: process.env.PESAPAL_CURRENCY,
            // amount: cart.cartTotal,
            amount: 1,
            description: "Payment description goes here",
            callback_url: process.env.PESAPAL_CALLBACK_URL,
            redirect_mode: "",
            notification_id: process.env.PESAPAL_IPN_ID,
            billing_address: {
              email_address: address.email,
              phone_number: address.phone,
              country_code: "KE",
              first_name: address.firstName,
              middle_name: "",
              last_name: address.lastName,
              line_1: address.addressLine1,
              line_2: address.addressLine2,
              city: address.city,
              state: "",
              postal_code: "",
              zip_code: "",
            },
          }),
        }
      );

      // console.log the results
      let results = await submitOrderRequestResponse.json();

      // create an order in studio
      const order = {
        _type: "order",
        orderTrackingID: results.order_tracking_id,
        orderDate: new Date().toISOString(),
        billingAddress: address,
        orderItems: cart.items.map((item: CartItemType, index: number) => {
          return {
            _key: `order-item-${index}`,
            title: item.item.title,
            quantity: item.quantity,
            price: item.price,
            subTotal: item.subTotal,
          };
        }),
      };
      await writeClient.create(order);

      res.status(200).json(results);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
}

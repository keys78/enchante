import express from 'express';
import Stripe from 'stripe';
import OrderModel from '../models/order';
import sendEmail from '../utils/sendEmail';

const stripe = new Stripe('sk_test_51NFZwoDQ9vYTY0QA8A7kWErpVMSU978ZVucgssaJpfU0Y4K6cYwRxkDts9KCKHYFrDIaGRDTSQfKmuWPN3vJFY7100nikFrnYM', {
  apiVersion: '2022-11-15',
});

const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId.toString(),
      cart: JSON.stringify(req.body.cartItems.map(item => ({ name: item.name, image: item.image, category: item.category, cartQuantity: item.cartQuantity, price: item.price }))),
    }
  });

  try {
    const line_items = req.body.cartItems.map((item: any) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.image],
            // description: item.desc,
            metadata: {
              id: item.id,
              app_name: 'Enchante Commerce',
            }
          },
          unit_amount: item.price * 100,
        },
        quantity: item.cartQuantity,
      }
    })
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ["NG", "US", "CA"]
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "usd",
            },
            display_name: "Free Shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5
              },
              maximum: {
                unit: "business_day",
                value: 7
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "usd"
            },
            display_name: "Next day air",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1
              },
              maximum: {
                unit: "business_day",
                value: 1
              },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true
      },
      customer: customer.id,
      line_items,
      mode: 'payment',
      success_url: `${process.env.BASE_URL}checkout-success`,
      cancel_url: `${process.env.BASE_URL}cart`,
    });

    res.send({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send({ error: 'Failed to create checkout session.' });
  }
});

const createOrder = async (customer, data) => {
  const items = JSON.parse(customer.metadata.cart)

  const newOrder = new OrderModel({
    userId: customer.metadata.userId,
    customerId: customer.metadata.customerId,
    paymentIntentId: data.payment_intent,
    product: items,
    subTotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status
  });

  try {

    const savedOrder = await newOrder.save()

    await sendEmail({
      to: customer.email,
      subject: `Your enchante Order ${customer.id} has been confirmed`,
      text: `Dear ${customer.name},
      Thank you for shopping on enchante! Your order ${customer.id} has been successfully confirmed.
      It will be packaged and shipped as soon as possible. Once the item(s) is out for delivery or available for pick-up you will receive a notification from us.
      Thank you for shopping on enchante. ${savedOrder}`
    })
  } catch (error) {
    console.log(error)
  }
}

// stripe webhook
let endpointSecret;


router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let data;
  let eventType;

  if (endpointSecret) {
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log('Webhook Verified')
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`)
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    data = event.data.object
    eventType = event.type
  } else {
    data = req.body.data.object;
    eventType = req.body.type
  }



  // // Handle the event
  if (eventType === "checkout.session.completed") {
    stripe.customers.retrieve(data.customer)
      .then((customer) => {
        createOrder(customer, data);
      })
      .catch(err => console.log(err.message));

  }

  // Return a 200 response to acknowledge receipt of the event
  res.send().end;
});

export default router;

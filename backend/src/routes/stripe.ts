import express from 'express';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51NFZwoDQ9vYTY0QA8A7kWErpVMSU978ZVucgssaJpfU0Y4K6cYwRxkDts9KCKHYFrDIaGRDTSQfKmuWPN3vJFY7100nikFrnYM', {
  apiVersion: '2022-11-15',
});

const router = express.Router();

export const checkout = router.post('/create-checkout-session', async (req, res) => {
  try {
    const line_items = req.body.cartItems.map((item:any) => {
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
      line_items,
      mode: 'payment',
      success_url: 'http://127.0.0.1:5173/checkout-success',
      cancel_url: 'http://127.0.0.1:5173/cart',
    });

    res.send({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send({ error: 'Failed to create checkout session.' });
  }
});

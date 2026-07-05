import Razorpay from 'razorpay';

export default async function handler(req, res) {
  // Set CORS headers to allow local development testing
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, currency } = req.body;

  if (!amount) {
    return res.status(400).json({ error: 'Amount is required' });
  }

  try {
    // Initialize Razorpay with key ID and secret
    const razorpay = new Razorpay({
      key_id: process.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_T9odHSV2utZogf',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'n5c6pkT2pqIOmV9LmQJ00yYl',
    });

    const options = {
      amount: Math.round(amount * 100), // in paise (e.g. ₹1499 => 149900 paise)
      currency: currency || 'INR',
      receipt: `receipt_order_${Math.floor(Math.random() * 1000000)}`,
    };

    const order = await razorpay.orders.create(options);
    return res.status(200).json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return res.status(500).json({ error: error.message || 'Failed to create order' });
  }
}

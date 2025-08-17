import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function CheckoutPage({ order }) {
  const router = useRouter();

  // Function to check authentication status (placeholder)
  const checkAuthentication = async () => {
    try {
      const res = await fetch('/api/check-auth'); // Replace with your actual auth check API
      if (res.ok) {
        const data = await res.json();
        return data.isAuthenticated; // Assuming API returns { isAuthenticated: true/false }
      }
      return false;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  };

  const handlePayment = async () => {
    const authenticated = await checkAuthentication();
    if (authenticated) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          order_id: order.id,
          handler: function (response) {
            alert('Payment successful! Your payment ID is: ' + response.razorpay_payment_id);
            router.push('/products'); // Redirect to products page after successful payment
          },
          prefill: {
            name: 'CrossEye Customer', // You can get this from user session
            email: 'customer@example.com', // You can get this from user session
            contact: '9000000000', // You can get this from user session
          },
          notes: {
            address: 'CrossEye Customer Address', // You can get this from user session
          },
          theme: {
            color: '#1a1a1a',
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      };
      document.body.appendChild(script);
    } else {
      router.push(`/login?redirect=${encodeURIComponent(router.asPath)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Head>
        <title>Checkout - CrossEye</title>
        <meta name="description" content="Checkout page for CrossEye products." />
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </Head>
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <p className="text-xl mb-4">Your order total is: ₹{order.amount / 100}</p>
        <p className="text-gray-600 mb-6">Please complete your payment to proceed.</p>
        <button onClick={handlePayment} className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors">
          Pay Now
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { amount } = context.query; // Get amount from URL query
  const API_URL = process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:3000';
  const res = await fetch(`${API_URL}/api/create-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount: Number(amount) }), // Pass dynamic amount
  });
  const order = await res.json();

  return {
    props: {
      order,
    },
  };
}

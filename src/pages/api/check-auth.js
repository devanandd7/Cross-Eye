export default function handler(req, res) {
  if (req.method === 'GET') {
    // In a real application, you would check for a valid session or token here.
    // For demonstration purposes, we'll assume the user is authenticated.
    // You would typically check req.session.user or a JWT from cookies/headers.
    const isAuthenticated = true; // Set to true for testing successful login flow

    if (isAuthenticated) {
      res.status(200).json({ isAuthenticated: true });
    } else {
      res.status(401).json({ isAuthenticated: false, message: 'Not authenticated' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

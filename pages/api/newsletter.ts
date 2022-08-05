// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from 'next';

type Data = {
  name: string;
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') return res.setHeader('Allow', 'POST').status(405).json({ error: 'Method Not Allowed' });

  const email = req.body.email;

  if (typeof email !== 'string') return res.status(400).json({});

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY!,
    },
    body: JSON.stringify({ email }),
  };

  const mailerliteResponse = await fetch(
    `https://api.mailerlite.com/api/v2/groups/${process.env.MAILERLITE_GROUP_ID!}/subscribers`,
    options
  );

  if (!mailerliteResponse.ok) return res.status(500).json({ error: 'Pojawił się problem w zapisie do Newslettera' });

  res.status(201).json({});
};

export default handler;

// api/sendTelegram.js
export default async function handler(req, res) {
  // السماح بالطلبات من أي مصدر (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { chat_id, text, parse_mode } = req.body;

    if (!chat_id || !text) {
      return res.status(400).json({ error: 'Missing chat_id or text' });
    }

    const botToken = '8094856271:AAFdutCJAsHntdIByvaumPDFkwfRU14niCE';
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id,
        text,
        parse_mode: parse_mode || 'Markdown',
      }),
    });

    const result = await response.json();
    return res.status(response.status).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// netlify/functions/sendTelegram.js
exports.handler = async (event, context) => {
  // السماح بالطلبات من أي مصدر (CORS)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { chat_id, text, parse_mode } = JSON.parse(event.body);

    if (!chat_id || !text) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing chat_id or text' }) };
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

    return {
      statusCode: response.status,
      headers,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

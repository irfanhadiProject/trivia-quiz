export async function handler(event) {
  try {
    const { text } = JSON.parse(event.body);

    const params = new URLSearchParams();
    const texts = Array.isArray(text) ? text : [text];

    texts.forEach((t) => {
      params.append('text', t);
    });

    params.append('target_lang', 'ID');

    const response = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data.translations.map((t) => t.text)),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}

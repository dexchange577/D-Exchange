export default async (request) => {
  const headers = {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  };

  if (request.method === "GET") {
    return new Response(JSON.stringify({
      ok: true,
      service: "D Exchange HesabPay webhook receiver",
      accepts: "POST"
    }), { status: 200, headers });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({
      ok: false,
      message: "Method not allowed"
    }), {
      status: 405,
      headers
    });
  }

  try {
    const rawBody = await request.text();
    let payload;

    try {
      payload = JSON.parse(rawBody);
    } catch {
      return new Response(JSON.stringify({
        ok: false,
        message: "Invalid JSON body"
      }), {
        status: 400,
        headers
      });
    }

    const upstream = await fetch(
      "https://srakzgpwxmxtpxbvnelq.supabase.co/functions/v1/dexchange-gateway/hesabpay/webhook",
      {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );

    const upstreamText = await upstream.text();
    let responseBody;

    try {
      responseBody = JSON.parse(upstreamText);
    } catch {
      responseBody = {
        ok: false,
        message: "Webhook gateway returned non-JSON response"
      };
    }

    return new Response(JSON.stringify(responseBody), {
      status: upstream.status,
      headers
    });
  } catch {
    return new Response(JSON.stringify({
      ok: false,
      message: "Webhook gateway connection failed"
    }), {
      status: 502,
      headers
    });
  }
};

export const config = {
  path: "/api/hesabpay/webhook"
};

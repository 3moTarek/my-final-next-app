export async function verifyTurnstileToken(
  token: string
) {
  try {
    if (!token) {
      return false;
    }

    if (!process.env.TURNSTILE_SECRET_KEY) {
      console.error(
        "Turnstile verification failed: TURNSTILE_SECRET_KEY is missing."
      );

      return false;
    }

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
        }),
      }
    );

    const data = await response.json();

    if (data.success !== true) {
      console.error(
        "Turnstile verification failed:",
        data["error-codes"] || data
      );
    }

    return data.success === true;
  } catch (error) {
    console.error(
      "Turnstile verification error:",
      error
    );

    return false;
  }
}

export function getVoterToken(pollId) {
  const key = `voterToken:${pollId}`;
  let token = localStorage.getItem(key);
  if (!token) {
    token = cryptoRandomToken();
    localStorage.setItem(key, token);
  }
  return token;
}

function cryptoRandomToken() {
  // Uses Web Crypto if available
  if (window.crypto?.getRandomValues) {
    const arr = new Uint8Array(16);
    window.crypto.getRandomValues(arr);
    return [...arr].map(b => b.toString(16).padStart(2, "0")).join("");
  }
  // Fallback
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

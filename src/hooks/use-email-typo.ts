const DOMAIN_TYPOS: Record<string, string> = {
  "gmil.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gmail.co": "gmail.com",
  "gmail.con": "gmail.com",
  "gnail.com": "gmail.com",
  "yahooo.com": "yahoo.com",
  "yaho.com": "yahoo.com",
  "yahoo.co": "yahoo.com",
  "hotmial.com": "hotmail.com",
  "hotmail.co": "hotmail.com",
  "outlok.com": "outlook.com",
  "outloo.com": "outlook.com",
};

export function detectEmailTypo(email: string): string | null {
  const parts = email.split("@");
  if (parts.length !== 2) return null;
  const [local, domain] = parts;
  const suggestion = DOMAIN_TYPOS[domain.toLowerCase()];
  if (!suggestion) return null;
  return `${local}@${suggestion}`;
}

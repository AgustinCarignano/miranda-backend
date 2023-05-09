import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

function getHash(pwd: string): Promise<string> {
  return bcrypt.hash(pwd, SALT_ROUNDS);
}

function getHashSync(pwd: string): string {
  return bcrypt.hashSync(pwd, SALT_ROUNDS);
}

function compare(pwd: string, hash: string): Promise<boolean> {
  return bcrypt.compare(pwd, hash);
}

export default {
  getHash,
  getHashSync,
  compare,
} as const;

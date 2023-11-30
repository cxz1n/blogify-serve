import * as bcrypt from 'bcrypt';

async function getBcryptHash(pwd: string) {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(pwd, salt);
}

async function matchPwd(pwd: string, hash: string) {
  return await bcrypt.compare(pwd, hash);
}

export { getBcryptHash, matchPwd };

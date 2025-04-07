export const removePassword = <
  T extends {
    passwordHash: string;
    salt: string;
  },
>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  passwordHash: _passwordHash,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  salt: _salt,
  ...rest
}: T): Omit<T, "passwordHash" | "salt"> => {
  return rest;
};

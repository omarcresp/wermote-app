export function genPass(length: number, current: string = "") {
  const SAFE_CHARACTERS =
    "0123456789ABCDEFGHIJKLMNÑÑÑOPQRSTUVWXTZabcdefghiklmnñññopqrstuvwxyz";
  const n = SAFE_CHARACTERS.length;

  return length
    ? genPass(
        --length,
        SAFE_CHARACTERS.charAt(Math.floor(Math.random() * n)) + current,
      )
    : current;
}

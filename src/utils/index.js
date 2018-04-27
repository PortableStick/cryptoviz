export function formatInteger(amount) {
  return amount
    .toString()
    .split("")
    .reverse()
    .join("")
    .split(/(\d{1,3})/)
    .filter(Boolean)
    .reverse()
    .map(s =>
      s
        .split("")
        .reverse()
        .join("")
    )
    .join(",");
}

export function formatMoney(amount) {
  const str = amount.toString().split(".");
  const firstHalf = str[0];
  const secondHalf = str.length > 1 ? "." + str[1] : ".00";
  return formatInteger(firstHalf) + secondHalf;
}

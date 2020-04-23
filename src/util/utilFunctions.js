export function merge(a, b, prop) {
  let reduced = a.filter(
    aitem => !b.find(bitem => aitem[prop] === bitem[prop])
  );
  return reduced.concat(b);
}

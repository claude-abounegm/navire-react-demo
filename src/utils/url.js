export function getHrefFromLocation(location) {
  const { pathname, search, hash } = location;
  return `${pathname}${search}${hash}`;
}

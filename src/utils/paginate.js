export function paginate(items, currentPage, pageSize) {
  const endIndex = currentPage * pageSize;
  const startIndex = endIndex - pageSize;
  return items.slice(startIndex, endIndex);
}

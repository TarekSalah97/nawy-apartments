export function parsePagination(query: any) {
  const page = Math.max(1, parseInt(query.page ?? "1", 10));
  const perPage = Math.min(100, parseInt(query.perPage ?? "12", 10));
  const skip = (page - 1) * perPage;
  return { page, perPage, skip };
}

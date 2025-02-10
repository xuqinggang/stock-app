export function formatResponse<T>(data: T) {
  return {
    code: 0,
    data,
  };
}

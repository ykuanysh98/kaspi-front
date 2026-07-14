export const getProductImage = (path: string | undefined) => {
  if (!path) return null

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  return `http://127.0.0.1:8000/storage/${path}`
}

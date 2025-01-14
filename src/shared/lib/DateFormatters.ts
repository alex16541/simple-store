export const formatDate = (date: string) => {
  return new Date(Date.parse(date)).toLocaleDateString()
}

const baseUrl = process.env.NEXT_BASE_URL
const eventBseUrl = `${baseUrl}/event`

export const Events = async () => {
  const res = await fetch(eventBseUrl)
  return res.json()
}

export const EventById = async (eventId: string) => {
  const response = await fetch(`${eventBseUrl}/${eventId}`)
  return response.json()
}

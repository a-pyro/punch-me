export function GET(request: Request) {
  console.log('🚀 ~ GET ~ hello:')
  return Response.json({ hello: 'world' })
}

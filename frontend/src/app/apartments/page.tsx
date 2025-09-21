export default async function Apartments() {
  const data = await fetch('http://localhost:4000/api/v1/apartments/')
  const posts = await data.json()
  
  return (
   <div>
    fetched
   </div>
  )
}
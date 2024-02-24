import { useRouter } from "next/router"
import { useEffect } from "react"

const Book = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/')
    //eslint-disable-next-line
  }, [])

  return (
    <></>
  )
}

export default Book
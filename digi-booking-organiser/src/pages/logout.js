import { useRouter } from "next/router"
import { useEffect } from "react"

const Book = () => {
    const router = useRouter()
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
            localStorage.clear()
            window.localStorage.clear()
        }
        router.push('/login')
        //eslint-disable-next-line
    }, [])

    return (
        <></>
    )
}

export default Book
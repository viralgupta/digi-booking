import axios from "axios"
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';

export default function Events() {
    const [events, setEvents] = useState([])
    const [eventsavailable, setEventsavailable] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        let token = localStorage.getItem('token');
        if (!user || !token) {
            router.push('/login')
        }
        getEvents()
        // eslint-disable-next-line
    }, [])

    const getEvents = async () => {
        try {
            const even = await axios.get('/api/event/getevents', {
                headers: {
                    "ngrok-skip-browser-warning": "69420"
                }
            });
            setEvents(even.data.Events)
            setEventsavailable(true)
        } catch (error) {
            console.log("unable to fetch events");
        }
    }


    return (
        <>
            <div className="bg-gray-700">
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-5 mx-auto">
                        <div className="flex flex-wrap w-full mb-5">
                            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-100">Upcoming Shows</h1>
                                <div className="h-1 w-20 bg-indigo-500 rounded"></div>
                            </div>
                        </div>
                        <div className="flex flex-wrap -m-4">
                            {eventsavailable && events.map((event, index) => (
                                <div className="xl:w-1/4 md:w-1/2 p-4" key={index}>
                                    <div className="bg-gray-800 p-6 rounded-lg">
                                        <img className="h-40 rounded w-full object-cover object-center mb-6" src={event.picture} alt="content" />
                                        <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">{event.type}</h3>
                                        <h2 className="text-lg text-gray-100 font-medium title-font">{event.name}</h2>
                                        <p className="leading-relaxed text-base mb-4">{event.about}</p>
                                        <Link href={`/book/${event._id}`} className="text-white cursor-pointer rounded-md w-auto hover:text-blue-500 border p-1">Book Show -&gt;</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

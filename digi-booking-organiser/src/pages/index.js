import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

function Home() {
    const router = useRouter()
    const [events, setEvents] = useState([])

    const getEvents = async () => {
        const user = JSON.parse(localStorage.getItem("user"))
        const response = await axios.post("/api/event/myevents", {
            userId: user._id
        })
        setEvents(response.data.events)
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        let token = localStorage.getItem('token');
        if (!user || !token) {
            router.push('/login')
        }
        else {
            getEvents()
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className='bg-gray-700 h-screen p-5' >
            {events.length === 0 ? <div className='flex flex-col justify-center border border-white p-5 rounded-lg'>
                <div className=' text-center text-xl font-bold mb-3'>
                    Coudn't find any Events from your account : &#40;
                </div>
                <button onClick={() => { router.push('/create') }} className='text-center mx-auto text-xl text-white bg-blue-400 border-2 rounded-md p-2'>
                    Create a event now!!!
                </button>
            </div> : <div>
                <div className="container mx-auto">
                    <div className="flex flex-col text-center w-full mb-8 md:mb-20">
                        <h1 className="sm:text-3xl font-medium title-font mb-4 text-gray-100 text-3xl">Your Events</h1>
                    </div>
                    <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-full">
                            <div className="flex items-center justify-center h-full border-gray-200 border p-4 rounded-lg">
                                <button id='toggleButton' className='border p-1 rounded-md text-center md:ml-20 md:mt-0 text-white bg-gray-800'>
                                    <Link href={`/create`} >Create New Event +</Link>
                                </button>
                            </div>

                        </div>
                        {events.map((event, index) => {
                            return <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
                                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                                    <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={event.picture} />
                                    <div className='flex flex-col md:flex-row'>
                                        <div className="flex-grow">
                                            <h2 className="text-gray-100 title-font font-medium">{event.name}</h2>
                                            <p className="text-gray-400">{event.type}</p>
                                        </div>
                                        <button id='toggleButton' className='border p-1 rounded-md text-center mt-2 md:ml-20 md:mt-0 text-white bg-gray-800'>
                                            <Link href={`/verify/${event._id}`} >Verify Event Bookings</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>}

        </div>
    )
}

export default Home
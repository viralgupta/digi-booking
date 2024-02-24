import axios from 'axios'
import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { useRouter } from "next/router";

const Mybookings = () => {
    const router = useRouter()
    const [bookings, setBookings] = useState(null)
    const [qrurl, setQrurl] = useState('')

    const getmybookings = async () => {
        const user = JSON.parse(localStorage.getItem('user'))
        const token = localStorage.getItem('token');
        const mybooking = await axios.post(`/api/user/myevents`,{
            id: user._id
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            }
        })
        setBookings(mybooking.data.myEvents)
    }

    const togglemodal = async (id) => {

        try {
            setQrurl(await QRCode.toDataURL(id, { errorCorrectionLevel: 'H' }))
            const centeredDiv = document.getElementById('centeredDiv');
            centeredDiv.classList.toggle('hidden');
        } catch (err) {
            console.error(err)
        }

    }

    if (typeof window !== "undefined") {
        // browser code
        window.addEventListener('click', (event) => {
            const centeredDiv = document.getElementById('centeredDiv');
            const toggleButton = document.getElementById('toggleButton');
            if(centeredDiv && toggleButton){
                if (!centeredDiv.contains(event.target) && !toggleButton.contains(event.target)) {
                    centeredDiv.classList.add('hidden');
                }
            }
        });
      }

    useEffect(() => {
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        let token = localStorage.getItem('token');
        if (!user || !token) {
            router.push('/login')
        }
        getmybookings()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {!bookings || bookings.length == 0 ? <div className='flex flex-col justify-center'>
                <div className=' text-center p-10 text-xl font-bold'>
                    Coudn't find any bookings from your account : &nbsp;&#40;
                </div>
                <button onClick={() => { router.push('/events') }} className='text-center mx-auto text-xl text-white bg-blue-400 border-2 rounded-md p-2'>
                    Book a event now!!!
                </button>
            </div> : <div>
                <div className="container px-5 py-10 mx-auto">
                    <div className="flex flex-col text-center w-full mb-8 md:mb-20">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-100">Your Bookings</h1>
                    </div>
                    <div className="flex flex-wrap -m-2">
                        {bookings.map((booking, index) => {
                            return <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
                                <div className="h-fNameull flex items-center border-gray-200 border p-4 rounded-lg">
                                    <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={booking.eventid.picture} />
                                    <div className='flex flex-col md:flex-row'>
                                        <div className="flex-grow">
                                            <h2 className="text-gray-100 title-font font-medium">{booking.eventid.name}{booking.isValidated ? <span className='text-red-200'>&nbsp;&#40;Verified&#41;</span>: <span className='text-green-200'>&nbsp;&#40;Active&#41;</span>}</h2>
                                            <p className="text-gray-500">{booking.eventid.type}</p>
                                        </div>
                                        <button onClick={() => { togglemodal(booking.eventid._id) }} id='toggleButton' className='border p-1 rounded-md text-center mt-2 md:ml-20 md:mt-0'>
                                            Get Qr
                                        </button>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>}
            <div id="centeredDiv" className="fixed top-1/2 right-1/2 aspect-square transform translate-x-1/2 -translate-y-1/2 hidden rounded-lg shadow-lg">
                <img className='w-full h-full aspect-square' src={qrurl} alt="" />
            </div>
        </>
    )
}

export default Mybookings
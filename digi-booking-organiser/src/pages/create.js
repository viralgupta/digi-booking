import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const Create = () => {
    const router = useRouter()
    const nameofevent = useRef('')
    const type = useRef('')
    const about = useRef('')
    const toastconfig = {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
    }

    const submitform = async (e) => {
        e.preventDefault()
        if (!nameofevent.current.value || !type.current.value || !about.current.value) {
            toast.error("Please fill all the fields before Submitting!", toastconfig)
        }
        const user = JSON.parse(localStorage.getItem("user"))
        let token = localStorage.getItem('token');
        const response = await axios.post("/api/event/createevent", {
            name: nameofevent.current.value,
            type: type.current.value,
            about: about.current.value,
            userId: user._id
        },{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if(response.data.success){
            router.push("/")
        }
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        let token = localStorage.getItem('token');
        if (!user || !token) {
            router.push('/login')
        }
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <section className="h-screen overflow-hidden bg-gray-800 px-2 pt-10">
                <div
                    className="h-full w-full">
                    <div className="font-mono text-white font-bold text-3xl mb-10">
                        Create A Event
                    </div>
                    {/* <!-- Right column container with form --> */}
                    <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
                        <form className="mb-5">

                            {/* <!-- Name input --> */}
                            <div className="relative mb-6 border border-gray-900 rounded-lg w-full" data-te-input-wrapper-init>
                                <input
                                    type="text"
                                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    id="exampleFormControlInput3"
                                    ref={nameofevent}
                                    placeholder="Name" />
                                <label
                                    htmlFor="exampleFormControlInput3"
                                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                >Name of Event
                                </label>
                            </div>
                            {/* <!-- Email input --> */}
                            <div className="relative mb-6 border border-gray-900 rounded-lg w-full" data-te-input-wrapper-init>
                                <input
                                    type="text"
                                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    id="exampleFormControlInput3"
                                    ref={type}
                                    placeholder="Type of Event" />
                                <label
                                    htmlFor="exampleFormControlInput3"
                                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                >Type of Event
                                </label>
                            </div>
                            <div className="relative mb-6 border border-gray-900 rounded-lg w-full" data-te-input-wrapper-init>
                                <input
                                    type="text"
                                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    id="exampleFormControlInput33"
                                    ref={about}
                                    placeholder="About Event" />
                                <label
                                    htmlFor="exampleFormControlInput33"
                                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                >About
                                </label>
                            </div>
                            <div className="relative mb-6 border border-gray-900 rounded-lg w-full" data-te-input-wrapper-init>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] "
                                    id="exampleFormControlInput33"
                                    placeholder="Insert Banner"
                                />
                            </div>


                            {/* <!-- Submit button --> */}
                            <button
                                type="submit"
                                className="inline-block mt-52 w-full border rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                data-te-ripple-init
                                onClick={submitform}
                                data-te-ripple-color="light">
                                Create
                            </button>
                        </form>
                    </div>
                </div>
                <br />
            </section>
        </>
    )
}

export default Create
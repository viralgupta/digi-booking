
const Userverify = ({ name, number, cancel, confirm }) => {
  return (
    <>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-3 rounded-lg z-10">
        <div className="flex items-center border p-2 rounded-md border-black mb-1">
          UserName:&nbsp;<div className="font-mono font-bold">{name}</div>
        </div>
        <div className="flex items-center border p-2 rounded-md border-black mb-1">
          No of Tickets:&nbsp;<div className="font-mono font-bold">{number}</div>
        </div>
        <div className="flex justify-center">
            <button onClick={cancel} className="bg-red-300 p-2 rounded-md border border-black mx-2 text-xl font-bold">Cancel</button>
            <button onClick={confirm} className="bg-green-300 p-2 rounded-md border border-black mx-2 text-xl font-bold">Confirm</button>
        </div>
      </div>
    </>
  )
}

export default Userverify
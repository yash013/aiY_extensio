export default function AccessForm() {
    return (
        <form className='w-2/3 grid grid-cols-3 border-2 border-pink-500 rounded-md mx-auto mt-8'>
            <input type='email' name='email' className='col-span-2 px-4 py-2 outline-none focus:outline-none rounded-md' placeholder='Email Address' />
            <button className="col-span-1 get-started text-white font-bold px-6 py-4 outline-none focus:outline-none bg-pink-500 active:bg-pink-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150">Get Early Access</button>
        </form>
    )
}

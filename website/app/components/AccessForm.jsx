import HubspotForm from 'react-hubspot-form'

export default function AccessForm() {
    return (
        <>
            <HubspotForm
                region="na1"
                portalId="21427242"
                formId="ba59cd08-1609-4350-9b17-690c23c91de9"
                onSubmit={() => console.log('Submit!')}
                onReady={(form) => console.log('Form ready!')}
                loading={<div>Loading...</div>}
            // target="earlyAccessForm"
            />
            {/* <form className='w-2/3 grid grid-cols-3 border-2 border-blue-500 rounded-md mx-auto mt-8'>
            <input type='email' name='email' className='col-span-2 px-4 py-2 outline-none focus:outline-none rounded-md' placeholder='Email Address' />
            <button className="col-span-1 get-started text-white font-bold px-6 py-4 outline-none focus:outline-none bg-blue-500 active:bg-blue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150">Get Early Access</button>
        </form> */}
        </>
    )
}

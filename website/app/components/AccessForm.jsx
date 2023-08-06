import HubspotForm from 'react-hubspot-form'

export default function AccessForm() {
    const handleFormSubmit = async (formData) => {
        try {
          const endpoint = `https://api.hsforms.com/submissions/v3/integration/secure/submit/21427242/ba59cd08-1609-4350-9b17-690c23c91de9`;
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            console.log('Form submitted successfully!');
          } else {
            console.error('Form submission failed.');
          }
        } catch (error) {
          console.error('An error occurred while submitting the form:', error);
        }
    };

    return (
        <>
            <HubspotForm
                region="na1"
                portalId="21427242"
                formId="ba59cd08-1609-4350-9b17-690c23c91de9"
                onSubmit={(formData) => console.log('Submit!')}
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

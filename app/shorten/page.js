"use client"
import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';

const Shorten = () => {

    const [url, seturl] = useState("")
    const [shorturl, setshorturl] = useState("")
    const [generated, setGenerated] = useState('')

    const generate = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "url": url,
            "shorturl": shorturl
        });


        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/generate", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${shorturl}`)
                seturl("")
                setshorturl("")
                console.log(`This is result: ---- ${result}`)
                toast(result.message)

            })
            .catch((error) => console.error(error));
    }


    return (
        <div className='flex flex-col justify-center items-center my-2 w-full gap-3 mt-8 mx-auto'>
            <h1 className='text-center text-2xl font-bold'>Generate your short URL&#39;s</h1>
            <div className='w-[80%] flex flex-col gap-3 p-4 mx-auto  '>
                <label className='font-bold' htmlFor="long-url">Enter your Long URL</label>
                <input value={url} className='px-4 py-2 rounded-2xl border focus:outline-purple-600' type="text" id='long-url' placeholder='https://www.example.com/products/category/electronics/mobile-phones/smartphone-brand-model-12345?ref=homepage&campaign=sale' onChange={e => seturl(e.target.value)} />

                <label className='font-bold' htmlFor="short-url">Enter your preferred short URL</label>
                <input value={shorturl} className='px-4 py-2 rounded-2xl border focus:outline-purple-600' type="text" id='short-url' placeholder='https://www.example.com/products/electronics/smartphone' onChange={e => setshorturl(e.target.value)} />

                <button onClick={() => generate()} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mx-auto ">Shorten</button>
            </div>

            {generated && <p className='font-bold text-center text-2xl'>Your generated Short URL is: <span className='text-blue-500'><Link href={generated} target='_blank' className='hover:underline ' >{generated}</Link></span></p>}
            <ToastContainer />
        </div>
    )
}

export default Shorten

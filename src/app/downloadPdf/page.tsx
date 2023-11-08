"use client"

import { useSearchParams } from 'next/navigation';
import React from 'react'
import DownloadButton from '../components/DownloadButton';
import PdfViewer from '../components/PdfViewer';
import Image from 'next/image';

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const pdfPath = `https://pdf-server-cff3e7ae4cde.herokuapp.com/pdfs/${id}`;
  return (
    <div className='h-screen w-full mx-auto max-w-[1366px] pt-32 px-2 md:px-10 lg:px-32 lg:pb-32 md:flex justify-between'>
      <PdfViewer pdfUrl={pdfPath} />
      <div className='text-center my-5'>
        <Image
          src='https://cdn.dribbble.com/users/285475/screenshots/2310943/media/9572e637ed414bd59027780928770c6c.gif'
          alt="Picture of the men waiting"
          width={500}
          height={500}
          className='hidden md:block h-60 w-full'
        />
        <h1 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-[#055C9D] tracking-wide'>Pdf Modified successfully.</h1>
        <p className='text-gray-500 tracking-wide text-sm md:text-base md:tracking-wider p-2'>You can download your pdf here.</p>
        <DownloadButton pdfUrl={pdfPath} css='px-10 py-5 font-semibold text-white bg-[#00BFFF] rounded-lg shadow-md m-4 hover:bg-[#00bfffb7]' />
      </div>
    </div>
  )
}

export default Page;

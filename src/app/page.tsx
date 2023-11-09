"use client";

// import { Metadata } from "next"
import { useContext, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai';
import PdfViewer from "./components/PdfViewer";
import { useRouter } from 'next/navigation';
import { FileUploader } from "react-drag-drop-files";
import { GlobalContext } from './context/context';
import { set } from 'mongoose';
import { ClockLoader } from 'react-spinners';

export default function Home() {

  const { userData } = useContext<any>(GlobalContext);

  const [pdfupload, setpdfupload] = useState<File | undefined>(undefined);
  const [pdfUrl, setpdfUrl] = useState<string>('');
  const [loading, setloading] = useState<boolean>(false);

  const router = useRouter();

  const handleChange = (e: File) => {
    setpdfUrl(URL.createObjectURL(e));
    setpdfupload(e);
  }

  const handleUpload = async () => {
    setloading(true);
    const formData = new FormData();
    formData.append('pdf', pdfupload as Blob);
    formData.append('userId', userData._id);

    try {
      const response = await fetch('https://pdf-server-cff3e7ae4cde.herokuapp.com/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const json = await response.json();
        router.push(`/modifyPdf?id=${encodeURIComponent(json.id)}&name=${encodeURIComponent(json.name)}`);
      } else {
        console.log('File upload failed');
        setloading(false);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setloading(false);
    }
  };

  return (
    <div className="h-screen" style={{ backgroundImage: `url(https://static.vecteezy.com/system/resources/previews/011/231/545/non_2x/abstract-modern-triangle-geometry-shape-backdrop-for-presentation-background-and-minimalist-wallpaper-free-vector.jpg)` }}>
      {pdfUrl === '' ? <div>
        <div className="text-7xl font-extrabold text-center pt-32 pb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-l from-[#003B73] to-[#00BFFF] hover:from-[#055C9D] hover:to-[#003B73]">
            Modify your PDF
          </span>
        </div>
        <p className="text-center text-gray-500 font-semibold tracking-wider p-2">
          Upload PDF file and select desired pages you want to keep and download the modified PDF file with the selected pages only.
        </p>
        <div className="flex items-center justify-center w-5/6 md:w-1/2 mx-auto mt-10 mb-16">
          <FileUploader
            handleChange={handleChange}
            types={['pdf']}
            classes='w-full'
            onTypeError={(type: string) => alert(`${type} is not a supported file type`)}
          >
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <AiOutlineCloudUpload className="text-5xl text-gray-600" />
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500">PDF Document only</p>
              </div>
            </label>
          </FileUploader>
        </div>
      </div>
        :
        <div className='pt-28  md:px-20 lg:flex justify-evenly relative max-w-[1366px] mx-auto'>
          <p className='hidden md:block uppercase font-extrabold text-7xl tracking-widest absolute -left-32 top-80 -rotate-90 my-auto text-gray-300'>preview</p>
          <div className='mx-10'>
            <PdfViewer pdfUrl={pdfUrl} />
          </div>
          <div className='my-auto flex lg:block justify-center'>
            <div className='sapce-y-5 md:space-y-16'>
              <p className='py-6 text-2xl md:text-4xl text-gray-500 tracking-wider'>Continue to Modify your PDF.</p>
              <div className='flex justify-center lg:justify-start gap-3 mx-auto'>
                <button onClick={handleUpload} className='px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-l from-[#003B73] to-[#00BFFF] hover:from-[#055C9D] hover:to-[#003B73]'>Continue</button>
                <button onClick={() => { setpdfUrl(''); setpdfupload(undefined) }} className='px-6 py-3 rounded-lg font-semibold text-black bg-gray-200 hover:bg-gray-300'>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      }
      {loading && <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden bg-gray-500/25 grid place-items-center backdrop-blur-md overflow-y-auto md:inset-0 h-screen max-h-full">
        <ClockLoader color="#003B73" />
      </div>}
    </div>
  )
}

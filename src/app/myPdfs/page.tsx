"use client"

import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/context';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { HashLoader } from 'react-spinners';
import DownloadButton from '../components/DownloadButton';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Pdf {
    _id: string;
    originalName: string;
    storedName: string;
    uploadedAt: string;
    userId: string;
}

interface EditProps {
    id: string;
    name: string;
}

const Page1 = () => {

    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

    const { userData } = useContext<any>(GlobalContext);

    const router = useRouter();

    const [pdfs, setpdfs] = useState<Pdf[]>([]);
    const [loading, setloading] = useState<boolean>(true);
    const [confirmDelete, setconfirmDelete] = useState<boolean>(false);
    const [pdfId, setpdfId] = useState<string | undefined>(undefined);

    console.log(process.env.SERVER_URL);

    const getUsersPdfs = async () => {
        if (!userData) return;
        try {
            const res = await axios.get(`https://pdf-server-cff3e7ae4cde.herokuapp.com/mypdfs/${userData._id}`);
            console.log(res.data);
            setpdfs(res.data);
            setloading(false);
        } catch (error) {
            console.log(error);
            setloading(false);
        }
    }

    const editPdf = (id: string, name: string) => {
        router.push(`/modifyPdf?id=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}`);
    }

    const deletePdf = async () => {
        if (!pdfId) return;
        try {
            const res = await axios.delete(`https://pdf-server-cff3e7ae4cde.herokuapp.com/pdf/${pdfId}`);
            console.log(res.data);
            setconfirmDelete(false);
            getUsersPdfs();
            toast.success('PDF deleted successfully');
        } catch (error) {
            console.log(error);
            toast.error('Error deleting PDF');
            setconfirmDelete(false);
        }
    }

    useEffect(() => {
        getUsersPdfs();
    }, [loading, userData, getUsersPdfs])


    return (
        <div className='h-full' style={{ backgroundImage: `url(https://static.vecteezy.com/system/resources/previews/011/231/545/non_2x/abstract-modern-triangle-geometry-shape-backdrop-for-presentation-background-and-minimalist-wallpaper-free-vector.jpg)` }}>
            <div className='w-full mx-auto max-w-[1366px] h-full'>
            <div className='flex justify-between gap-5 mt-[80px] border-b-2 py-4 px-10'>
                <h1 className='text-xl md:text-3xl tracking-wide my-auto'>
                    Your PDFs :
                </h1>
                <span className='border-2 flex-shrink-0 flex-grow-0 rounded-md p-2 h-10 text-center w-10 border-gray-400 text-gray-600'>{pdfs.length}</span>
            </div>
            {loading ? <div className='flex justify-center items-center h-[500px]'>
                <h1 className='text-3xl tracking-wide'><HashLoader color="#003B73" /></h1>
            </div>
                : <div className='md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-5 px-5 md:px-20 py-5'>
                    {
                        pdfs.map((pdf) => (
                            <div key={pdf._id} className='flex flex-col justify-between hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-center hover:bg-gray-100 rounded-md p-5'>
                                <h1 className='text-2xl break-words w-full p-3 tracking-wide'>{pdf.originalName}</h1>
                                <Document className='flex w-full justify-center' file={`https://pdf-server-cff3e7ae4cde.herokuapp.com/pdfs/${pdf.storedName}`}>
                                    <Page className='border-2 border-gray-500 rounded-md' pageNumber={1} width={200} renderTextLayer={false} />
                                </Document>
                                <div className='self-baseline w-full'>
                                    <div className='flex gap-5 p-3 justify-center'>
                                        <button onClick={() => editPdf(pdf._id, pdf.storedName)} className='bg-[#00BFFF] hover:bg-cyan-600 text-white text-sm font-semibold py-2 px-4 rounded-md'>Edit</button>
                                        <DownloadButton css='bg-[#00BFFF] hover:bg-cyan-600 text-white text-sm font-semibold py-2 px-4 rounded-md' pdfUrl={`https://pdf-server-cff3e7ae4cde.herokuapp.com/pdfs/${pdf.storedName}`} />
                                    </div>
                                    <button onClick={() => { setconfirmDelete(true); setpdfId(pdf._id) }} className='bg-red-600 hover:bg-red-800 text-white text-sm font-semibold py-2 px-4 rounded-md'>Delete</button>
                                </div>
                            </div>
                        ))
                    }
                </div>}
            {confirmDelete && <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden bg-gray-500/25 grid place-items-center backdrop-blur-md overflow-y-auto md:inset-0 h-screen max-h-full">
                <div className="relative w-full max-w-lg max-h-full">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-start justify-between p-4 border-b rounded-t ">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                Are you sure you want to delete this PDF ?
                            </h3>
                            <button onClick={() => setconfirmDelete(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center" data-modal-hide="static-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <p className="text-base leading-relaxed text-gray-500">
                                If you delete this PDF, you won&apos;t be able to recover it and you have to upload it again.
                                We suggest you to download it before deleting.
                            </p>
                        </div>
                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
                            <button onClick={deletePdf} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Delete</button>
                            <button onClick={() => setconfirmDelete(false)} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 ">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>}
            </div>
        </div>
    )
}

export default Page1;

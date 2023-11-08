import React, { useState, useEffect, useContext } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { useRouter } from 'next/navigation';
import { GlobalContext } from '../context/context';
import toast from 'react-hot-toast';
import { IoArrowBackCircleSharp } from 'react-icons/io5';

interface Props {
    url: string;
    id: string | null;
}

const PdfPageSelector = ({ url, id }: Props) => {

    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

    const { userData } = useContext<any>(GlobalContext);
    const router = useRouter();

    const [selectedPages, setSelectedPages] = useState<number[]>([]);
    const [numPages, setNumPages] = useState(0);

    const handlePageSelect = (pageNumber: number) => {
        if (selectedPages.includes(pageNumber)) {
            // If the page is already selected, deselect it
            setSelectedPages(selectedPages.filter((page) => page !== pageNumber));
        } else {
            // If the page is not selected, select it
            setSelectedPages([...selectedPages, pageNumber]);
        }
    };

    useEffect(() => {
        pdfjs.getDocument(url).promise.then((pdf) => {
            setNumPages(pdf.numPages);
        });
    }, [url]);

    const handleExtract = async () => {

        const data = JSON.stringify({
            id: id,
            selectedPageNumbers: selectedPages,
            userId: userData._id,
        });


        try {
            const response = await fetch(`https://pdf-server-cff3e7ae4cde.herokuapp.com/extract`, {
                method: 'POST',
                body: data,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const json = await response.json();
                console.log('Selected pages extracted and saved');
                router.push(`/downloadPdf?id=${encodeURIComponent(json.id)}`);
                toast.success('Selected pages extracted successfully');
            } else {
                console.log('PDF extraction failed');
                toast.error('PDF extraction failed');
            }
        } catch (error) {
            console.error('Error extracting PDF:', error);
        }
    };

    return (
        <div className="h-screen" style={{ backgroundImage: `url(https://static.vecteezy.com/system/resources/previews/011/231/545/non_2x/abstract-modern-triangle-geometry-shape-backdrop-for-presentation-background-and-minimalist-wallpaper-free-vector.jpg)` }}>
            <div className='w-full mx-auto max-w-[1366px] border-b-2 px-6 py-3'>
                <div className='flex justify-between'>
                    <span className='flex gap-3 my-auto'>
                        <IoArrowBackCircleSharp onClick={()=>router.back()} className='text-4xl cursor-pointer' />
                        <h1 className='hidden md:block md:text-3xl tracking-wide'>Select Pages</h1>
                    </span>
                    <div className='flex gap-5'>
                        <span className='border-2 flex-shrink-0 flex-grow-0 rounded-md p-2 h-10 text-center w-10 border-gray-400 text-gray-600'>{selectedPages.length}</span>
                        <button disabled={selectedPages.length === 0} className='px-4 py-2 rounded-md bg-[#ffc107] font-semibold' onClick={handleExtract}>Extract Pages</button>
                    </div>
                </div>
                <p className='text-gray-500 tracking-wider py-3 md:py-0 md:px-12'>Click on a page to select it, and use the navigation buttons to move between pages.</p>
            </div>
            <Document
                file={url}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                className='relative w-full md:w-[600px] lg:w-[900px] md:pt-10 mx-auto'
            >
                <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className=""
                    containerClass="container"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside
                    responsive={{
                        desktop: {
                            breakpoint: {
                                max: 3000,
                                min: 1024
                            },
                            items: 2,
                        },
                        mobile: {
                            breakpoint: {
                                max: 464,
                                min: 0
                            },
                            items: 1,
                        },
                        tablet: {
                            breakpoint: {
                                max: 1024,
                                min: 464
                            },
                            items: 1
                        }
                    }}
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    shouldResetAutoplay
                    showDots
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                >
                    {Array.from({ length: numPages }, (_, index) => (
                        <div key={index + 1} onClick={() => handlePageSelect(index + 1)} className={`md:overflow-hidden overflow-auto relative shadow-[0_3px_10px_rgb(0,0,0,0.2)] cursor-pointer rounded-md p-1 md:w-[400px] mx-5 md:mx-[100px] lg:mx-[25px] ${selectedPages.includes(index + 1) ? 'border-4 border-[#055C9D]' : 'border-2 border-gray-500'}`}>
                            <Page
                                pageNumber={index + 1}
                                renderTextLayer={false}
                                width={390}
                            />
                            <label className={`inline-flex absolute right-2 top-2 items-center space-x-2 rounded-full border-2 ${selectedPages.includes(index + 1) ? 'border-[#055C9D]' : 'border-gray-500'} p-0.5`}>
                                <input type="checkbox" className="appearance-none w-2 h-2 rounded-full checked:bg-[#055C9D]" checked={selectedPages.includes(index + 1)} />
                            </label>
                        </div>
                    ))}

                </Carousel>
            </Document>
        </div>
    );
};

export default PdfPageSelector;

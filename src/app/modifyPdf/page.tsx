"use client";

import { useSearchParams } from "next/navigation";
import PdfPageSelector from '../components/PdfPageSelector';

const page = () => {

    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const pdfPath = `https://pdf-server-cff3e7ae4cde.herokuapp.com/pdfs/${name}`;

  return (
    <div className="my-[80px] h-full">
        <PdfPageSelector url={pdfPath} id={id} />
    </div>
  )
}

export default page

'use client';

import ImageUpload from "@/components/ImageUpload";


export default function UploadLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="">
            <main className="grid grid-cols-4 flex-1 gap-4 overflow-auto p-4">
                <div className="col-span-1 items-start gap-8 md:flex  pr-8">
                    <ImageUpload />
                </div>
                {children}
            </main>
        </div>
    );
}

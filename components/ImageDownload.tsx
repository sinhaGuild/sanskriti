import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { ImageDown } from 'lucide-react';
import { Button } from './ui/button';

interface ImageDownloadProps {
    originalUrl: string;
    transformedUrl: string;
    fileName: string; // Base name for the files
}

const ImageDownload: React.FC<ImageDownloadProps> = ({ originalUrl, transformedUrl, fileName }) => {
    const handleDownload = async () => {
        const zip = new JSZip();

        // Fetch the original image
        const originalResponse = await fetch(originalUrl);
        const originalBlob = await originalResponse.blob();
        zip.file(`${fileName}.jpg`, originalBlob); // Add original image to zip

        // Fetch the transformed image
        const transformedResponse = await fetch(transformedUrl);
        const transformedBlob = await transformedResponse.blob();
        zip.file(`${fileName}_colorized.jpg`, transformedBlob); // Add transformed image to zip

        // Generate the zip file
        const content = await zip.generateAsync({ type: 'blob' });

        // Save the zip file
        saveAs(content, `${fileName}_images.zip`);
    };

    return (
        <Button onClick={handleDownload} variant="ghost" size="icon" className="p-6 bg-amber-300  rounded-full [&_svg]:w-[2.4rem] [&_svg]:h-[2rem] absolute m-6 hover:bg-amber-500" >
            <ImageDown className='text-slate-800 ' />
        </Button>
    );
};

export default ImageDownload;
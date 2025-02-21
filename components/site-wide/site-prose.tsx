import {
    CreditCard,
    Download,
    Layers,
    Lock,
    Monitor,
    Palette
} from "lucide-react";

export const features = [
    {
        "title": "AI-Powered Image Colorization",
        "description": "Transform black and white images into vibrant colorized versions using advanced AI models, providing stunning results that enhance your visual content.",
        "icon": <Palette className='size-4 md:size-6' />
    },
    {
        "title": "Seamless Stripe Integration",
        "description": "Easily purchase credits through a secure and user-friendly Stripe Checkout experience, allowing you to access premium features without hassle.",
        "icon": <CreditCard className='size-4 md:size-6' />
    },
    {
        "title": "Batch Processing Capabilities",
        "description": "Efficiently process multiple images at once, saving you time and effort while managing large volumes of visual content.",
        "icon": <Layers className='size-4 md:size-6' />
    },
    {
        "title": "User-Friendly Interface",
        "description": "Enjoy a clean and intuitive interface that makes it easy for users of all skill levels to upload, transform, and download images effortlessly.",
        "icon": <Monitor className='size-4 md:size-6' />
    },
    {
        "title": "Secure Image Storage",
        "description": "Rest assured that your images are securely stored in Firebase Storage, with robust privacy measures to protect your data.",
        "icon": <Lock className='size-4 md:size-6' />
    },
    {
        "title": "Instant Download Options",
        "description": "Quickly download both original and transformed images as a zip file, making it convenient to access and share your enhanced visuals.",
        "icon": <Download className='size-4 md:size-6' />
    }
]


export const people = [
    {
        id: "person-1",
        name: "Name",
        role: "Role",
        avatar: "https://shadcnblocks.com/images/block/avatar-1.webp",
    },
    {
        id: "person-2",
        name: "Name",
        role: "Role",
        avatar: "https://shadcnblocks.com/images/block/avatar-2.webp",
    },
    {
        id: "person-3",
        name: "Name",
        role: "Role",
        avatar: "https://shadcnblocks.com/images/block/avatar-3.webp",
    },
    {
        id: "person-4",
        name: "Name",
        role: "Role",
        avatar: "https://shadcnblocks.com/images/block/avatar-4.webp",
    },
    {
        id: "person-5",
        name: "Name",
        role: "Role",
        avatar: "https://shadcnblocks.com/images/block/avatar-5.webp",
    },
    {
        id: "person-6",
        name: "Name",
        role: "Role",
        avatar: "https://shadcnblocks.com/images/block/avatar-6.webp",
    },
    {
        id: "person-7",
        name: "Name",
        role: "Role",
        avatar: "https://shadcnblocks.com/images/block/avatar-7.webp",
    },
    {
        id: "person-8",
        name: "Name",
        role: "Role",
        avatar: "https://shadcnblocks.com/images/block/avatar-8.webp",
    },
];

export const faqs = [
    {
        "question": "What types of images can I upload?",
        "answer": "You can upload various image formats, including JPEG, PNG, and GIF. Ensure that the file size does not exceed the maximum limit set by the application."
    },
    {
        "question": "How does the image transformation feature work?",
        "answer": "The image transformation feature uses an AI model to colorize black and white images. Once you upload an image, it will be processed, and the transformed image will be available for download."
    },
    {
        "question": "What are credits, and how do I purchase them?",
        "answer": "Credits are used to access premium features of the application, such as image transformations. You can purchase credits through the Stripe Checkout page by specifying the number of credits you want to buy."
    },
    {
        "question": "How do I know how many credits I have?",
        "answer": "You can view your current credit balance in your user profile or account settings within the application."
    },
    {
        "question": "What happens after I purchase credits?",
        "answer": "After purchasing credits, your account will be updated with the new balance. You will receive a confirmation email, and you can start using the credits immediately."
    },
    {
        "question": "Can I download the images I have processed?",
        "answer": "Yes, you can download both the original and transformed images as a zip file. Simply click the 'Download Images' button next to the processed images."
    },
    {
        "question": "What should I do if I encounter an error while uploading an image?",
        "answer": "If you encounter an error while uploading an image, please check the file format and size. If the issue persists, contact our support team for assistance."
    },
    {
        "question": "Is my payment information secure?",
        "answer": "Yes, all payment transactions are processed securely through Stripe, which complies with the highest security standards to protect your payment information."
    },
    {
        "question": "How are my images stored?",
        "answer": "Uploaded images are securely stored in Firebase Storage. We take data privacy seriously and ensure that your images are protected and accessible only to you."
    },
    {
        "question": "What is a dual decoder transformer model, and how is it used in image colorization?",
        "answer": "A dual decoder transformer model is a type of neural network architecture that uses two decoders to process and generate image data. In our application, it is used to enhance the colorization of images by effectively capturing both global and local features."
    },
    {
        "question": "How does the piddnad/ddcolor model work to colorize images?",
        "answer": "The piddnad/ddcolor model is a pre-trained AI model that uses advanced machine learning techniques to predict and apply colors to grayscale images. It analyzes the content of the image and generates realistic colorization based on learned patterns from a large dataset."
    },
    {
        "question": "Can I contact you for batch or bulk image processing jobs?",
        "answer": "Yes, we offer services for batch or bulk image processing jobs. Please contact our support team with your requirements, and we will provide you with the necessary information and pricing."
    },
    {
        "question": "How can I contact support if I have further questions?",
        "answer": "You can contact our support team via the 'Contact Us' section of the application. We are here to help you with any questions or issues you may have."
    },
    {
        "question": "Can I use the application on mobile devices?",
        "answer": "Yes, the application is designed to be responsive and can be used on both desktop and mobile devices."
    }
]


export const values = [
    {
        "title": "User-Centric Design",
        "content": "We prioritize our users' needs and experiences, ensuring that our application is intuitive, accessible, and tailored to provide maximum value."
    },
    {
        "title": "Innovation",
        "content": "We embrace cutting-edge technology and continuously seek new ways to enhance our services, pushing the boundaries of what's possible in image processing."
    },
    {
        "title": "Quality Assurance",
        "content": "We are committed to delivering high-quality results, rigorously testing our features to ensure they meet the highest standards of performance and reliability."
    },
    {
        "title": "Integrity",
        "content": "We operate with transparency and honesty, building trust with our users by safeguarding their data and providing clear communication about our services."
    },
    {
        "title": "Collaboration",
        "content": "We believe in the power of teamwork and collaboration, fostering a culture where diverse ideas and perspectives are valued and encouraged."
    },
    {
        "title": "Sustainability",
        "content": "We are dedicated to minimizing our environmental impact and promoting sustainable practices within our operations and community."
    }
]



import zp11 from '@/public/images/1.jpg';
import zp12 from '@/public/images/2.jpg';
import zp13 from '@/public/images/3.jpg';
import zp14 from '@/public/images/4.jpg';
import zp15 from '@/public/images/5.jpg';
import zp16 from '@/public/images/6.jpg';
import zp17 from '@/public/images/7.jpg';

export const zp1 = [zp11, zp12, zp13, zp14, zp15, zp16, zp17]

import zp21 from '@/public/images/zp_2/1.jpg';
import zp22 from '@/public/images/zp_2/2.jpg';
import zp23 from '@/public/images/zp_2/3.jpg';
import zp24 from '@/public/images/zp_2/4.jpg';
import zp25 from '@/public/images/zp_2/5.jpg';
import zp26 from '@/public/images/zp_2/6.jpg';
import zp27 from '@/public/images/zp_2/7.jpg';

export const zp2 = [zp21, zp22, zp23, zp24, zp25, zp26, zp27]
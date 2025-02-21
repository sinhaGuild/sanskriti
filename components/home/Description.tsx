
export default function Description({ description }: { description: string }) {
    return (
        <div className='flex justify-center my-40'>
            <p className='text-[7.5vw] uppercase text-center max-w-[50vw] leading-none'>{description}</p>
        </div>
    )
}

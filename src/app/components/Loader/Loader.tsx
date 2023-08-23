import './loaderStyles.scss'

export function Loader() {
    return (
        <div className='flex justify-center items-center w-full h-[30vh]'>
            <span className="loader"></span>
        </div>
    )
}
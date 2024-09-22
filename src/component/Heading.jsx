const Heading = ({refreshFolders}) => {
    return(
        <>
        <div className="flex flex-col">

        <div className="mx-10 my-2 flex bg-black text-amber-400 border-l-4 border-r-4 border-amber-400 items-center justify-between px-20 py-5">
                <span className="font-bold text-md">NAME</span>
                <div className="flex flex-row justify-right gap-24 mr-48">
               
                <span className="font-bold text-md">CREATED AT</span>
                <span className="font-bold text-md ">DATE</span>
                </div>
               
            </div>
            <div className="flex justify-center m-4">

            <button
                    className="bg-black font-bold text-amber-400  py-2 rounded-md mr-36 w-24 items-center "
                    onClick={refreshFolders}
                    >
                        REFRESH
                    </button>
                        </div>
        </div>
        </>
    )
}


export default Heading;
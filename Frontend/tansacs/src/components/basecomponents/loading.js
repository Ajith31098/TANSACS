function LoadingComponent(props) {

    return ( 

        <>
    
            <div className="h-full bg-white fixed  inset-0" style={{ zIndex: 999 }}>
                <div className="flex justify-center items-center h-full">
                    <img className="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="Loading spinner"/>
                </div>
            </div>
        </>
     )



}

export default LoadingComponent;

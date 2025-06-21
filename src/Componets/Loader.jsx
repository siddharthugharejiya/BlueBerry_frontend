const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <div className="relative w-16 h-16">
                {/* Spinner border */}
                <div className="absolute inset-0 border-4 border-purple-500 border-dashed rounded-full animate-spin"></div>

                {/* Static image inside center */}
                <img
                    src="../loader.png"
                    alt="Loading"
                    className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 animate-none"
                />
            </div>
        </div>
    );
};

export default Loader;

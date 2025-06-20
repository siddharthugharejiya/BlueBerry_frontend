import { Link } from 'react-router-dom';

function Footer() {

    return (
        <>
            <div className='bg-[#F8F8FB] mt-5 px-4 md:px-10 py-10' data-aos="fade-up">
                <div>
                    <h1 className='font-semibold text-2xl text-center mb-6' data-aos="zoom-in">Brands Directory</h1>

                    <div className="grid 2xl:grid-cols-2 gap-6 mb-6" data-aos="fade-right">
                        <div className="text-text flex flex-wrap">
                            <span className="font-bold mr-2">Footwear :</span>
                            <span className="pr-4 relative">Sneakers <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Loafers <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Sandals <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Slippers <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Boots <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Heels <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Flip Flops <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Formal Shoes <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Sports Shoes <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Floaters <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Mules <span className="absolute right-0">|</span></span>
                            <span className="px-4">Ethnic Footwear</span>
                        </div>

                        <div className="text-text flex flex-wrap">
                            <span className="font-bold mr-2">Jewellery :</span>
                            <span className="pr-4 relative">Necklace <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Earrings <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Couple Rings <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Pendants <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Crystal <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Bangles <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Bracelets <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Nose Pin <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Chain <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Mangalsutra <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Anklets <span className="absolute right-0">|</span></span>
                            <span className="px-4">Toe Rings</span>
                        </div>
                    </div>

                    <div className="grid 2xl:grid-cols-2 xl:grid-cols-2 gap-6" data-aos="fade-left">
                        <div className="text-text flex flex-wrap">
                            <span className="font-bold mr-2">Fashion :</span>
                            <span className="pr-4 relative">T-shirt <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Shirt <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Jeans <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Jacket <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Kurti <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Hoodies <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Dresses <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Skirts <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Trousers <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Sweaters <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Blazers <span className="absolute right-0">|</span></span>
                            <span className="px-4">Leggings</span>
                        </div>

                        <div className="text-text flex flex-wrap">
                            <span className="font-bold mr-2">Cosmetics :</span>
                            <span className="pr-4 relative">Lipstick <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Foundation <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Kajal <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Compact <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Blush <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Highlighter <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Concealer <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Primer <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Mascara <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Eyeliner <span className="absolute right-0">|</span></span>
                            <span className="px-4 relative">Nail Paint <span className="absolute right-0">|</span></span>
                            <span className="px-4">Makeup Remover</span>
                        </div>
                    </div>
                    <hr className='border-solid border-[1px] mt-6' />
                </div>

                <div className="grid 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 p-10" data-aos="zoom-in-up">
                    <div className='grid items-center mr-5'>
                        <img src="./logo.png" alt="" />
                        <p className='text-text my-5'>BlueBerry is the biggest market of grocery products. Get your daily needs from our store</p>
                        <div className='grid grid-cols-2 gap-3'>
                            <img src="./android.png" alt="" className='rounded-lg' />
                            <img src="./apple.png" alt="" className='rounded-lg' />
                        </div>
                    </div>

                    <div>
                        <h1 className='font-bold text-text border-b-2 w-[75%] pb-4 mb-2'>Category</h1>
                        <p className='text-text pb-2 font-medium'>Dairy & Milk</p>
                        <p className='text-text pb-2 font-medium'>Snack & Spice</p>
                        <p className='text-text pb-2 font-medium'>Fast Food</p>
                        <p className='text-text pb-2 font-medium'>Juice & Drinks</p>
                        <p className='text-text pb-2 font-medium'>Bakery</p>
                        <p className='text-text pb-2 font-medium'>Seafood</p>
                    </div>

                    <div>
                        <h1 className='font-bold text-text border-b-2 w-[75%] pb-4 mb-2'>Company</h1>
                        <p className='text-text pb-2 font-medium'>About us</p>
                        <p className='text-text pb-2 font-medium'>Delivery</p>
                        <p className='text-text pb-2 font-medium'>Legal Notice</p>
                        <p className='text-text pb-2 font-medium'>Terms & Conditions</p>
                        <p className='text-text pb-2 font-medium'>Secure Payment</p>
                        <p className='text-text pb-2 font-medium'>Contact us</p>
                    </div>

                    <div>
                        <h1 className='font-bold text-text border-b-2 w-[75%] pb-4 mb-2'>Account</h1>
                        <p className='text-text pb-2 font-medium'>Sign In</p>
                        <p className='text-text pb-2 font-medium'>View Cart</p>
                        <p className='text-text pb-2 font-medium'>Return Policy</p>
                        <p className='text-text pb-2 font-medium'>Become a Vendor</p>
                        <p className='text-text pb-2 font-medium'>Affiliate Program</p>
                        <p className='text-text pb-2 font-medium'>Payments</p>
                    </div>

                    <div>
                        <h1 className='font-bold text-text border-b-2 w-[75%] pb-4 mb-2'>Contact</h1>
                        <p className='text-text pb-2 font-medium'>971 Lajamni, Motavarachha, Surat, Gujarat, Bharat 394101.</p>
                        <p className='text-text pb-2 font-medium'>+00 9876543210</p>
                        <p className='text-text pb-2 font-medium'>example@email.com</p>
                        <div>
                            <i className="text-xl py-1 px-2 bg-[#3d4750] text-white hover:bg-text ms-1 rounded-2xl fa-brands fa-facebook"></i>
                            <i className="text-xl py-1 px-2 bg-[#3d4750] text-white hover:bg-text ms-1 rounded-2xl fa-brands fa-instagram"></i>
                            <i className="text-xl py-1 px-2 bg-[#3d4750] text-white hover:bg-text ms-1 rounded-2xl fa-brands fa-linkedin"></i>
                            <i className="text-xl py-1 px-2 bg-[#3d4750] text-white hover:bg-text ms-1 rounded-2xl fa-brands fa-x-twitter"></i>
                        </div>
                    </div>
                </div>

                <hr className='border-solid' />
                <div>
                    <div class="footer-bottom py-[10px] border-t-[1px] border-solid border-[#eee] max-[991px]:py-[15px]" data-aos="fade-up">
                        <div class="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
                            <div class="flex flex-wrap w-full">
                                <div class="bb-bottom-info w-full flex flex-row items-center justify-between max-[991px]:flex-col px-[12px]">
                                    <div class="footer-copy max-[991px]:mb-[15px]">
                                        <div class="footer-bottom-copy max-[991px]:text-center">
                                            <div class="bb-copy text-[#686e7d] text-[13px] tracking-[1px] text-center font-normal leading-[2]">Copyright © <span class="text-[#686e7d] text-[13px] tracking-[1px] text-center font-normal" id="copyright_year">2025</span>
                                                <Link class="site-name transition-all duration-[0.3s] ease-in-out font-medium text-[#6c7fd8] hover:text-[#3d4750] font-Poppins text-[15px] leading-[28px] tracking-[0.03rem]" >Siddharth Ugharejiya</Link> all rights reserved.
                                            </div>
                                        </div>
                                    </div>
                                    <div class="footer-bottom-right">
                                        <div class="footer-bottom-payment flex justify-center">
                                            <div class="payment-link">
                                                <img src="../payment.png" alt="payment" class="max-[360px]:w-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div></div>
            </div>
        </>
    )
}

export default Footer;

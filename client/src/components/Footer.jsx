import { Footer, FooterCopyright, FooterDivider, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle } from "flowbite-react"
import { Link } from "react-router-dom";
import Logo from '../assets/images/TECHAID.png'
import { FaFacebookSquare, FaInstagramSquare, } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

function Footercomp() {
    return (
        <Footer container className="">
            <div className="w-full mx-auto max-w-7xl">
                <div className="w-full justify-between sm:flex md:grid-cols-1 grid">
                    <div className="mt-5">
                        <Link to='/' className='self-center size-100 sm:size-max bg-gradient from-purple-500 via-blue-500 to-pink-500 rounded'>
                            <img src={Logo} alt="" height={20} width={175} />
                        </Link>
                    </div>


                    <div className="grid grid-cols-2 sm:grid-cols-3 mt-4  gap-20 sm:gap-40">
                        <div className="">
                            <FooterTitle title="Abouts" />
                            <FooterLinkGroup>
                                <FooterLink
                                    href=""
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Tech+
                                </FooterLink>
                            </FooterLinkGroup>
                            <FooterLinkGroup>
                                <FooterLink
                                    href="/about"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Tech+
                                </FooterLink>
                            </FooterLinkGroup>
                        </div>
                        <div>
                            <FooterTitle title="Abouts" />
                            <FooterLinkGroup>
                                <FooterLink
                                    href=""
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Tech+
                                </FooterLink>
                            </FooterLinkGroup>
                            <FooterLinkGroup>
                                <FooterLink
                                    href="/about"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Tech+
                                </FooterLink>
                            </FooterLinkGroup>
                        </div>
                        <div>
                            <FooterTitle title="Abouts" />
                            <FooterLinkGroup>
                                <FooterLink
                                    href=""
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Tech+
                                </FooterLink>
                            </FooterLinkGroup>
                            <FooterLinkGroup>
                                <FooterLink
                                    href="/about"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Tech+
                                </FooterLink>
                            </FooterLinkGroup>
                        </div>
                    </div>

                </div>
                <FooterDivider />
                <div className="w-full sm:flex sm:justify-between sm:items-center">
                    <FooterCopyright
                        href=""
                        by="TechPlus"
                        year={new Date().getFullYear()}
                    />
                    <div className=" flex gap-6 mt-4 sm:mt-0 ">
                        <FooterIcon href="" icon={FaFacebookSquare} />
                        <FooterIcon href="" icon={FaInstagramSquare} />
                        <FooterIcon href="" icon={FaSquareXTwitter} />
                    </div>
                </div>
            </div>
        </Footer>
    )
}

export default Footercomp
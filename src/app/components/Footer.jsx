import React from "react";

const Footer = () => {
    return (
        <>
            <footer className="bg-blue-500 flex flex-col gap-4 py-4">
            <div>
                <ul className="flex justify-center gap-4">
                    <li>
                        <a href="#" className="text-white">Facebook</a>
                    </li>
                    <li>
                        <a href="#" className="text-white">Instagram</a>
                    </li>
                    <li>
                        <a href="#" className="text-white">Linkedin</a>
                    </li>
                    <li>
                        <a href="#" className="text-white">Twitter</a>
                    </li>
                </ul>
            </div>
                <div className="flex justify-center">
                <small className="text-gray-800 font-semibold">
                    @copyright 2025
                </small>
                </div>
            </footer>
        </>
    )
}

export default Footer;
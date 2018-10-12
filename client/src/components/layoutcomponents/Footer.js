import React from 'react';

const Footer = () => {
    return(
        <div>
            <footer  className="bg-secondary text-white mt-5 p-4 text-center">
                <p> Copyright &copy; {new Date().getFullYear()} Aggregio </p>
            </footer>
        </div>
    );
};
export default Footer;
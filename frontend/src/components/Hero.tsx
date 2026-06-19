import React from 'react';
import banner from '../assets/banner.png'

const Hero: React.FC = () => {
    return (
        <section className="hero" id="home">
            <div>
                <img src={banner} />
            </div>
        </section>
    );
};

export default Hero;
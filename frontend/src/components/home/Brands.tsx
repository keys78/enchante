import { motion } from "framer-motion";
import dior from '../../assets/brandlogos/christiandior.png';
import lv from '../../assets/brandlogos/lv.png';
import channel from '../../assets/brandlogos/channel.png';
import adidas from '../../assets/brandlogos/adidas.png';
import patek from '../../assets/brandlogos/patek.png';
import versace from '../../assets/brandlogos/versace.png';
import vs from '../../assets/brandlogos/vs.png';
import nb from '../../assets/brandlogos/nb.png';
import hb from '../../assets/brandlogos/hb.png';
import zara from '../../assets/brandlogos/zara.png';
import fendi from '../../assets/brandlogos/fendi.png';
import armani from '../../assets/brandlogos/armani.png';
import cartier from '../../assets/brandlogos/cartier.png';

const marqueeVariants = {
    animate: {
        x: [0, -2060],
        transition: {
            x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 200,
                ease: "linear",
            },
        },
    },
};

const Brands = () => {
    return (
        <section className="s-1120:py-[200px] s-1025:py-[100px] s-767:py-[70px] py-[40px]">
            <div className="marquee">
                <motion.div className="track flex items-center s-767:space-x-24 space-x-10" variants={marqueeVariants} animate="animate" >
                    <img className="s-767:w-[250px] w-[125px] inline-block" src={patek} loading="lazy" />
                    <img className="s-767:w-[250px] w-[125px] inline-block" src={dior} loading="lazy" />
                    <img className="s-767:w-[80px] w-[40px] inline-block" src={lv} loading="lazy" />
                    <img className="s-767:w-[150px] w-[75px] inline-block" src={channel} loading="lazy" />
                    <img className="s-767:w-[100px] w-[50px] inline-block" src={adidas} loading="lazy" />
                    <img className="brand-logo" src={versace} loading="lazy" />
                    <img className="s-767:w-[100px] w-[50px] inline-block" src={vs} loading="lazy" />
                    <img className="brand-logo" src={nb} loading="lazy" />
                    <img className="brand-logo" src={hb} loading="lazy" />
                    <img className="brand-logo" src={zara} loading="lazy" />
                    <img className="brand-logo" src={fendi} loading="lazy" />
                    <img className="brand-logo" src={armani} loading="lazy" />
                    <img className="brand-logo" src={cartier} loading="lazy" />
                    <img className="s-767:w-[250px] w-[125px] inline-block" src={patek} loading="lazy" />
                    <img className="s-767:w-[250px] w-[125px] inline-block" src={dior} loading="lazy" />
                    <img className="s-767:w-[80px] w-[40px] inline-block" src={lv} loading="lazy" />
                    <img className="s-767:w-[150px] w-[75px] inline-block" src={channel} loading="lazy" />
                    <img className="s-767:w-[100px] w-[50px] inline-block" src={adidas} loading="lazy" />
                    <img className="brand-logo" src={versace} loading="lazy" />
                    <img className="s-767:w-[100px] w-[50px] inline-block" src={vs} loading="lazy" />
                    <img className="brand-logo" src={nb} loading="lazy" />
                    <img className="brand-logo" src={hb} loading="lazy" />
                    <img className="brand-logo" src={zara} loading="lazy" />
                    <img className="brand-logo" src={fendi} loading="lazy" />
                    <img className="brand-logo" src={armani} loading="lazy" />
                    <img className="brand-logo" src={cartier} loading="lazy" />
                </motion.div>
            </div>
        </section>
    );
};

export default Brands;

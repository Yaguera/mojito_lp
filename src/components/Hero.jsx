import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const videoRef = useRef();

    const isMobile = useMediaQuery({ maxWidth: 767 })

    useGSAP(() => {
        const heroSplit = new SplitText('.title', {type: 'chars, words'})
        const paragraphSplit = new SplitText('.subtitle', {type: 'lines'})

        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));
        gsap.from(heroSplit.chars, {
          yPercent: 100,
          duration: 1.2,
          opacity: 0,
          ease: 'expo.inOut',
          stagger:0.06  
        });

        gsap.from(paragraphSplit.lines, {
            opacity:0,
            yPercent: 100,
            duration: 1.2,
            stagger:0.06,
            delay: 1
        });

        // leafs animation
        gsap.timeline({
           scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,

           } 
        })
        .to('.right-leaf', {y: 200}, 0)
        .to('.left-leaf', {y:-200}, 0)

        const startValue = isMobile ? 'top 50%' : 'center 60%';
        const endValue = isMobile ? '120% top': 'bottom top';

        gsap.timeline({
            scrollTrigger: {
                trigger: '#hero',
                start: startValue,
                end: endValue,
                scrub: true,
            }
        }).from(videoRef.current, {
            clipPath: 'polygon(33% 0, 67% 0, 67% 100%, 33% 100%)',
        })
    }, [isMobile]);

  return (
    <div className="relative">
        <div className="video absolute inset-0 z-0">
            <video
                ref={videoRef}
                src="/videos/input.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
            />
        </div>

        <div className="noisy z-1 pointer-events-none"></div>

        <section id="hero" className="relative z-10">
            <h1 className="title">MOJITO</h1>

            <img src="/images/hero-left-leaf.png" alt="left-leaf" className="left-leaf" />
            <img src="/images/hero-right-leaf.png" alt="right-leaf" className="right-leaf" />

            <div className="body">
                <div className="content">
                    <div className="space-y-5 hidden md:block">
                        <p>Cool. Crisp. Classic</p>
                        <p className="subtitle">Sip the Spirit <br/> of Summer</p>
                    </div>
                    <div className="view-cocktails">
                        <p className="subtitle">
                            Every cocktail on our menu is a blend of premium ingredients, creative flair, and timeless recipes - designed to delight your senses.
                        </p>
                        <a href="#cocktails">View Cocktails</a>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Hero
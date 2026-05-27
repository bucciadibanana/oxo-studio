import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import gsap from 'gsap';
import { Power2 } from 'gsap';
import CSSRulePlugin from 'gsap/CSSRulePlugin';
import '../index.css';

export default function Header() {
  useEffect(() => {
    const tl = gsap.timeline({ paused: true });
    const path = document.querySelector("path");
    const spanBefore = CSSRulePlugin.getRule("#hamburger span::before");

    gsap.set(spanBefore, { background: "#fffbfb" });

    const hamburger = document.getElementById("hamburger");
    const toggleBtn = document.getElementById("toggle-btn");
    const menu = document.querySelector(".menu");
    const overlay = document.querySelector(".overlay");
    const menuLinks = document.querySelectorAll(".menu a");
    const chars = document.querySelectorAll("#oxo-studio .split-char");

    tl.eventCallback("onReverseComplete", () => {
      if (window.innerWidth < 768) {
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: "power3.out"
        });
      }
    });

    if (toggleBtn) {
      toggleBtn.onclick = function () {
        hamburger.classList.toggle("active");
        const isOpen = hamburger.classList.contains("active");

        menu.classList.toggle("open", isOpen);
        overlay.classList.toggle("active", isOpen);

        document.body.style.overflow = isOpen ? 'hidden' : '';
        document.body.classList.toggle('menu-open', isOpen);
        hamburger.style.zIndex = isOpen ? 1100 : 1001;

        if (tl.reversed()) {
          tl.play();
          if (window.innerWidth < 768) {
            gsap.to(chars, { opacity: 0, y: 50, duration: 0.3, ease: "power1.in" });
          }
        } else {
          tl.reverse();
        }
      };
    }

    menuLinks.forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        menu.classList.remove("open");
        overlay.classList.remove("active");
        if (!tl.reversed()) tl.reverse();
        document.body.style.overflow = '';
        document.body.classList.remove('menu-open');
        hamburger.style.zIndex = 1001;
      });
    });

    const start = "M0 -100 S175 -330 500 -330 s500 230 500 230 V0 H0 Z";
    const end = "M0 1300 S175 1070 500 1070 s500 230 500 230 V0 H0 Z";

    tl.to("#hamburger", 1.25, { marginTop: "5px", x: -110, y: 40, ease: "power4.inOut" });
    tl.to("#hamburger span", 1, { background: "#fffbfb", ease: "power2.inOut" }, "<");
    tl.to(spanBefore, 1, { background: "#fffbfb", ease: "power2.inOut" }, "<");

    // Animazione cerchi verso centro
    tl.to(".btn-outline-1", 1, {
      x: 0,
      y: 0,
      scale: 0.5,
      ease: "power4.inOut"
    }, "<");
    tl.to(".btn-outline-2", 1, {
      x: 0,
      y: 0,
      scale: 0.4,
      ease: "power4.inOut"
    }, "<");

    tl.to(path, 0.8, { attr: { d: start }, ease: Power2.easeIn }, "<");
    tl.to(path, 0.8, { attr: { d: end }, ease: Power2.easeIn }, "-=0.5");

    tl.reverse();
  }, []);

  return (
    <>
      <header className="w-full z-50 top-0 left-0 header lg:fixed relative px-4 py-2 flex justify-between items-center bg-black">
        <h1 className="lg:text-3xl md:text-3xl text-[20px] mt-20 md:mt-2 lg:ml-6 md:ml-6 md:block">
          <a 
            href="mailto:oxostudio.dev@gmail.com" 
            className="antonio lg:inline text-white hover:text-gray-300 transition-colors cursor-pointer"
            id="oxo-studio"
          >
            {"oxostudio.dev@gmail.com".split("").map((char, i) => (
              <span key={i} className="split-char inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </a>
        </h1>

        <nav className="ml-auto">
          <ul className="gap-2 md:gap-8 lg:gap-8 md:mr-6 hidden md:flex">
            <li><Link to="/" className="antonio roll-link" data-text="HOME"><span>HOME</span></Link></li>
            <li><Link to="/ChiSiamo" className="antonio roll-link" data-text="CHI SIAMO"><span>CHI SIAMO</span></Link></li>

            <li><Link to="/Contatti" className="antonio roll-link" data-text="CONTATTI"><span>CONTATTI</span></Link></li>
          </ul>
        </nav>
      </header>

      <div className="btn" id="toggle-btn">
        <div className="btn-outline btn-outline-1"></div>
        <div className="btn-outline btn-outline-2"></div>
        <div id="hamburger">
          <span></span>
        </div>
      </div>

      <div className="menu">
        <div className="menu-items flex flex-col justify-center items-center gap-8 h-screen text-white text-3xl antonio">
          <Link to="/">HOME</Link>
          <Link to="/ChiSiamo">CHI SIAMO</Link>
         
          <Link to="/Contatti">CONTATTI</Link>
        </div>
      </div>
    </>
  );
}

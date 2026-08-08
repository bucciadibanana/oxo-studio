import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

import Router from "./Router/Router";
import Header from "./components/Header";
import SplashScreen from "./components/SpashScreen";
import ScrollTriggerHandler from "./components/ScrollTriggerHandler";

gsap.registerPlugin(
  ScrollTrigger,
  ScrollToPlugin,
  useGSAP
);

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const location = useLocation();
  const pageRef = useRef(null);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  useGSAP(
    () => {
      if (showSplash || !pageRef.current) {
        return;
      }

      gsap.fromTo(
        pageRef.current,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 0.65,
          ease: "power2.out",

          // IMPORTANTISSIMO:
          // niente transform, y o scale sul wrapper
          clearProps: "opacity,visibility",
        }
      );
    },
    {
      scope: pageRef,
      dependencies: [
        location.key,
        showSplash,
      ],
      revertOnUpdate: true,
    }
  );

  if (showSplash) {
    return (
      <SplashScreen
        onFinish={handleSplashFinish}
      />
    );
  }

  return (
    <>
      {/*
        HEADER FUORI DAL CONTENITORE DELLE PAGINE.

        Deve rimanere qui.
        Non inserirlo dentro .page-content.
      */}
      <Header />

      {/*
        Questo wrapper NON deve mai ricevere
        transform, translate, scale ecc.
      */}
      <div
        key={location.key}
        ref={pageRef}
        className="page-content"
      >
        <Router />
      </div>

      <ScrollTriggerHandler />
    </>
  );
}

export default App;
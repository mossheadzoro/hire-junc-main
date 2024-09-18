import AuthWrapper from "../components/AuthWrapper";
import Business from "../components/Landing/Business";
import Companies from "../components/Landing/Companies";
import Everything from "../components/Landing/Everything";
import HeroBanner from "../components/Landing/HeroBanner";
import Join from "../components/Landing/Join";
import PopularServices from "../components/Landing/PopularServices";
import Services from "../components/Landing/Services";

import { useStateProvider } from "../context/StateContext";
import React from "react";

function Index() {
  const [{ showLoginModal, showSignupModal }] = useStateProvider();

  return (
    <div>
      <HeroBanner />
      <Companies />
      <PopularServices />
      <Everything />
      <Services />
  
      <Business />
      <Join/>
      {(showLoginModal || showSignupModal) && (
        <AuthWrapper type={showLoginModal ? "login" : "signup"} />
      )}
    </div>
  );
}

export default Index;

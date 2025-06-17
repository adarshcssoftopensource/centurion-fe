import { Button } from '~/components/ui/button';
import Logo from '~/assets/logo.png';
import LoginBg from '~/assets/images/login-bg.png';
import { useState } from 'react';
import { LoginForm, MultiFactor, VerificationCode } from './components';

const Login = () => {
  const [step, setStep] = useState(1);

  const goToNextStep = () => setStep((prev) => (prev < 3 ? ((prev + 1) as typeof step) : prev));

  // const goToPreviousStep = () =>
  //   setStep((prev) => (prev > 1 ? ((prev - 1) as typeof step) : prev));

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="w-full lg:w-1/2 pl-11 flex flex-col justify-between pt-6 pb-6">
        <img src={Logo} alt="Logo" className="h-16 w-14 mb-6 ml-6" />

        <div className="max-w-[540px] w-full">
          {step === 1 && <LoginForm onNext={goToNextStep} />}
          {step === 2 && <MultiFactor onNext={goToNextStep} />}
          {step === 3 && <VerificationCode />}
        </div>

        <footer className="text-med text-black-200">
          © 2025 All Rights Reserved. Securities Commission of Papua New Guinea
        </footer>
      </div>

      {/* Right Panel */}
      <div
        style={{ backgroundImage: `url(${LoginBg})` }}
        className="hidden lg:block w-1/2 bg-no-repeat bg-cover bg-left-top text-white p-12 rounded-l-3xl relative my-3"
      >
        <div className="absolute inset-0 rounded-l-3xl bg-gradient-to-b from-[#671513]/90 to-[#AB0E10]/80 z-0" />

        <div className="relative z-10 h-full flex flex-col">
          <h2 className="text-[30px] font-medium">Centurion Licensing.</h2>
          <p className="text-[65px] font-medium leading-1.1">
            Empowering Capital <br></br> Formation with Fair <br /> and Secure
            <br />
            Markets
          </p>

          <div className="absolute bottom-4 right-4 text-sm">
            <p className="inline-block mr-2 text-[20px]">Having problems?</p>
            <Button className="w-46 rounded-[14px] text-[18px] cursor-pointer">Contact us</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

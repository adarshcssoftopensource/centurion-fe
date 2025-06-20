import React from 'react';
import { EmailIcon, MultiFactorIcon, SmsCodeIcon } from '~/assets/icons';
import Heading from '~/components/typography/heading';
import { Button } from '~/components/ui/button';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { cn } from '~/lib/utils';

const MultiFactor = ({ onNext }: { onNext: () => void }) => {
  const [value, setValue] = React.useState('email');
  const handleSubmit = () => {
    // Do login logic here
    onNext(); // Move to next step
  };
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 shadow-[0_0_0_14px_#efefef] mb-5 ml-4">
          <MultiFactorIcon />
        </div>

        <Heading variant="h2">Multi-Factor Authentication</Heading>
        <p className="text-[20px] text-gray">
          Please select your preferred Multi-Factor Authentication.
        </p>
      </div>
      <RadioGroup value={value} onValueChange={setValue} className="grid grid-cols-2 mb-6">
        <label
          htmlFor="email"
          className={`rounded-xl border p-3 cursor-pointer transition-all duration-200 flex flex-col gap-2
          ${value === 'email' ? 'border-yellow-600' : 'border-gray-200'}`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-gray-50 p-3 rounded-[12px]">
              <EmailIcon />
            </div>
            <RadioGroupItem
              value="email"
              id="email"
              className={cn(
                'ml-auto multi-radio h-5 w-5 [&_svg]:fill-white [&_svg]:stroke-0 [&_svg]:size-3 border-gray-200',
                value === 'email' && 'bg-orange-4  border-none',
              )}
            />
          </div>
          <div className="font-medium text-gray-900 text-[20px]">Email</div>
          <div className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur. Ut sapien id urna eget.
          </div>
        </label>

        <label
          htmlFor="sms"
          className={`rounded-xl border p-3 cursor-pointer transition-all duration-200 flex flex-col gap-2
          ${value === 'sms' ? 'border-yellow-600' : 'border-gray-200'}`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-gray-50 p-3 rounded-[12px]">
              <SmsCodeIcon />
            </div>
            <RadioGroupItem
              value="sms"
              id="sms"
              className={cn(
                'ml-auto multi-radio h-5 w-5 [&_svg]:fill-white [&_svg]:stroke-0 [&_svg]:size-3 border-gray-200',
                value === 'sms' && 'bg-orange-4  border-none',
              )}
            />
          </div>
          <div className="font-medium text-gray-900 text-[20px]">SMS</div>
          <div className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur. Nisi ac rhoncus gravida.
          </div>
        </label>
      </RadioGroup>

      <Button onClick={handleSubmit} className="w-full cursor-pointer">
        Confirm
      </Button>
    </div>
  );
};

export default MultiFactor;

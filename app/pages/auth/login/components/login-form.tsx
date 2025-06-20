import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import React, { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Heading from '~/components/typography/heading';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { UsersIconRound } from '~/assets/icons';

const formSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  password: z.string().min(3, {
    message: 'Password must be at least 6 characters.',
  }),
});
const LoginForm = ({ onNext }: { onNext: () => void }) => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    onNext();
  }

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 shadow-[0_0_0_14px_#efefef] mb-4 ml-4">
          <UsersIconRound />
        </div>

        <Heading variant="h2">Login to your account</Heading>
        <p className="text-[20px] text-gray">Secure sign-in to access your dashboard</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                    <Input placeholder="hello@aisocui.com" {...field} className="pl-8 h-12" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-0">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="•••••••••••"
                      {...field}
                      className="pl-8 pr-10 h-12"
                    />
                    <div
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="text-med text-right text-red my-6 cursor-pointer underline font-medium hover:no-underline ">
            Forgot password?
          </p>
          <Button type="submit" className="w-full cursor-pointer">
            Login
          </Button>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;

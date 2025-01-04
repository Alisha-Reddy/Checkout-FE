'use client'
import Image from "next/image";
import { createCheckoutSession,createPaymentWithConfiguration } from "@/services/StripePaymentService";
import { loadStripe } from "@stripe/stripe-js";

export default function Home() {
  const handleCheckout = async () => {
    const fee = 20;

    try {
      const checkoutUrl = await createCheckoutSession(fee, "monthly")
      if(checkoutUrl){
        window.location.href = checkoutUrl
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const handlePaymentWithConfiguration = async () => {
    const fee = 20;
    const paymentPeriod = "monthly"
    const paymentMethodId = process.env.NEXT_PUBLIC_PAYMENT_CONFIGURATION_METHOD; 

    try {
      const paymentUrl = await createPaymentWithConfiguration(fee, paymentPeriod, paymentMethodId!);
      if(paymentUrl){
        window.location.href = paymentUrl
      }
    } catch (error) {
      console.error("Error during payment intent:", error);
    }
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <button className="border border-green-200 p-2 " onClick={handleCheckout}>Checkout</button>
        <button className="border border-green-200 p-2 " onClick={handlePaymentWithConfiguration}>Payment Intent</button>
        
        </main>
    </div>
  );
}

export const createCheckoutSession = async (amount: number, paymentPeriod: string) => {
  try {
    const response = await fetch('https://checkout-be.onrender.com/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, paymentPeriod }),
    });
    const checkoutUrl = await response.text();
    return checkoutUrl; // This should return the Stripe checkout URL
  } catch (error) {
    console.error('Error creating Stripe Checkout session:', error);
    throw error;
  }
};

export const createPaymentWithConfiguration = async (amount: number, paymentPeriod: string, paymentMethodConfigurationId: string) => {
  try {
    const response = await fetch('https://checkout-be.onrender.com/stripe/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, paymentPeriod, paymentMethodConfigurationId }),
    });

    const intentData = await response.text();
    console.log("1",intentData)
    return intentData; // This should return the PaymentIntent data
  } catch (error) {
    console.error('Error creating Stripe Payment Intent:', error);
    throw error;
  }
};

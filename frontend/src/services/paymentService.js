export const createPixPayment = async (paymentData) => {
    const response = await fetch('/criar-pix', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });
  
    const data = await response.json();
    return data.qrCode;  // Retorna o QR code base64
  };
  
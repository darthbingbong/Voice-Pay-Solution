
// Simple encryption utilities for localStorage data
const ENCRYPTION_KEY = 'voicepay-secure-key';

export const encryptData = (data: string): string => {
  try {
    // Simple XOR encryption for localStorage (client-side only)
    let encrypted = '';
    for (let i = 0; i < data.length; i++) {
      encrypted += String.fromCharCode(data.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length));
    }
    return btoa(encrypted);
  } catch {
    return data; // Fallback to unencrypted if encryption fails
  }
};

export const decryptData = (encryptedData: string): string => {
  try {
    const data = atob(encryptedData);
    let decrypted = '';
    for (let i = 0; i < data.length; i++) {
      decrypted += String.fromCharCode(data.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length));
    }
    return decrypted;
  } catch {
    return encryptedData; // Fallback to original data if decryption fails
  }
};

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential XSS characters
    .trim()
    .substring(0, 1000); // Limit input length
};

export const clearSensitiveData = (): void => {
  localStorage.removeItem('voicepay-language');
  localStorage.removeItem('voicepay-consent');
  localStorage.removeItem('voicepay-preferences');
};

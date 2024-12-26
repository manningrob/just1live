import { useState } from 'react';
import { StepStatus } from '../types';
import { submitToMake } from '../services/makeService';
import { toast } from 'react-hot-toast';

export function useDesignForm() {
  const [step, setStep] = useState<StepStatus>('pending');
  const [designPrompt, setDesignPrompt] = useState('');
  const [shopifyUrl, setShopifyUrl] = useState<string>('');
  const [error, setError] = useState<string>();
  const [userInfo, setUserInfo] = useState<{ name: string; email: string } | null>(null);

  const handleDesignSubmit = (prompt: string) => {
    setDesignPrompt(prompt);
    setStep('processing');
    setError(undefined);
  };

  const handleUserInfoSubmit = async (name: string, email: string) => {
    setUserInfo({ name, email });
    try {
      const response = await submitToMake({
        designPrompt,
        name,
        email,
      });
      
      if (response.status === 'success' && response.shopifyUrl) {
        setShopifyUrl(response.shopifyUrl);
        setStep('product-ready');
        setError(undefined);
      } else {
        throw new Error(response.message || 'Failed to generate design');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      // Keep the processing step active to show error state
      setUserInfo(null);
    }
  };

  const handleRetry = () => {
    setStep('pending');
    setError(undefined);
  };

  return {
    step,
    error,
    shopifyUrl,
    handleDesignSubmit,
    handleUserInfoSubmit,
    handleRetry,
    userInfo
  };
}
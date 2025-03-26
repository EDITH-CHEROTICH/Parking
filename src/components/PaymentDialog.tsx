import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import { ParkingSpace } from '../types';

interface PaymentDialogProps {
  open: boolean;
  onClose: () => void;
  parkingSpace: ParkingSpace;
  onPaymentComplete: (space: ParkingSpace, response: any) => void;
}

export default function PaymentDialog({
  open,
  onClose,
  parkingSpace,
  onPaymentComplete,
}: PaymentDialogProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [duration, setDuration] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalAmount = parkingSpace.pricePerHour * duration;

  // Format phone number to the required format
  const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
      return '254' + cleaned.slice(1);
    }
    if (cleaned.startsWith('254')) {
      return cleaned;
    }
    if (cleaned.startsWith('7')) {
      return '254' + cleaned;
    }
    return cleaned;
  };

  const handlePayment = async () => {
    setError(null);
    
    // Basic validation
    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Please enter a valid phone number.');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Format the phone number for the API
      const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
      
      console.log('Sending payment request to backend:', {
        phoneNumber: formattedPhoneNumber, 
        amount: totalAmount
      });
      
      // Send the request to the Flask backend
      const response = await fetch('http://localhost:5000/initiate_payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: formattedPhoneNumber,
          amount: totalAmount
        }),
      });
      
      const data = await response.json();
      console.log('Payment response:', data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Payment failed. Please try again.');
      }
      
      // Create a response object with status 200 to indicate success
      const successResponse = { 
        status: 200, 
        message: 'Payment initiated successfully',
        data: data 
      };
      
      onPaymentComplete(parkingSpace, successResponse);
    } catch (error) {
      console.error('Payment error:', error);
      setError(error instanceof Error ? error.message : 'Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onClose={isProcessing ? undefined : onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Parking Payment</DialogTitle>
      <DialogContent>
        <Box sx={{ p: 1 }}>
          <Typography variant="h6" gutterBottom>
            Space Details:
          </Typography>
          <Typography>
            Space Number: {parkingSpace.spaceNumber}
          </Typography>
          <Typography>
            Price: KES {parkingSpace.pricePerHour}/hour
          </Typography>
          
          <Box sx={{ my: 3 }}>
            <TextField
              fullWidth
              label="Duration (hours)"
              type="number"
              value={duration}
              onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value)))}
              inputProps={{ min: 1, max: 24 }}
              disabled={isProcessing}
              sx={{ mb: 2 }}
            />
            
            <TextField
              fullWidth
              label="Phone Number (M-PESA)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="07XXXXXXXX"
              disabled={isProcessing}
              error={!!error}
              helperText={error}
              InputProps={{
                startAdornment: <InputAdornment position="start">+</InputAdornment>,
              }}
            />
          </Box>
          
          <Typography variant="h6" sx={{ mt: 2 }}>
            Total Amount: KES {totalAmount}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            You will receive an M-PESA prompt on your phone to complete the payment.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button 
          onClick={onClose} 
          disabled={isProcessing}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button 
          onClick={handlePayment} 
          variant="contained" 
          color="primary"
          disabled={isProcessing}
          startIcon={isProcessing ? <CircularProgress size={20} /> : null}
        >
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
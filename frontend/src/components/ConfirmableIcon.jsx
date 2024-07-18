import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from '@/components/ui/alert-dialog';

const ConfirmableIcon = ({ iconType, message, value, onConfirm }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleIconClick = (value) => {
    setSelectedValue(value);
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    onConfirm(selectedValue); // Your logic for confirmed action here
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const IconComponent = iconType === 'check' ? Check : X;

  return (
    <>
        {iconType === 'check' ? (
            <Check 
                size={24}
                className="cursor-pointer mx-2 text-green-500 hover:text-green-700"
                onClick={() => handleIconClick(value)} />
        ) : (
          <X 
            size={24}
            className=" mx-2 text-red-500 hover:text-red-700"
            onClick={() => handleIconClick(value)} 
          />
        )
        }
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmation</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            {message}
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ConfirmableIcon;

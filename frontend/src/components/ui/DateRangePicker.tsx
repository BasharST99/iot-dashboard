import { Box, TextField, TextFieldProps } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { useState } from 'react';

interface DateRangePickerProps {
  value: [Dayjs | null, Dayjs | null];
  onChange: (value: [Dayjs | null, Dayjs | null]) => void;
}

export const DateRangePicker = ({ value, onChange }: DateRangePickerProps) => {
  const [startDate, endDate] = value;

  const handleStartDateChange = (newValue: Dayjs | null) => {
    onChange([newValue, endDate]);
  };

  const handleEndDateChange = (newValue: Dayjs | null) => {
    onChange([startDate, newValue]);
  };

  return (
    <Box display="flex" gap={2}>
      <DatePicker
        label="Start Date"
        value={startDate}
        onChange={handleStartDateChange}
        slots={{ textField: TextField }}
        slotProps={{ textField: { size: "small" } }}
      />
      <DatePicker
        label="End Date"
        value={endDate}
        onChange={handleEndDateChange}
        slots={{ textField: TextField }}
        slotProps={{ textField: { size: "small" } }}
      />
    </Box>
  );
};
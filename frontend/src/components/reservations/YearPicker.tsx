import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

interface YearPickerProps {
  selectedYear: string | number;
  onChange: (year: string | number) => void;
}

const YearPicker: React.FC<YearPickerProps> = ({ selectedYear, onChange }) => {
  const years: number[] = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i >= 1900; i--) {
    years.push(i);
  }

  return (
    <TextField
      select
      label="Select Year"
      value={selectedYear}
      onChange={(e) => onChange(e.target.value)}
      InputLabelProps={{ shrink: true }}
      size="small"
      sx={{ minWidth: 120 }}
    >
      {years.map((year) => (
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default YearPicker;
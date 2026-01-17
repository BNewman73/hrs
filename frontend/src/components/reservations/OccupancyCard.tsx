import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Label,
} from "recharts";

const mockData = [
  { date: "2026-01-01", rooms: 80 },
  { date: "2026-01-02", rooms: 92 },
  { date: "2026-01-03", rooms: 88 },
  { date: "2026-01-04", rooms: 95 },
  { date: "2026-01-05", rooms: 90 },
  { date: "2026-01-06", rooms: 97 },
  { date: "2026-01-07", rooms: 93 },
];

export default function OccupancyCard() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleApply = () => {
    // later: trigger RTK query here
    console.log("Fetch occupancy from", startDate, "to", endDate);
  };

  return (
    <Card
      sx={{
        borderRadius: "20px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      <CardContent>
        {/* Header */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" color="text.secondary">
            Review trends in total bookings over selected date ranges.
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Controls */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            mb: 3,
          }}
        >
          <TextField
            type="date"
            label= "From"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            size="small"
          />

          <TextField
            type="date"
            label="Until"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            size="small"
          />

          <Button
            variant="contained"
            onClick={handleApply}
            sx={{
              px: 3,
              borderRadius: "12px",
              fontWeight: 700,
            }}
          >
            Apply
          </Button>
        </Box>

        {/* Chart */}
        <Box sx={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={8}/>
              <YAxis tick={{ fontSize: 14 }} tickMargin={8}>
                    <Label
                    value="Occupancy"
                    angle={-90}
                    position="insideLeft"
                    style={{ fontWeight: 500 }}
                    fontSize={14}
                    />
                </YAxis>
              <Tooltip />
              <Line
                type="monotone"
                dataKey="rooms"
                stroke="#1976d2"
                strokeWidth={3}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
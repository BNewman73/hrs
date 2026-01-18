import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
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
import { useGetOccupancyQuery } from "../../features/reservationApi";

export default function OccupancyCard() {

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data, isFetching } = useGetOccupancyQuery(
    {
      checkInDate: startDate,
      checkOutDate: endDate,
    },
    { skip: !startDate || !endDate }
  );

  const chartData = useMemo(() => {
    if (!data) return [];

    return Object.entries(data).map(([date, rooms]) => ({
      date,
      rooms,
    }));
  }, [data]);


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
            Review trends in daily occupancy over selected date range.
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Date Pickers */}
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
        </Box>

        {/* Chart */}
        <Box sx={{ height: 260 }}>
          {isFetching ? (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "text.secondary",
                fontWeight: 500,
              }}
            >
              Loading occupancy…
            </Box>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={8} />
                <YAxis tick={{ fontSize: 14 }} tickMargin={8} allowDecimals={false}>
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
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
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
import { useGetOccupancyQuery, useGetRevenueQuery } from "../../features/reservationApi";
import YearPicker from "./YearPicker";

export default function ReportCard() {

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedYear, setSelectedYear] = useState<string | number>('');

  const { data: occupancyResponse, isFetching: isFetchingOccupancy } = useGetOccupancyQuery(
    {
      checkInDate: startDate,
      checkOutDate: endDate,
    },
    { skip: !startDate || !endDate }
  );

  const occupancyData = useMemo(() => {
    if (!occupancyResponse) return [];

    return Object.entries(occupancyResponse).map(([date, rooms]) => ({
      date,
      rooms,
    }));
  }, [occupancyResponse]);

  const { data: revenueResponse, isFetching: isFetchingRevenue } = useGetRevenueQuery(
    {
      date: selectedYear.toString(),
    },
    { skip: !selectedYear }
  );

  const revenueData = useMemo(() => {
    if (!revenueResponse) return [];

    return Object.entries(revenueResponse).map(([date, revenue]) => ({
      date,
      revenue
    }));
  }, [revenueResponse]);
  const handleYearChange = (year: string | number) => {
    setSelectedYear(year);
    console.log("Selected year: ", year);
  };

  return (
    <Card
      sx={{
        borderRadius: "20px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      <CardContent>

        {/* Occupancy Report */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Occupancy Report
          </Typography>
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

        {/* Chart 1 */}
        <Box sx={{ height: 260 }}>
          {isFetchingOccupancy? (
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
              <LineChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={8} />
                <YAxis tick={{ fontSize: 14 }} tickMargin={8} allowDecimals={false}>
                  <Label
                    value="Occupancy"
                    angle={-90}
                    position="insideLeft"
                    style={{ fontWeight: 500 }}
                    fontSize={14}
                    dy={15}
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

    
        {/* Revenue Report */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Revenue Report
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Review cumulative (YTD) revenue for the selected calendar year.
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Date Picker */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            mb: 3,
          }}
        >
            <YearPicker selectedYear={selectedYear} onChange={handleYearChange} />

        </Box>

        {/* Chart 2 */}
        <Box sx={{ height: 260 }}>
          {isFetchingRevenue ? (
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
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" interval="preserveStartEnd" tick={{ fontSize: 12 }} tickMargin={8} />
                <YAxis tick={{ fontSize: 14 }} tickMargin={8} allowDecimals={false}>
                  <Label
                    value="Total Revenue (USD)"
                    angle={-90}
                    position="insideLeft"
                    style={{ fontWeight: 500 }}
                    fontSize={14}
                    dy={50}
                  />
                </YAxis>
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#1976d2"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Box>
        
        
      </CardContent>
    </Card>
  );
}
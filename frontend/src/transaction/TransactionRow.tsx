import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  ListItem,
  Typography,
  Chip,
  IconButton,
  Collapse,
  Divider,
} from "@mui/material";

function formatStatus(v?: string) {
  if (!v) return "—";
  return v
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/^./, (c) => c.toUpperCase());
}

function getStatusColor(status?: string) {
  switch (status) {
    case "succeeded":
      return "success";
    case "failed":
    case "canceled":
      return "error";
    case "processing":
      return "warning";
    default:
      return "default";
  }
}

interface TransactionRowProps {
  transaction: Transaction;
  isExpanded: boolean;
  onToggle: () => void;
}

export const TransactionRow = ({
  transaction,
  isExpanded,
  onToggle,
}: TransactionRowProps) => {
  return (
    <Box sx={{ borderBottom: "1px solid #f5f5f5" }}>
      {/* MAIN ROW */}
      <ListItem
        sx={{
          display: "flex",
          p: 2,
          alignItems: "center",
          gap: 1,
          bgcolor: isExpanded ? "rgba(25,118,210,0.03)" : "inherit",
        }}
      >
        {/* Payment ID */}
        <Typography sx={{ width: "35%", fontWeight: 700 }}>
          {transaction.paymentIntentId.slice(0, 10)}…
        </Typography>

        {/* Date */}
        <Typography sx={{ width: "25%", display: { xs: "none", sm: "block" } }}>
          {new Date(transaction.created).toLocaleDateString()}
        </Typography>

        {/* Amount */}
        <Typography sx={{ width: "20%", fontWeight: 700 }}>
          ${(transaction.amount / 100).toFixed(2)}
        </Typography>

        {/* Status */}
        <Box sx={{ width: "15%" }}>
          <Chip
            label={formatStatus(transaction.status)}
            color={getStatusColor(transaction.status)}
            size="small"
          />
        </Box>

        {/* EXPAND */}
        <Box sx={{ width: "5%", textAlign: "right" }}>
          <IconButton onClick={onToggle}>
            <ExpandMoreIcon
              sx={{
                transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "0.3s",
              }}
            />
          </IconButton>
        </Box>
      </ListItem>

      {/* EXPANDED DETAILS */}
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Box sx={{ p: 3, bgcolor: "#fafafa", borderTop: "1px solid #eee" }}>
          <Typography fontWeight={900} letterSpacing={1}>
            TRANSACTION DETAILS
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* PAYMENT INFO */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="overline" color="primary">
              Payment
            </Typography>
            <Typography>
              Payment Intent:
              <strong> {transaction.paymentIntentId}</strong>
            </Typography>
            <Typography>
              Amount:
              <strong> ${(transaction.amount / 100).toFixed(2)}</strong>
            </Typography>
            <Typography>
              Currency:
              <strong> {transaction.currency.toUpperCase()}</strong>
            </Typography>
            <Typography>
              Status:
              <strong> {formatStatus(transaction.status)}</strong>
            </Typography>
          </Box>

          {/* CUSTOMER */}
          {transaction.customerEmail && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="overline" color="primary">
                Customer
              </Typography>
              <Typography fontWeight={700}>
                {transaction.customerEmail}
              </Typography>
            </Box>
          )}

          {/* RESERVATION */}
          {transaction.reservation && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="overline" color="primary">
                Reservation
              </Typography>
              <Typography>
                Room:
                <strong> {transaction.reservation.roomId}</strong>
              </Typography>
              <Typography>
                Dates:
                <strong>
                  {" "}
                  {transaction.reservation.startDate} →{" "}
                  {transaction.reservation.endDate}
                </strong>
              </Typography>
            </Box>
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface RoomsState {
  items: Room[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: RoomsState = {
  items: [],
  status: "idle",
};

/**
 * Shared error helper: Since Spring GlobalExceptionHandler
 * returns (ResponseEntity<String>),
 * use res.text() to get message.
 */
async function getCleanErrorMessage(
  res: Response,
  fallback: string
): Promise<string> {
  try {
    const text = await res.text();
    return text || fallback;
  } catch {
    return fallback;
  }
}

// --- Thunks ---

export const fetchRooms = createAsyncThunk<
  Room[],
  void,
  { rejectValue: string }
>("rooms/fetchAll", async (_, { rejectWithValue }) => {
  const res = await fetch("http://localhost:8080/api/rooms", { 
    credentials: "include", 
  });
  if (!res.ok)
    return rejectWithValue(
      await getCleanErrorMessage(res, "Failed to fetch rooms")
    );
  return (await res.json()) as Room[];
});

export const createRoom = createAsyncThunk<
  Room,
  RoomDTO,
  { rejectValue: string }
>("rooms/post", async (room, { rejectWithValue }) => {
  const res = await fetch("http://localhost:8080/api/rooms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(room),
    credentials: "include",
  });

  if (!res.ok) {
    return rejectWithValue(
      await getCleanErrorMessage(res, "Failed to create room")
    );
  }
  return (await res.json()) as Room;
});

export const updateRoom = createAsyncThunk<
  Room,
  RoomDTO,
  { rejectValue: string }
>("rooms/put", async (room, { rejectWithValue }) => {
  const res = await fetch(`http://localhost:8080/api/rooms/${room.publicID}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(room),
    credentials: "include",
  });

  if (!res.ok)
    return rejectWithValue(
      await getCleanErrorMessage(res, "Failed to update room")
    );
  return (await res.json()) as Room;
});

export const deleteRoom = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("rooms/delete", async (roomID, { rejectWithValue }) => {
  const res = await fetch(`http://localhost:8080/api/rooms/${roomID}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok)
    return rejectWithValue(
      await getCleanErrorMessage(res, `Failed to delete room ${roomID}`)
    );
  return roomID; // Return the ID so the reducer can filter it out
});

// --- Slice ---

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchRooms
      .addCase(fetchRooms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchRooms.rejected, (state) => {
        state.status = "failed";
      })

      // createRoom
      .addCase(createRoom.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // deleteRoom
      .addCase(deleteRoom.fulfilled, (state, action) => {
        // Matches the string returned in the deleteRoom thunk
        state.items = state.items.filter((r) => r.publicID !== action.payload);
      })

      // updateRoom
      .addCase(updateRoom.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (u) => u.publicID === action.payload.publicID
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default roomsSlice.reducer;

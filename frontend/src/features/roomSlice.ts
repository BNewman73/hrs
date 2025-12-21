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

// Shared error helper
async function parseErrorMessage(
  res: Response,
  fallback: string
): Promise<string> {
  try {
    const data = await res.json();
    return data?.message || fallback;
  } catch {
    return fallback;
  }
}
//Thunks
export const fetchRooms = createAsyncThunk<
  Room[],
  void,
  { rejectValue: string }
>("rooms/fetchAll", async (_, { rejectWithValue }) => {
  const res = await fetch("http://localhost:8080/api/rooms");

  if (!res.ok) {
    const message = await parseErrorMessage(res, "Failed to fetch rooms");
    return rejectWithValue(message);
  }

  return (await res.json()) as Room[];
});

export const createRoom = createAsyncThunk<
  Room,
  RoomPostDTO,
  { rejectValue: string }
>("rooms/post", async (room, { rejectWithValue }) => {
  const res = await fetch("http://localhost:8080/api/rooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(room),
  });

  if (!res.ok) {
    const message = await parseErrorMessage(res, "Failed to create room");
    return rejectWithValue(message);
  }

  return (await res.json()) as Room;
});

export const deleteRoom = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("rooms/delete", async (roomNumber, { rejectWithValue }) => {
  const res = await fetch(
    `http://localhost:8080/api/rooms/${roomNumber}`,
    { method: "DELETE" }
  );

  if (!res.ok) {
    const message = await parseErrorMessage(
      res,
      `Failed to delete room ${roomNumber}`
    );
    return rejectWithValue(message);
  }

  return roomNumber;
});

// Slice

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
      .addCase(
        fetchRooms.fulfilled,
        (state, action: PayloadAction<Room[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
        }
      )
      .addCase(fetchRooms.rejected, (state) => {
        state.status = "failed";
      })

      // createRoom
      .addCase(createRoom.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // deleteRoom
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (r) => r.roomNumber !== action.payload
        );
      });
  },
});

export default roomsSlice.reducer;

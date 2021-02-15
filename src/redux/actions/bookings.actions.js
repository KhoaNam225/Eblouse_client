import * as types from "../constants/bookings.constants";
import api from "../../apiService";
import { toast } from "react-toastify";

const getBookingsList = (userId) => async (dispatch) => {
  dispatch({ type: types.GET_BOOKINGS_LIST_REQUEST, payload: null });
  try {
    const res = await api.get(`/bookings/${userId}`);
    const bookingsList = res.data.data;

    await new Promise((resolve, reject) => {
      setTimeout(resolve, 500);
    });

    dispatch({ type: types.GET_BOOKINGS_LIST_SUCCESS, payload: bookingsList });
  } catch (error) {
    dispatch({ type: types.GET_BOOKINGS_LIST_FAILURE, payload: null });
  }
};

const acceptBookingRequest = (userId, bookingId) => async (dispatch) => {
  dispatch({ type: types.ACCEPT_BOOKING_REQUEST, payload: null });
  try {
    await api.put(`/bookings/${bookingId}`);
    const res = await api.get(`/bookings/${userId}`);
    const bookingsList = res.data.data;

    dispatch({ type: types.ACCEPT_BOOKING_SUCCESS, payload: bookingsList });
    toast.success("Appoinment accepted!");
  } catch (error) {
    dispatch({ type: types.ACCEPT_BOOKING_FAILURE, payload: null });
    toast.error("Failed to accept appointment...");
  }
};

const cancelBookingRequest = (userId, bookingId) => async (dispatch) => {
  dispatch({ type: types.CANCEL_BOOKING_REQUEST, payload: null });
  try {
    await api.post(`/bookings/manage/${bookingId}`);
    const res = await api.get(`/bookings/${userId}`);
    const bookingsList = res.data.data;

    dispatch({ type: types.CANCEL_BOOKING_SUCCESS, payload: bookingsList });
    toast.success("Appoinment cancelled!");
  } catch (error) {
    dispatch({ type: types.CANCEL_BOOKING_FAILURE, payload: null });
    toast.error("Failed to cancel appointment...");
  }
};

const createBookingRequest = (bookingInfo, accessToken) => async (dispatch) => {
  const { clinicId, doctor, startTime, endTime, reason } = bookingInfo;
  dispatch({ type: types.CREATE_BOOKING_REQUEST, payload: null });
  if (accessToken) {
    const bearerToken = "Bearer " + accessToken;
    api.defaults.headers.common["authorization"] = bearerToken;
  }
  try {
    await api.post(`/bookings/${clinicId}`, {
      doctor,
      startTime,
      endTime,
      reason,
    });
    const res = await api.get(`/bookings/${clinicId}`);
    const bookings = res.data.data;
    dispatch({ type: types.CREATE_BOOKING_SUCCESS, payload: bookings });
    toast.success("Appointment created for you!");
  } catch (error) {
    dispatch({ type: types.CREATE_BOOKING_FAILURE, payload: null });
    toast.error("Failed to create appointment");
  }
};

const bookingsActions = {
  getBookingsList,
  acceptBookingRequest,
  cancelBookingRequest,
  createBookingRequest,
};

export default bookingsActions;

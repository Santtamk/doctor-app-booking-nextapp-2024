import { CalendarIcon, Clock, MapPin } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import React from "react";
import CancelAppointment from "./CancelAppointment";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from "sonner";

const BookingList = ({ bookingLists, expired, updatedRecord }) => {
  const onDeleteBooking = (item) => {
    GlobalApi.deleteBooking(item.id)
      .then((resp) => {
        if (resp) {
          toast("Appointment booking cancelled!");
          updatedRecord(); // Call the function to refresh records
        } else {
          toast("Unexpected response, please try again.");
        }
      })
      .catch((err) => {
        // Log detailed error information
        toast("Failed to cancel appointment. Please try again.");
      });
  };


  return (
    <div>
      {bookingLists &&
        bookingLists.map((item, index) => (
          <div
            key={index}
            className="flex gap-2 items-center border p-5 m-3 rounded-lg"
          >
            <Image
              src={
                item.attributes.doctor.data.attributes.Image?.data?.[0]
                  ?.attributes?.url
              }
              className="rounded-full object-cover h-[70px] w-[70px]"
              width={100}
              height={100}
              alt="doctor-image"
            />
            <div className="flex flex-col gap-2 w-full">
              <h2 className="font-bold text-[18px] items-center flex justify-between">
                {item.attributes.doctor.data.attributes.Name}
                {!expired && (
                  <CancelAppointment
                    onContinueClick={() => onDeleteBooking(item)}
                  />
                )}
              </h2>
              <h2 className="flex gap-2 text-gray-500 items-center">
                <MapPin className="text-primary h-5 w-5" />
                {item.attributes.doctor.data.attributes.Address}
              </h2>
              <h2 className="flex gap-2 items-center">
                <CalendarIcon className="text-primary h-5 w-5" /> Appointment
                on: {moment(item.attributes.Date).format("MMMM Do YYYY")}
              </h2>
              <h2 className="flex gap-2 items-center">
                <Clock className="text-primary h-5 w-5" /> At:{" "}
                {item.attributes.Time}
              </h2>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BookingList;

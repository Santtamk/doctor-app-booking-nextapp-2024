"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock } from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Textarea } from "@/components/ui/textarea";

const BookAppointment = ({ doctor }) => {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [note, setNote] = useState();
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ":00AM",
      });
      timeList.push({
        time: i + ":30AM",
      });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ":00PM",
      });
      timeList.push({
        time: i + ":30PM",
      });
    }

    setTimeSlot(timeList);
  };

  const saveBooking = () => {
    const data = {
      data: {
        UserName: (user?.given_name || "") + " " + (user?.family_name || ""),
        Email: user.email,
        Date: date,
        Time: selectedTimeSlot,
        doctor: doctor.id,
        Note: note,
      },
    };

    GlobalApi.bookAppointment(data).then((resp) => {
      console.log(resp);
      if (resp) {
        GlobalApi.sendEmail(data).then((resp) => {
          console.log(resp);
        });
        toast("Booking conformation sent to your Email.");
      }
    });
  };

  const isPastDAy = (day) => {
    return day < new Date();
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mt-3 rounded-full bg-primary">
          Book Appointment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Book Appointment</DialogTitle>
          <DialogDescription>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
                {/* Calendar */}
                <div className="flex flex-col gap-3 items-baseline">
                  <h2 className="flex gap-2 items-center">
                    <CalendarDays className="text-primary h-5 w-5" />
                    Select Date
                  </h2>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    disabled={isPastDAy}
                  />
                </div>
                {/* Time Slot */}
                <div className="mt-3 md:mt-0">
                  <h2 className="flex gap-2 items-center pb-3">
                    <Clock className="text-primary h-5 w-5" />
                    Select Time Slot
                  </h2>
                  <div className="grid grid-cols-3 gap-2 border rounded-lg p-5">
                    {timeSlot?.map((item, index) => (
                      <h2
                        onClick={() => setSelectedTimeSlot(item.time)}
                        key={index}
                        className={`p-2 border text-center hover:bg-primary hover:text-white cursor-pointer rounded-full ${
                          item.time == selectedTimeSlot &&
                          "bg-primary text-white"
                        }`}
                      >
                        {item.time}
                      </h2>
                    ))}
                  </div>
                </div>
              </div>
              <Textarea
                className="mt-3"
                placeholder="Something you would like to add.."
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="text-red-500 border-red-500"
            >
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="bg-primary"
              disabled={!(date && selectedTimeSlot)}
              onClick={() => saveBooking()}
            >
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointment;

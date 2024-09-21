import Image from "next/image";
import React from "react";

const BookingList = ({ bookingList }) => {
  return (
    <div>
      {bookingList &&
        bookingList.map((item, index) => (
          <div key={index}>
            <Image
              src={item.attributes.doctor.data?.[0]?.attributes.url}
              className=""
              width={100}
              height={100}
              alt="doctor-image"
            />
          </div>
        ))}
    </div>
  );
};

export default BookingList;

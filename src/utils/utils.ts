// src/utils/utils.ts

import { Class, SerializableClass } from '../types/types'; // Adjust the import path as necessary

export const convertClassDatesToStrings = (classItem: Class): SerializableClass => {
  return {
    ...classItem,
    startTime: classItem.startTime.toISOString(),
    endTime: classItem.endTime.toISOString(),
    bookingDeadline: classItem.bookingDeadline.toISOString(),
    checkInStart: classItem.checkInStart.toISOString(),
    checkInEnd: classItem.checkInEnd.toISOString(),
    cancellationDeadline: classItem.cancellationDeadline.toISOString(),
  };
};

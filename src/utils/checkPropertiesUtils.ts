function isValidBooking(obj: any) {
  if (Object.keys(obj).length > 11) return false;
  if (
    !obj.id ||
    !obj.guest ||
    !obj.orderDate ||
    !obj.roomType ||
    !obj.status ||
    !obj.checkIn ||
    !obj.checkOut ||
    !obj.roomId ||
    !obj.roomNumber ||
    !obj.roomImg
  )
    return false;
  if (!("specialRequest" in obj)) return false;
  return true;
}

function isValidRoom(obj: any) {
  if (Object.keys(obj).length > 11) return false;
  if (
    typeof obj.photos !== "object" ||
    obj.photos.length < 3 ||
    !obj.roomType ||
    !obj.description ||
    !obj.roomNumber ||
    !obj.id ||
    !obj.price ||
    !obj.status ||
    typeof obj.amenities !== "object" ||
    obj.amenities.length < 3
  )
    return false;
  if (!("offer" in obj) || !("discount" in obj) || !("cancellation" in obj))
    return false;
  return true;
}

function isValidUser(obj: any) {
  if (Object.keys(obj).length > 10) return false;
  if (
    !obj.photo ||
    !obj.fullName ||
    !obj.id ||
    !obj.email ||
    !obj.startDate ||
    !obj.description ||
    !obj.contact ||
    !obj.status ||
    !obj.role ||
    !obj.password
  )
    return false;
  return true;
}

function isValidContact(obj: any) {
  if (Object.keys(obj).length > 9) return false;
  if (
    !obj.id ||
    !obj.fullName ||
    !obj.email ||
    !obj.phone ||
    !obj.subject ||
    !obj.message ||
    !obj.date
  )
    return false;
  if (!("read" in obj) || typeof obj.read !== "boolean") return false;
  if (!("archived" in obj) || typeof obj.archived !== "boolean") return false;
  return true;
}

export default {
  isValidBooking,
  isValidRoom,
  isValidUser,
  isValidContact,
} as const;

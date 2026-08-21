export const ERROR_MESSAGE = {
  SOMETHING_WENT_WRONG: "Something went wrong",
};

export const SUCCESS_MESSAGE = {
  PASSWORD_UPDATED: "Password Updated Successfully",
  BID_PLACE: "Bid place successfully",
  CREATED_AUCTION: "Auction created successfully",
  UPDATED_AUCTION: "Auction updated successfully",
  DELETED_AUCTION: "Auction deleted successfully",
  USER_CREATED: "User created successfully",
  USER_UPDATED: "User updated successfully",
  DELETE_USER: "User deleted successfully"
};

export const CONSTANT_NAME = {
  PLACE_YOUR_BID: "Place your bid",
  AUCTION_PHOTO_MAX_SIZE: 25 * 1024 * 1024, //25MB,
  AUCTION_PHOTO_VALIDATION: ["image/jpeg", "image/jpg", "image/png"],
  PROFILE_PHOTO_MAX_SIZE: 25 * 1024 * 1024, //25MB,
  PROFILE_PHOTO_VALIDATION: ["image/jpeg", "image/jpg", "image/png"],
  AUCTION_STATUS_LIST: [
    {
      value: "pending",
      label: "Pending",
    },
    {
      value: "active",
      label: "Active",
    },
    {
      value: "completed",
      label: "Completed",
    },
    {
      value: "rejected",
      label: "Rejected",
    },
  ],
  BID_STATUS_LIST: [
    {
      value: "pending",
      label: "Pending",
    },
    {
      value: "accepted",
      label: "Accepted",
    },
    {
      value: "rejected",
      label: "Rejected",
    },
  ],
  USER_STATUS_LIST: [
    {
      value: 1,
      label: "Active",
    },
    {
      value: 0,
      label: "De Active",
    },
  ],
  USER_ROLE_LIST: [
    {
      value: 2,
      label: "Admin",
    },
    {
      value: 3,
      label: "User",
    },
  ],
};

export const USER_ROLE = {
  SUPER_ADMIN: 1,
  ADMIN: 2,
  USER: 3,
};

export const PAGINATION_CONSTANT = {
  PAGE_ONE: 1,
  PER_PAGE_LIMIT: 10,
};

export const USER_ROLE_LABEL = {
  1: "Super Admin",
  2: "Admin",
  3: "User",
};

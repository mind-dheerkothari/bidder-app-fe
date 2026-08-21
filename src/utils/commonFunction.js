import moment from "moment";
import { GET } from "../services/axiosRequestHandler";
import { API_END_POINT } from "./apiEndPoints";
import axios from "axios";

export const truncateText = (text = "", maxLength = 0) => {
  if (typeof text !== "string") return text;
  return text?.length > maxLength ? text?.slice(0, maxLength) + "..." : text;
};

export const getTimeLeft = (endDate) => {
  if (!endDate) {
    return "Invalid Date";
  }

  const end = moment(endDate);
  if (!end.isValid()) {
    return "Invalid Date";
  }

  const now = moment();
  if (now.isAfter(end)) {
    return "Time is up";
  }

  const duration = moment.duration(end.diff(now));
  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  return `${days}d ${hours}h`;
};

export const formatDate = (date, format) => {
  return moment(date).format(format);
};

export const capitalizeFirstChar = (str) => {
  if (typeof str !== "string" || !str.trim()) {
    return str;
  }
  return str?.charAt(0)?.toUpperCase() + str?.slice(1);
};

// Convert array of objects to react-select options
export const mapToSelectOptions = (data, labelKey, valueKey) => {
  if (!Array.isArray(data) || !labelKey || !valueKey) {
    return data;
  }
  return data?.map((item) => ({
    label: item[labelKey],
    value: item[valueKey],
  }));
};

export const formatToISO = (dateObj) => dateObj?.toDate()?.toISOString();

export const uploadFileViaPresignedUrl = async (
  file,
  bucketName = "bidderapptest"
) => {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

    // Generate unique file name using timestamp + random string
    const timestamp = Date.now();
    const extension = file.name.split(".").pop();
    const uniqueFileName = `upload/${timestamp}-${Math.random()
      .toString(36)
      .substring(2)}.${extension}`;
    const params = `?fileName=${encodeURIComponent(
      uniqueFileName
    )}&contentType=${encodeURIComponent(file.type)}&bucketName=${bucketName}`;

    //  Api calling for getting presigned url
    const { response, status } = await GET(
      API_END_POINT.GET_PRESIGNED_URL,
      params
    );
    if (status === 200) {
      const { signedUrl, fileName, finalURL } = response?.data?.data;

      // Api calling for the signedUrl
      const uploadResponse = await axios.put(signedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      if (uploadResponse.status !== 200) {
        throw new Error("Failed to upload file");
      }
      return { finalURL, fileName };
    } else {
      throw new Error("Failed to get presigned url");
    }
  } catch (error) {
    throw new Error(error.message || "File upload failed");
  }
};

export const htmlToText = (html) => {
  const temp = document.createElement("div");
  temp.innerHTML = html || "";
  return temp.textContent || temp.innerText || "";
};

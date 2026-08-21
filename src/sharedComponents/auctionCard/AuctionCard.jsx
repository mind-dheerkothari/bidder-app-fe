import React from "react";
import { Card, CardBody, CardTitle, CardText, Badge } from "reactstrap";
import {
  formatDate,
  getTimeLeft,
  truncateText,
} from "../../utils/commonFunction";
import { useNavigate } from "react-router-dom";
import { routeConstants } from "../../utils/routeConstant";

export default function AuctionCard({ data }) {
  const navigate = useNavigate();

  const handleRedirection = () => {
    navigate(`${routeConstants.AUCTION_DETAIL}/${data?.id}`);
  };
  return (
    <Card
      className="!border-none !rounded-[5px] overflow-hidden transition-transform duration-300 !bg-white text-primary cursor-pointer flex flex-col min-w-[250px] max-md:min-w-full h-full p-1"
      onClick={handleRedirection}
    >
      <div className="relative w-full h-auto overflow-hidden">
        <img
          src="https://media.istockphoto.com/id/1317323736/photo/a-view-up-into-the-trees-direction-sky.jpg?s=612x612&w=0&k=20&c=i4HYO7xhao7CkGy7Zc_8XSNX_iqG0vAwNsrH1ERmw2Q="
          alt=""
          className="w-full h-full object-cover rounded-[10px]"
        />
        <Badge
          className="absolute top-[10px] right-[10px] !bg-brand-start !text-white text-[0.8rem] py-[5px] px-[10px] !rounded-[5px] font-bold"
          color="red"
        >
          {data?.category?.name}
        </Badge>
      </div>
      <CardBody className="flex-1 flex flex-col justify-between !p-[15px]">
        <CardTitle
          tag="h5"
          className="text-[1.2rem] font-bold mb-[5px] leading-[23.44px] text-primary"
        >
          {truncateText(data?.item_name, 50)}
        </CardTitle>
        <CardText tag="div" className="d-flex justify-content-between mt-2">
          <div className="d-flex justify-content-center align-items-center">
            <p className="text-2xl font-bold leading-[28.13px] text-[#9f3247] m-0">
              Rs. {data?.base_price}
            </p>
            {/* <p className="bids m-0 mx-2">(2 bids)</p> */}
          </div>
          <span className="text-sm font-normal leading-[16.41px] text-[#605d5e] mt-[5px]">
            ({data?.creator?.first_name} {data?.creator?.last_name})
          </span>
        </CardText>
        <CardText
          tag="div"
          className="text-sm text-[#212427] flex justify-start gap-[10px] items-center mt-auto"
        >
          Time left {getTimeLeft(data?.end_date)}{" "}
          <p className="m-0">({formatDate(data?.end_date, "h:mm A")})</p>
        </CardText>
      </CardBody>
    </Card>
  );
}

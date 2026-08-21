import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PAGINATION_CONSTANT } from "../../../utils/propertyResolver";
import CustomTable from "../../../sharedComponents/customTable/CustomTable";
import {
  capitalizeFirstChar,
  formatDate,
  htmlToText,
  truncateText,
} from "../../../utils/commonFunction";
import Loader from "../../../sharedComponents/loader/Loader";
import NoRecord from "../../../sharedComponents/noRecord/NoRecord";
import { getMyBidList } from "../../../redux/slices/bidSlice";
import MyBidFilter from "./MyBidFilter";
import CustomBadge from "../../../sharedComponents/customBadge/CustomBadge";

export default function MyBidList() {
  const [page, setPage] = useState(PAGINATION_CONSTANT.PAGE_ONE);
  const [perPageLimit, setPerPageLimit] = useState(
    PAGINATION_CONSTANT.PER_PAGE_LIMIT
  );
  const [filterState, setFilterState] = useState({
    status: [],
    sortBy: null,
  });

  const dispatch = useDispatch();
  const { myBidList, isLoading } = useSelector((state) => state.bid);

  useEffect(() => {
    fetchMyBidList();
  }, [page, perPageLimit, filterState]);

  //Column configuration
  const columns = [
    {
      text: "Item Name",
      dataField: "item_name",
      formatter: (cell) => truncateText(cell, 20),
    },
    {
      text: "Description",
      dataField: "description",
      formatter: (cell) => {
        const text = htmlToText(cell);
        return truncateText(text, 30);
      },
    },
    {
      text: "Status",
      dataField:"bids[0].bid_status",
      formatter: (cell)=>{
        return  <CustomBadge
          title={cell}
          colorCode={cell === "accepted" ? "green" : "red"}
        />
      }
    },
    {
      text: "Auction Base Price",
      dataField: "base_price",
      sort: false,
    },
  
    {
      text: "Auction Start Date",
      dataField: "start_date",
      formatter: (cell) => formatDate(cell, "DD/MM/YYYY hh:mm A"),
    },
    {
      text: "Auction End Date",
      dataField: "end_date",
      formatter: (cell) => formatDate(cell, "DD/MM/YYYY hh:mm A"),
    },
    {
      text: "Bid Price",
      dataField: "bids", // just a placeholder, actual value from formatter
      sort: false,
      formatter: (cell, row) => row.bids?.[0]?.bid_amount ?? "N/A",
    },
    {
      text: "Auction Owner Name",
      dataField: "creator.first_name",
      formatter: (cell) => capitalizeFirstChar(cell),
    },
    // {
    //   text: "Auction Owner Email",
    //   dataField: "creator.email",
    // },
    {
      text: "Created At",
      dataField: "created_at",
      formatter: (cell) => formatDate(cell, "DD/MM/YYYY hh:mm A"),
      sort: true,
    },
  ];

  const onTableChange = (type, { page, sizePerPage, sortField, sortOrder }) => {
    if (type === "sort") {
      setPage(PAGINATION_CONSTANT.PAGE_ONE);
      if (sortField === "created_at") {
        setFilterState({ ...filterState, sortBy: sortOrder });
      }
      return;
    }
    //  If the per page limit changes, reset the page 1
    if (sizePerPage !== perPageLimit) {
      setPage(PAGINATION_CONSTANT.PAGE_ONE);
    } else {
      setPage(page);
    }

    setPerPageLimit(sizePerPage);
  };

  const fetchMyBidList = async () => {
    const payload = {
      page: page,
      limit: perPageLimit,
      sortBy: filterState?.sortBy,
      status: filterState?.status?.map((item) => item?.value),
    };
    dispatch(getMyBidList(payload));
  };

  const handleApply = (selectedOption, type) => {
    setPage(PAGINATION_CONSTANT.PAGE_ONE);

    if (type === "status") {
      setFilterState({ ...filterState, status: selectedOption });
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <div className="content-card">
        <MyBidFilter filterState={filterState} handleApply={handleApply} />
        {myBidList?.data?.length > 0 && (
          <CustomTable
            columnData={columns}
            dataTable={myBidList?.data || []}
            page={page}
            size={perPageLimit}
            totalRecords={myBidList?.totalRecord || 0}
            showPagination={true}
            sizePerPageDropdown={true}
            cellEdit={false}
            onTableChange={onTableChange}
            sort={true}
          />
        )}

        {myBidList?.data?.length === 0 && !isLoading && (
          <div style={{ height: "500px" }}>
            <NoRecord />
          </div>
        )}
      </div>
    </div>
  );
}

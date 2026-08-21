import React, { useEffect, useState } from "react";
import { PAGINATION_CONSTANT } from "../../utils/propertyResolver";
import {
  capitalizeFirstChar,
  formatDate,
  truncateText,
} from "../../utils/commonFunction";
import CustomTable from "../../sharedComponents/customTable/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminAuctionList,
  updateAuctionStatus,
} from "../../redux/slices/admin/adminAuctionSlice";
import Loader from "../../sharedComponents/loader/Loader";
import {
  deleteAuction,
  getAuctionCategoryLIst,
} from "../../redux/slices/auctionSlice";
import MyAuctionFilter from "../../views/userProfile/components/MyAuctionFilter";
import { routeConstants } from "../../utils/routeConstant";
import ConfirmModal from "../../sharedComponents/confirmModal/ConfirmModal";
import UpdateStatus from "./components/UpdateStatus";
import moment from "moment";

export default function AuctionManagement() {
  const [page, setPage] = useState(PAGINATION_CONSTANT.PAGE_ONE);
  const [perPageLimit, setPerPageLimit] = useState(
    PAGINATION_CONSTANT.PER_PAGE_LIMIT
  );
  const [filterState, setFilterState] = useState({
    categories: [],
    status: [],
    dateRange: [],
    sortBy: null,
    search: "",
  });
  const [isConfirmationShow, setIsConfirmationShow] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState("");
  const [isStatusShow, setIsStatusShow] = useState(false);
  const dispatch = useDispatch();
  const { auctionList, isLoading } = useSelector((state) => state.adminAuction);
  const { auctionCategoryList } = useSelector((state) => state.auction);

  useEffect(() => {
    dispatch(getAuctionCategoryLIst());
  }, []);

  useEffect(() => {
    fetchAdminAuction();
  }, [page, perPageLimit, filterState]);

  const columns = [
    {
      text: "Item Name",
      dataField: "item_name",
      formatter: (cell) => truncateText(cell, 20),
    },

    {
      text: "Base Price",
      dataField: "base_price",
      sort: false,
    },
    {
      text: "Start Date",
      dataField: "start_date",
      formatter: (cell) => formatDate(cell, "DD/MM/YYYY hh:mm A"),
    },
    {
      text: "End Date",
      dataField: "end_date",
      formatter: (cell) => formatDate(cell, "DD/MM/YYYY hh:mm A"),
    },
    {
      text: "Auction Status",
      dataField: "status",
      formatter: (cell) => capitalizeFirstChar(cell),
    },
    {
      text: "Category",
      dataField: "category.name",
      formatter: (cell) => capitalizeFirstChar(cell),
    },
    {
      text: "Owner Name",
      dataField: "creator.first_name",
      formatter: (cell) => capitalizeFirstChar(cell),
    },
    {
      text: "Owner Email",
      dataField: "creator.email",
    },
    {
      text: "Bid Count",
      dataField: "totalBids",
      formatter: (cell) => capitalizeFirstChar(cell),
    },
    {
      text: "Created At",
      dataField: "created_at",
      formatter: (cell) => formatDate(cell, "DD/MM/YYYY hh:mm A"),
      sort: true,
    },
    {
      text: "Action",
      dataField: "action",
      isDummyField: true,
      align: "center",
      headerAlign: "center",
      formatter: (_, row) => {
        const isExpired = moment(row?.end_date).isBefore(moment());
        return (
          <div className="d-flex justify-content-between gap-2">
            <p
              className="action-link"
              onClick={() => {
                window.open(`${routeConstants.AUCTION_DETAIL}/${row?.id}`);
              }}
            >
              View
            </p>
            <p
              className={`action-link ${isExpired ? "disable" : ""}`}
              onClick={() => {
                if (!isExpired) {
                  setIsStatusShow(true);
                  setSelectedAuction(row);
                }
              }}
            >
              Change Status
            </p>
            <p
              className="action-link"
              onClick={() => {
                setIsConfirmationShow(true);
                setSelectedAuction(row);
              }}
            >
              Delete
            </p>
          </div>
        );
      },
    },
  ];

  const fetchAdminAuction = async () => {
    const payload = {
      page: page,
      limit: perPageLimit,
      sortBy: filterState?.sortBy,
      status: filterState?.status?.map((item) => item?.value),
      categoryId: filterState?.categories?.map((item) => item?.value),
      startDate: filterState?.dateRange?.[0],
      endDate: filterState?.dateRange?.[1],
      search: filterState?.search,
    };
    dispatch(getAdminAuctionList(payload));
  };

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

  const handleApply = (selectedOption, type) => {
    setPage(PAGINATION_CONSTANT.PAGE_ONE);
    setFilterState({ ...filterState, [type]: selectedOption });
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteAuction(selectedAuction?.id)).unwrap();

      //Calculate the new records after delete
      const remainingRecords = auctionList?.totalRecord - 1;

      //Total page
      const totalPages = Math.ceil(remainingRecords / perPageLimit);

      if (page > totalPages) {
        setPage((prev) => Math.max(prev - 1, 1));
      } else {
        await fetchAdminAuction();
      }
      setIsConfirmationShow(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdateStatus = async (payload) => {
    try {
      await dispatch(updateAuctionStatus(payload)).unwrap();
      fetchAdminAuction();
      setIsStatusShow(false);
    } catch (error) {
      console.log("Error while update auction status", error);
    }
  };
  return (
    <div className="auction-management-wrapper light-grey-bg h-100 p-3">
      {isLoading && <Loader />}
      <div className="table-card-wrapper">
        <MyAuctionFilter
          filterState={filterState}
          handleApply={handleApply}
          auctionCategoryList={auctionCategoryList}
        />
        <CustomTable
          columnData={columns}
          dataTable={auctionList?.data || []}
          page={page}
          size={perPageLimit}
          totalRecords={auctionList?.totalRecord || 0}
          showPagination={true}
          sizePerPageDropdown={true}
          cellEdit={false}
          onTableChange={onTableChange}
          sort={true}
        />
      </div>
      {isConfirmationShow && (
        <ConfirmModal
          isOpen={isConfirmationShow}
          toggle={() => {
            setIsConfirmationShow(!isConfirmationShow);
          }}
          title="Confirm Action"
          message={`Are you sure you want to delete "${selectedAuction?.item_name}" record?`}
          isWarningIconShow={true}
          confirmText="Yes, Confirm"
          cancelText="Cancel"
          onConfirm={handleDelete}
        />
      )}
      {isStatusShow && (
        <UpdateStatus
          isOpen={isStatusShow}
          toggle={() => setIsStatusShow(!isStatusShow)}
          handleUpdate={handleUpdateStatus}
          auctionDetail={selectedAuction}
        />
      )}
    </div>
  );
}

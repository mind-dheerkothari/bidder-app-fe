import React, { useEffect, useState } from "react";
import "./auctionList.scss";
import InfiniteScroller from "../../sharedComponents/infintiScroller/InfiniteScroller";
import { Col, Row } from "reactstrap";
import AuctionCard from "../../sharedComponents/auctionCard/AuctionCard";
import CustomBreadCrumb from "../../sharedComponents/customBreadCrumb/CustomBreadCrumb";
import { routeConstants } from "../../utils/routeConstant";
import AuctionListFilter from "./components/AuctionListFilter";
import { useDispatch, useSelector } from "react-redux";
import { getAuctionList } from "../../redux/slices/auctionSlice";
import { PAGINATION_CONSTANT } from "../../utils/propertyResolver";
import Loader from "../../sharedComponents/loader/Loader";
import NoRecord from "../../sharedComponents/noRecord/NoRecord";

export default function AuctionList() {
  const [page, setPage] = useState(PAGINATION_CONSTANT.PAGE_ONE);
  const [perPageLimit, setPerPageLimit] = useState(
    PAGINATION_CONSTANT.PER_PAGE_LIMIT
  );
  const [filterState, setFilterState] = useState({
    sortBy: "asc",
    selectedCategory: "",
    rangeValue: [0, 0],
  });
  const { auctionListInfo, isLoading } = useSelector((state) => state.auction);
  const dispatch = useDispatch();

  useEffect(() => {
    const payload = {
      page: page,
      limit: perPageLimit,
      sortBy: filterState.sortBy,
      ...(filterState.selectedCategory?.value && {
        categoryId: filterState.selectedCategory?.value,
      }),
      ...(filterState.rangeValue[0] && {
        minPrice: filterState.rangeValue[0],
      }),
      ...(filterState.rangeValue[1] !== 0 && {
        maxPrice: filterState.rangeValue[1],
      }),
    };
    dispatch(getAuctionList(payload));
  }, [page, perPageLimit, filterState]);

  const fetchMoreData = () => {
    if (auctionListInfo?.hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const handleFilterChange = (value) => {
    setFilterState({
      ...filterState,
      sortBy: value,
    });
    setPage(PAGINATION_CONSTANT.PAGE_ONE);
  };
  return (
    <div className="auction-list-wrapper p-4">
      {isLoading && <Loader />}
      <CustomBreadCrumb
        items={[
          { name: "Home", route: routeConstants.HOME_PAGE },
          { name: "Ongoing Auction", route: routeConstants.AUCTION_LIST },
        ]}
      />
      <Row className="mt-4">
        {/* Filter section */}
        <Col lg={2} md={4} sm={12}>
          <AuctionListFilter
            filterState={filterState}
            setFilterState={setFilterState}
            setPage={setPage}
          />
        </Col>

        {/* Auction Card and Sorting */}
        <Col lg={10} md={8} sm={12}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="heading-text">Ongoing Auction</h2>
            <div className="d-flex">
              <label className="me-2">Sort by:</label>
              {/* Replace this with an actual dropdown */}
              <div className="auction-sort-dropdown">
                <select onChange={(e) => handleFilterChange(e.target.value)}>
                  <option value="asc">Newest First</option>
                  <option value="desc">Oldest First</option>
                </select>
              </div>
            </div>
          </div>
          {auctionListInfo?.data?.length > 0 && (
            <InfiniteScroller
              dataLength={auctionListInfo?.data?.length}
              nextFetch={fetchMoreData}
              hashMore={auctionListInfo?.hasMore}
            >
              <Row>
                {auctionListInfo?.data?.map((item, index) => (
                  <Col key={index} lg={3} md={6} sm={12} className="mb-4">
                    <AuctionCard data={item} />
                  </Col>
                ))}
              </Row>
            </InfiniteScroller>
          )}
          {auctionListInfo?.data?.length === 0 && !isLoading && (
            <div style={{ height: "500px" }}>
              <NoRecord />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

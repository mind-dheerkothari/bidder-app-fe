import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function InfiniteScroller({
  dataLength,
  nextFetch,
  hashMore = false,
  children,
  scrollableTarget,
}) {
  return (
    <>
      <InfiniteScroll
        dataLength={dataLength}
        next={() => nextFetch()}
        hasMore={hashMore}
        scrollableTarget={scrollableTarget}
        style={{ overflow: "inherit" }}
      >
        {children}
      </InfiniteScroll>
    </>
  );
}

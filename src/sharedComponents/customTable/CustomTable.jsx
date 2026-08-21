import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
  PaginationTotalStandalone,
} from "react-bootstrap-table2-paginator";
import cellEditFactory from "react-bootstrap-table2-editor";
import "./customTable.scss";

function CustomTable(props) {
  const {
    columnData,
    dataTable,
    page,
    size,
    showPagination,
    onTableChange,
    totalRecords,
    maxHeight,
    rowEventClickCallback,
    customRowEvent,
    tableLoading,
    keyField,
    checkbox,
    selectedRows,
    selectRowCallback,
    selectAllCallback,
    defaultSorted,
    handleSortOrder,
    sort,
    sizePerPageDropdown,
    cellEdit = true,
  } = props;

  const __rowEvents = {
    onClick: (e, row, rowIndex) => {
      rowEventClickCallback && rowEventClickCallback(e, row, rowIndex);
    },
  };

  const selectRow = {
    mode: "checkbox",
    selected:
      selectedRows &&
      selectedRows.length &&
      selectedRows.map((item) => item.id),
    classes: "selection-row",
    selectionHeaderRenderer: ({ mode, ref, indeterminate, ...rest }) => {
      if (selectedRows.length === 0) rest["checked"] = false;
      return (
        <input
          type={mode}
          className="form-check-input"
          onChange={() => {}}
          ref={(input) => {
            if (input)
              input.indeterminate =
                selectedRows.length === 0 ? false : indeterminate;
          }}
          {...rest}
        />
      );
    },
    selectionRenderer: ({ mode, rowIndex, rowKey, ...rest }) => {
      if (selectedRows.length === 0) rest["checked"] = false;
      return (
        <input
          type={mode}
          className="form-check-input"
          onChange={() => {}}
          rowindex={rowIndex}
          rowkey={rowKey}
          {...rest}
        />
      );
    },
    onSelect: (row, isSelect, rowIndex) => {
      let result = [];
      if (selectedRows && selectedRows.length === 0) {
        result.push(row);
      } else {
        if (isSelect === true) {
          result = [...selectedRows, row];
        } else {
          result = selectedRows.filter((user, i) => {
            return user.id !== row.id;
          });
        }
      }
      selectRowCallback(result);
    },
    onSelectAll: (isSelect, row) => {
      let result = [];
      if (selectedRows.length === 0) {
        result = [...row];
      } else {
        if (isSelect === true) {
          result = [...selectedRows, ...row];
        } else {
          result = selectedRows.filter((user, i) => {
            return !row.find((item) => item.id === user.id);
          });
        }
      }
      selectRowCallback(result);
    },
  };

  const imageLoader = (
    <div className="loaderWrap">
      <img width="150px" src={""} alt="spinner" />
    </div>
  );
  const noDataFound = <p>{dataTable ? "no record to show" : "Loading..."}</p>;

  return (
    <PaginationProvider
      pagination={paginationFactory({
        custom: true,
        page: page || 1,
        sizePerPage: size || 10,
        totalSize: totalRecords || (dataTable && dataTable.length) || 0,
        hidePageListOnlyOnePage: true,
        disablePageTitle: true,
      })}
    >
      {({ paginationProps, paginationTableProps }) => (
        <div>
          <div
            className={`table-responsive ${
              sort &&
              dataTable &&
              dataTable.length !== 0 &&
              dataTable.length > 1 &&
              `customTable`
            }`}
            style={{ maxHeight: maxHeight, overflow: "auto" }}
          >
            <BootstrapTable
              keyField={keyField ? keyField : "id"}
              remote={totalRecords ? true : false}
              data={dataTable || []}
              selectRow={checkbox ? selectRow : undefined}
              rowEvents={customRowEvent || __rowEvents}
              columns={[...columnData]}
              bordered={false}
              defaultSorted={defaultSorted}
              onTableChange={onTableChange}
              {...paginationTableProps}
              noDataIndication={
                <div className="nodata-wrapper">
                  <div className="nodata-heading text-center">
                    {tableLoading ? imageLoader : noDataFound}
                  </div>
                </div>
              }
              classes="tableFixedEllipse  mt-1"
              rowClasses="rowClasses"
              cellEdit={
                cellEdit
                  ? cellEditFactory({ mode: "click", blurToSave: true })
                  : false
              }
              footerClasses="footer-class"
            />
          </div>
          <div>
            {showPagination !== false && (
              <div className="pagination-wrapper my-3 d-md-flex justify-content-md-between mx-4">
                {sizePerPageDropdown ? (
                  <span>
                    Show <SizePerPageDropdownStandalone {...paginationProps} />
                    entries.
                    <PaginationTotalStandalone {...paginationProps} />
                  </span>
                ) : dataTable.length === 0 ? (
                  <span>
                    Showing {0} to {0} of {0} entries
                  </span>
                ) : (
                  <span>
                    {`Showing ${size * (page - 1) + 1} to
                  ${size * (page - 1) + dataTable.length} of ${totalRecords}
                  entries`}
                  </span>
                )}
                <span className="pages-wrapper">
                  <PaginationListStandalone {...paginationProps} />
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </PaginationProvider>
  );
}

CustomTable.defaultProps = {
  dataTable: [],
  columnData: [],
  page: 1,
  size: 10,
  showPagination: true,
  totalRecords: 0,
  maxHeight: "",
};

export default CustomTable;

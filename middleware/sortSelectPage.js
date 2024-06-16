import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import catchAsyncErrors from "./catchAsyncError.js";

let sortingFun = (_sort = "") => {
    let sort = "";
    if (_sort) {
        let _sortArr = _sort.split(",");
        sort = _sortArr.join(" ");
    } else {
        sort = "-createdAt";
    }
    return sort;
};

let getExactPageData = (_brake, _page, _showAllData) => {


    let limit = "";
    let skip = "";

    if (_showAllData !== "true") {
        //setting default value
        _brake = Number(_brake) || 10;
        _page = Number(_page) || 1;

        limit = `${_brake}`;
        skip = `${(_page - 1) * _brake}`;

    } else {
        limit = "";
        skip = "";
        //limit "" means show all document
        //skip "" means dont skip
    }

    let limitInfo = { limit: limit, skip: skip };

    return limitInfo;

};

let selectField = (_select) => {
    let _selectStr = "";

    if (_select) {
        let _selectArr = _select.split(",");

        _selectStr = _selectArr.join(" ");
    }
    return _selectStr;
};

export let sortFilterPagination = catchAsyncErrors(async (req, res) => {
    let find = req.find || {};
    let service = req.service;
    let myOwnSelect = req.myOwnSelect;
    let sort = sortingFun(req.query._sort);
    //for pagination
    let { limit, skip } = getExactPageData(
        req.query._brake,
        req.query._page,
        req.query._showAllData
    );
    //for select
    let select = "";
    if (!myOwnSelect) {
        select = selectField(req.query._select);
    } else {
        select = myOwnSelect;
    }
    let results = await service({ find, sort, limit, skip, select });

    let totalDataInAPage = results.length;

    let totalResults = await service({
        find: find,
        sort: "",
        limit: "",
        skip: "",
        select: "",
    });
    let totalDataInWholePage = totalResults.length;
    let totalPage = Math.ceil(totalDataInWholePage / limit);
    let currentPage = Number(req.query._page) || 1;
    let hasPreviousPage = currentPage > 1;
    let hasNextPage = currentPage < totalPage;

    let data = {
        results,
        totalDataInAPage,
        totalDataInWholePage,
        currentPage,
        totalPage,
        hasPreviousPage,
        hasNextPage,
    };

    successResponseData({
        res,
        message: "Read successfully.",
        statusCode: HttpStatus.OK,
        data,
    });
});
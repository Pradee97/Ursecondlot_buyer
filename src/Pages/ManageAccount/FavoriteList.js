import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import ls from "local-storage";
import API from "../../Services/BaseService";
import cars01 from "../../assets/img/cars01.png";
import speedometer from "../../assets/img/speedometer.svg";
import gasolinePump from "../../assets/img/gasolinePump.svg";
import appstore from "../../assets/img/appstore.png";
import googleplay from "../../assets/img/googleplay.png";
import lock from "../../assets/img/lock.png";
import locked from "../../assets/img/locked.png";
import Loading from "../../Component/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import CarListAction from "../CarList/CarListAction";
import arrowmark from "../../assets/img/arrowmark.jpg";
import Popup from "../../Component/Popup/Popup";
import Makeurbid from "../Makeurbid";
import CarDetailsAction from "../CarDetails/CarDetailsAction";
import BuyItNow from "../../Pages/BuyItNow/BuyItNow";
import Countdown from "react-countdown";
import LateFee from "../../Pages/LateFee/LateFee";

const Favoritelist = () => {
  const history = useHistory();
  let userDetails = ls.get("userDetails");
  const [carFavInventoryDetail, setFavCarInventoryDetail] = useState("");
  const [loading, setLoading] = useState(true);
  const [favCarFlag, setFavCarFlag] = useState(false);
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  const [dealerShip, setDealerShip] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const [fromMileage, setFromMIleage] = useState("");
  const [toMileage, setToMileage] = useState("");
  const [stateSearch, setStateSearch] = useState([]);
  const [makeSearch, setMakeSearch] = useState([]);
  const [transmissionSearch, setTransmissionSearch] = useState([]);
  const [drivetrainSearch, setDriveTrainSearch] = useState([]);
  const [bodyTypeSearch, setBodyTypeSearch] = useState([]);
  const [engineNoiseSearch, setEngineNoiseSearch] = useState("");
  const [transmissionIssueSearch, setTransmissionIssueSearch] = useState("");
  const [historySearch, setHistorySearch] = useState("");
  const [groupSearch, setGroupSearch] = useState([]);
  const [salesTypeSearch, setSalesTypeSearch] = useState("");
  const [stateSearchToggle, setStateSearchToggle] = useState(0);
  const [groupSearchToggle, setGroupSearchToggle] = useState(0);
  const [salesTypesSearchToggle, setSalesTypesSearchToggle] = useState(0);
  const [lowerEngineNoiceSearchToggle, setLowerEngineNoiceSearchToggle] =
    useState(0);
  const [transmissionIssueSearchToggle, setTransmissionIssueSearchToggle] =
    useState(0);
  const [vehicleHistorySearchToggle, setVehicleHistorySearchToggle] =
    useState(0);
  const [yearSearchToggle, setYearSearchToggle] = useState(0);
  const [mileageSearchToggle, setMileageSearchToggle] = useState(0);
  const [makeSearchToggle, setMakeSearchToggle] = useState(0);
  const [sellerTypeSearchToggle, setSellerTypeSearchToggle] = useState(0);
  const [dealershipSearchToggle, setDealershipSearchToggle] = useState(0);
  const [bodyStyleSearchToggle, setBodyStyleSearchToggle] = useState(0);
  const [transmissionSearchToggle, setTransmissionSearchToggle] = useState(0);
  const [driveTrainSearchToggle, setDriveTrainSearchToggle] = useState(0);
  const [stateNameList, setStateNameList] = useState([]);
  const [make, setMake] = useState("");
  const [bodyStyle, setBodyStyle] = useState("");
  const [reset, setReset] = useState(true);
  const [viewMoreState, setViewMoreState] = useState(false);
  const [viewMoreMake, setViewMoreMake] = useState(false);
  const [viewMoreBodyStyle, setViewMoreBodyStyle] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [openBuyItNow, setOpenBuyItNow] = useState(false);
  // const highBid= useSelector(state => state.CarDetailsReducer.payload.high_bid);

  const [highBid, setHighBid] = useState(null);
  const [makeBitData, setMakeBitData] = useState({});
  const [buyItNowData, setBuyItNowData] = useState({});

  const [loadValue, setLoadValue] = useState(4);

  const [isLateFee, setIsLateFee] = useState(false);
  const [lateFeeValue, setLateFeeValue] = useState(0);

  const [carCountDetail, setCarCountDetail] = useState("");

  const [searchLoadMore, setSearchLoadMore] = useState(4);
  const [favDetailsCount, setFavDetailsCount] = useState(false);
  const [favSearchCount, setFavSearchCount] = useState("");
  const [priviliges, setPriviliges] = useState("");

  const toggleLateFee = () => {
    setIsLateFee(!isLateFee);
  };

  const Completionist = () => <span>{""}</span>;

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };

  const getMakeBitValue = (data) => {
    const highBid = data;
    setHighBid(highBid);
  };

  const toggleMakeBid = () => {
    setIsOpen(!isOpen);
  };

  const getPrivileges = () => {
    let request = {
      buyer_id: userDetails.buyer_id,
    };

    API.post("buyerPrivileges/condition", request)
      .then((res) => {
        setPriviliges(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setMakeBitValue = (
    high_bid,
    min_price,
    save_purchase,
    car_id,
    time,
    counterbuyerid,
    max_price,
    buy_it_now,
    comments,
    transportation,
    display,
    proxy_bid,
    transportation_charge,
    save_policy,
    credit_limit,
    lot_fee,
    image,
    model,
    make,
    year,
    seller_dealer_id
  ) => {
    console.log("check the toggle make bid value");
    setMakeBitData({
      carHighBid: high_bid,
      carMinBid: min_price,
      carId: car_id,
      carSavePurchase: save_purchase,
      redirectPage: "favorite",
      time: time,
      counter_buyerid: counterbuyerid,
      carMaxBid: max_price,
      buyItNow: buy_it_now,
      comments: comments,
      transportation: transportation,
      display: display,
      carProxyBid: proxy_bid,
      transportationCharge: transportation_charge,
      savePolicy: save_policy,
      creditLimit: credit_limit,
      lotFee: lot_fee,
      image: image,
      model: model,
      make: make,
      year: year,
      sellerDealerId: seller_dealer_id,
    });

    toggleMakeBid();
  };

  const toggleBuyItNow = () => {
    setOpenBuyItNow(!openBuyItNow);
  };

  const getBuyItNowValue = (data) => {
    const highBid = data;
    setHighBid(highBid);
  };

  const setBuyItNowValue = (
    buy_it_now,
    car_id,
    image,
    model,
    make,
    year,
    price,
    transportation,
    transportation_charge,
    lot_fee,
    credit_limit,
    seller_dealer_id
  ) => {
    setBuyItNowData({
      buyItNow: buy_it_now,
      carId: car_id,
      image: image,
      model: model,
      make: make,
      year: year,
      price: price,
      transportation: transportation,
      transportationCharge: transportation_charge,
      lotFee: lot_fee,
      creditLimit: credit_limit,
      sellerDealerId: seller_dealer_id,
    });

    toggleBuyItNow();
  };

  // const FavoriteListViewMore = ()=>{getFavCarList()}
  const getFavCarList = () => {
    let request = {
      buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails"))
        .buyer_dealer_id,
      key: loadValue,
    };

    console.log("request", request);
    API.post("BuyerFavoriteCarList/condition", request)
      .then((res) => {
        setFavCarInventoryDetail(res.data.data);
        setLoadValue(res.data.data.length > 0 ? res.data.data.length + 4 : 4);
        setCarCountDetail(res.data.count);
        console.log("Car Fav Inventory Detail", res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const redirectpage = (pathid, seller_dealer_id) => {
    //e.preventDefault();
    console.log("seller_dealer_id+++++", seller_dealer_id);
    //   dispatch(CarListAction.sellerid(seller_dealer_id))
    //   history.push("/cardetail/"+pathid);
    history.push({
      pathname: "/cardetail",
      state: { id: pathid, sellerDealerId: seller_dealer_id },
    });
  };
  const addRemoveFavourite = (carid, state, flag) => {
    console.log("inside addremove");

    let request = {
      buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails"))
        .buyer_dealer_id,
      car_id: carid,
      active: !state,
    };
    console.log("request", request);
    API.post("buyer_favourite/add", request).then((res) => {
      // setaddFavourite(res.data.data);
      console.log("add Fav Inventory Detail", res.data.data);

      if (flag === "fav") {
        setFavCarFlag(!favCarFlag);
      }
    });
  };

  // const toggleMakeBid = (high_bid,min_price,save_purchase,car_id,time,counterbuyerid,max_price,buy_it_now,comments,transportation,display,proxy_bid) => {
  // 	console.log("check the high bid value",high_bid)
  // 	let makebiddispatch={
  // 		high_bid: high_bid,
  // 		min_price: min_price,
  // 		car_id : car_id,
  // 		save_purchase: save_purchase,
  // 		time:time,
  // 		counter_buyerid:counterbuyerid,
  // 		max_price:max_price,
  // 		buy_it_now: buy_it_now,
  // 		comments:comments,
  // 		transportation:transportation,
  // 		display:display,
  // 		proxy_bid:proxy_bid,
  // 		redirectPage: "favorite"
  // 	}
  // 	// dispatch(CarDetailsAction.highBid(high_bid))
  // 	dispatch(CarDetailsAction.minBid(makebiddispatch))

  // 	setIsOpen(!isOpen);
  // }

  useEffect(() => {
    let intervalId;
    intervalId = setInterval(() => {
      getFavCarList();
      getPrivileges();
    }, 30000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    getFavCarList();
  }, [favCarFlag, highBid]);

  useEffect(() => {
    if (fromYear.length >= 4) {
      searchCarDetail();
    }
  }, [fromYear]);

  useEffect(() => {
    if (toYear.length >= 4) {
      searchCarDetail();
    }
  }, [toYear]);

  useEffect(() => {
    console.log("State updated with value selected from check box", makeSearch);
    console.log("driveTrain selected", drivetrainSearch);
    console.log("Transmission selected", transmissionSearch);
    console.log("From Mileage", fromMileage);
    console.log("To Mileage", toMileage);
    searchCarDetail();
  }, [
    fromMileage,
    toMileage,
    makeSearch,
    drivetrainSearch,
    transmissionSearch,
    stateSearch,
    groupSearch,
    bodyTypeSearch,
    dealerShip,
    salesTypeSearch,
    historySearch,
    transmissionIssueSearch,
    engineNoiseSearch,
  ]);

  function concatMakeSearch(e) {
    console.log("values passed", e);
    console.log("selected chec box valuue", e.target.value);
    if (e.target.checked)
      setMakeSearch((makeSearch) => [
        ...makeSearch,
        "'" + e.target.value + "'",
      ]);
    else if (!e.target.checked) {
      setMakeSearch(
        makeSearch.filter((item) => item !== "'" + e.target.value + "'")
      );
    }
  }

  function concatTransmissionSearch(e) {
    console.log("values passed", e);
    console.log("selected  transmission chec box valuue", e.target.value);
    if (e.target.checked) {
      setTransmissionSearch((transmissionSearch) => [
        ...transmissionSearch,
        "'" + e.target.value + "'",
      ]);
    } else if (!e.target.checked) {
      setTransmissionSearch(
        transmissionSearch.filter((item) => item !== "'" + e.target.value + "'")
      );
    }
  }

  function concatDriveTrainSearch(e) {
    console.log("values passed", e);
    console.log("selected chec box valuue", e.target.value);
    if (e.target.checked) {
      setDriveTrainSearch((drivetrainSearch) => [
        ...drivetrainSearch,
        "'" + e.target.value + "'",
      ]);
    } else if (!e.target.checked) {
      setDriveTrainSearch(
        drivetrainSearch.filter((item) => item !== "'" + e.target.value + "'")
      );
    }
  }

  function concatStateSearch(e) {
    console.log("state=======", stateSearch);
    console.log("values passed", e);
    console.log("selected chec box valuue", e.target.value);
    if (e.target.checked) {
      setStateSearch((stateSearch) => [
        ...stateSearch,
        "'" + e.target.value + "'",
      ]);
      console.log("selected chec box valuue", e.target.value);
    } else if (!e.target.checked) {
      setStateSearch(
        stateSearch.filter((item) => item !== "'" + e.target.value + "'")
      );
    }
  }

  function concatBodyTypeSearch(e) {
    console.log("state=======", bodyTypeSearch);
    console.log("values passed", e);
    console.log("selected chec box valuue", e.target.value);
    if (e.target.checked) {
      setBodyTypeSearch((bodyTypeSearch) => [
        ...bodyTypeSearch,
        "'" + e.target.value + "'",
      ]);
      console.log("selected chec box valuue", e.target.value);
    } else if (!e.target.checked) {
      setBodyTypeSearch(
        bodyTypeSearch.filter((item) => item !== "'" + e.target.value + "'")
      );
    }
  }

  const OnSearch = (e) => {
    setData(e.target.value);
    console.log("/////////=====", e.target.value);
  };

  const searchCarDetail = () => {
    let request = {
      buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails"))
        .buyer_dealer_id,
      model: bodyTypeSearch.length > 0 ? bodyTypeSearch : "",
      make: makeSearch.length > 0 ? makeSearch : "",
      dealer_type: dealerShip,
      transmission: transmissionSearch.length > 0 ? transmissionSearch : "",
      drivetrain: drivetrainSearch.length > 0 ? drivetrainSearch : "",
      state: stateSearch.length > 0 ? stateSearch : "",
      fromMileage: fromMileage,
      toMileage: toMileage,
      fromYear: fromYear,
      toYear: toYear,
      group: groupSearch.length > 0 ? groupSearch : "",
      engine_noise: engineNoiseSearch,
      transmission_issue: transmissionIssueSearch,
      history: historySearch,
      sales_type: salesTypeSearch,
      key: searchLoadMore,
    };
    console.log("state=======", stateSearch);
    console.log(" filter search request", request);

    API.post("BuyerFavoriteCarSearch/condition", request)
      .then(
        (res) => {
          setFavCarInventoryDetail(res.data.data);
          setFavDetailsCount(res.data.data.length);
          setFavSearchCount(res.data.count);
          setSearchLoadMore(
            res.data.data.length >= 4
              ? res.data.data.length + 4
              : searchLoadMore
          );
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((err) => {
        console.log(err);
      });
  };

  function onDealerShipClick(e) {
    console.log("event value++++++", e.target.value);
    setDealerShip(e.target.value);
    searchCarDetail();
  }

  function onTransmissionIssueClick(e) {
    console.log("Transmission issue selected value", e.target.value);
    setTransmissionIssueSearch(e.target.value);
    searchCarDetail();
  }
  function onSaleTypeClick(e) {
    console.log("Sale Type selected value", e.target.value);
    setSalesTypeSearch(e.target.value);
    searchCarDetail();
  }
  function onHistoryClick(e) {
    console.log("History Search selected value", e.target.value);
    setHistorySearch(e.target.value);
    searchCarDetail();
  }
  function onEngineNoiseClick(e) {
    console.log("Engine Noise selected value", e.target.value);
    setEngineNoiseSearch(e.target.value);
    searchCarDetail();
  }
  function onGroupClick(e) {
    console.log("Group selected value", e.target.value);
    if (e.target.checked)
      setGroupSearch((groupSearch) => [
        ...groupSearch,
        "'" + e.target.value + "'",
      ]);
    else if (!e.target.checked) {
      setGroupSearch(
        groupSearch.filter((item) => item !== "'" + e.target.value + "'")
      );
    }
  }

  function toggleStateSearch() {
    console.log("Show/Hide", !stateSearchToggle);
    setStateSearchToggle(!stateSearchToggle);
  }

  function toggleGroupSearch() {
    console.log("Show/Hide", !groupSearchToggle);
    setGroupSearchToggle(!groupSearchToggle);
  }

  function toggleSalesTypesSearch() {
    console.log("Show/Hide", !salesTypesSearchToggle);
    setSalesTypesSearchToggle(!salesTypesSearchToggle);
  }

  function toggleLowerEngineNoiceSearch() {
    console.log("Show/Hide", !lowerEngineNoiceSearchToggle);
    setLowerEngineNoiceSearchToggle(!lowerEngineNoiceSearchToggle);
  }

  function toggleTransmissionIssueSearch() {
    console.log("Show/Hide", !transmissionIssueSearchToggle);
    setTransmissionIssueSearchToggle(!transmissionIssueSearchToggle);
  }

  function toggleVehicleHistorySearch() {
    console.log("Show/Hide", !vehicleHistorySearchToggle);
    setVehicleHistorySearchToggle(!vehicleHistorySearchToggle);
  }

  function toggleYearSearch() {
    console.log("Show/Hide", !yearSearchToggle);
    setYearSearchToggle(!yearSearchToggle);
  }

  function toggleMileageSearch() {
    console.log("Show/Hide", !mileageSearchToggle);
    setMileageSearchToggle(!mileageSearchToggle);
  }

  function toggleMakeSearch() {
    console.log("Show/Hide", !makeSearchToggle);
    setMakeSearchToggle(!makeSearchToggle);
  }

  function toggleSellerTypeSearch() {
    console.log("Show/Hide", !sellerTypeSearchToggle);
    setSellerTypeSearchToggle(!sellerTypeSearchToggle);
  }

  function toggleDealershipSearch() {
    console.log("Show/Hide", !dealershipSearchToggle);
    setDealershipSearchToggle(!dealershipSearchToggle);
  }

  function toggleBodyStyleSearch() {
    console.log("Show/Hide", !bodyStyleSearchToggle);
    setBodyStyleSearchToggle(!bodyStyleSearchToggle);
  }

  function toggleTransmissionSearch() {
    console.log("Show/Hide", !transmissionSearchToggle);
    setTransmissionSearchToggle(!transmissionSearchToggle);
  }

  function toggleDriveTrainSearch() {
    console.log("Show/Hide", !driveTrainSearchToggle);
    setDriveTrainSearchToggle(!driveTrainSearchToggle);
  }

  const clear = () => {
    console.log("clearrrrrrrrrr");
    setReset(false);
  };

  const getState = () => {
    const state = API.post("stateList/condition");
    state
      .then((res) => {
        setStateNameList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMake = () => {
    const state = API.post("car_make/condition");
    state
      .then((res) => {
        setMake(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBodyStyle = () => {
    const state = API.post("car_bodystyle/condition");
    state
      .then((res) => {
        setBodyStyle(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getState();
    getMake();
    getBodyStyle();
  }, [reset]);

  const getlateFee = () => {
    let request = {
      buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails"))
        .buyer_dealer_id,
    };

    API.post("getlatefee/condition", request)
      .then((res) => {
        if (res.data.data.length) {
          console.log(
            "check +++++ ",
            res.data.data.filter((value) => value.status == "yes")[0]?.status ||
              "no"
          );
          const lateFeeValueStatus =
            res.data.data.filter((value) => value.status == "yes")[0]?.status ||
            "no";
          setIsLateFee(lateFeeValueStatus === "yes");
          setLateFeeValue(
            res.data.data.filter((value) => value.late_fee > 0)[0]?.late_fee ||
              0
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getlateFee();
    getPrivileges();
  }, []);

  const loadMoreDetails = () => {
    if (favDetailsCount == false) {
      getFavCarList();
    } else {
      searchCarDetail();
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <main id="main" class="inner-page favoritePage">
          {/* <div class="back-btn">
                        <a class="back-btn-primary" href="/carlist"><i class="bx bx-chevron-left"></i> Back</a>
            </div> */}
          <div id="suggested-cars" class="suggested-cars vehiclesearch">
            <div
              class="container-fluid aos-init aos-animate"
              data-aos="fade-up"
            >
              <div class="section-title">
                <h2>My Favorite Car List</h2>
              </div>
              <div class="row content">
                <div class="col-lg-3">
                  <div class="saveSearch">
                    <button class="cta-btn" type="button">
                      Save Search{" "}
                    </button>
                  </div>
                  <div class="leftonsidebox">
                    <div class="filtersblock">
                      <h3>
                        Filters
                        <span>
                          <a href="#" onClick={clear}>
                            Reset
                          </a>
                        </span>
                      </h3>

                      <div class="input-group">
                        <select
                          id="vehiclename1"
                          class="form-control custom-select browser-default"
                        >
                          <option value="Saved Search">Saved Search</option>
                        </select>
                      </div>
                    </div>

                    <div class="distanceBlock">
                      <h4>Distance</h4>
                      <div class="input-group">
                        <input
                          class="form-control"
                          type="text"
                          value=""
                          placeholder="50km"
                        />
                      </div>
                    </div>

                    <div class="sortbyblock">
                      <h4>Sort by</h4>
                      <div class="row">
                        <div class="form-group input-group col-lg-6">
                          <input type="checkbox" id="latest" />
                          <label for="latest">Latest</label>
                        </div>
                        <div class="form-group input-group col-lg-6">
                          <input type="checkbox" id="newest" />
                          <label for="newest">Newest</label>
                        </div>
                        <div class="form-group input-group col-lg-6">
                          <input type="checkbox" id="oldest" />
                          <label for="oldest">Oldest</label>
                        </div>

                        <div class="form-group input-group col-lg-6">
                          <input type="checkbox" id="classic" />
                          <label for="classic">Classic</label>
                        </div>
                      </div>
                    </div>

                    <div class="yearblock">
                      <h4>
                        Year
                        <span>
                          <img onClick={toggleYearSearch} src={arrowmark} />
                        </span>
                      </h4>
                      {yearSearchToggle ? (
                        <div class="inner">
                          <div class="row">
                            <div class="input-group col-lg-6 pt-0 pb-0 mb-0">
                              <input
                                class="form-control border-end-0 border"
                                type="text"
                                id="from-input"
                                value={fromYear}
                                maxLength="4"
                                placeholder="From"
                                onChange={(e) => setFromYear(e.target.value)}
                              />
                            </div>
                            <div class="input-group col-lg-6 pt-0 pb-0 mb-0">
                              <input
                                class="form-control border-end-0 border"
                                type="text"
                                value={toYear}
                                id="to-input"
                                placeholder="To"
                                maxLength="4"
                                onChange={(e) => setToYear(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div class="mileageblock">
                      <h4>
                        Mileage
                        <span>
                          <img onClick={toggleMileageSearch} src={arrowmark} />
                        </span>
                      </h4>
                      {mileageSearchToggle ? (
                        <div class="inner">
                          <div class="row">
                            <div class="input-group col-lg-6  pt-0 pb-0 mb-0">
                              <input
                                class="form-control border-end-0 border"
                                type="text"
                                id="from-mileage"
                                placeholder="From"
                                value={fromMileage}
                                onChange={(e) => setFromMIleage(e.target.value)}
                              />
                            </div>
                            <div class="input-group col-lg-6  pt-0 pb-0 mb-0">
                              <input
                                class="form-control border-end-0 border"
                                type="text"
                                id="to-mileage"
                                placeholder="To"
                                value={toMileage}
                                onChange={(e) => setToMileage(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div class="makeblock">
                      <h4>
                        Make
                        <span>
                          <img onClick={toggleMakeSearch} src={arrowmark} />
                        </span>
                      </h4>
                      {makeSearchToggle ? (
                        <div class="inner">
                          {viewMoreMake
                            ? make.length > 0
                              ? make.map((make) => (
                                  <div class="form-group input-group ">
                                    <input
                                      type="checkbox"
                                      id={make.car_name}
                                      value={make.car_name}
                                      onClick={concatMakeSearch}
                                    />
                                    <label for={make.car_name}>
                                      {make.car_name}
                                    </label>
                                  </div>
                                ))
                              : ""
                            : make.length > 0
                            ? make.slice(0, 6).map((make) => (
                                <div class="form-group input-group ">
                                  <input
                                    type="checkbox"
                                    id={make.car_name}
                                    value={make.car_name}
                                    onClick={concatMakeSearch}
                                  />
                                  <label for={make.car_name}>
                                    {make.car_name}
                                  </label>
                                </div>
                              ))
                            : ""}
                          {viewMoreMake ? (
                            <div class="viewblock">
                              <a
                                href="JavaScript:void(0)"
                                onClick={() => setViewMoreMake(false)}
                              >
                                View Less
                              </a>
                            </div>
                          ) : (
                            <div class="viewblock">
                              <a
                                href="JavaScript:void(0)"
                                onClick={() => setViewMoreMake(true)}
                              >
                                View More
                              </a>
                            </div>
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div class="drivetrainblock">
                      <h4>
                        Drivetrain
                        <span>
                          <img
                            onClick={toggleDriveTrainSearch}
                            src={arrowmark}
                          />
                        </span>
                      </h4>
                      {driveTrainSearchToggle ? (
                        <div class="inner">
                          <div class="form-group input-group ">
                            <input
                              type="checkbox"
                              id="twdrive"
                              value="two wheel drive"
                              onClick={concatDriveTrainSearch}
                            />
                            <label for="twdrive">Two wheel Drive</label>
                          </div>
                          <div class="form-group input-group ">
                            <input
                              type="checkbox"
                              id="fwdrive"
                              value="front wheel drive"
                              onClick={concatDriveTrainSearch}
                            />
                            <label for="fwdrive">Front Wheel drive</label>
                          </div>
                          <div class="form-group input-group ">
                            <input
                              type="checkbox"
                              id="rwdrive"
                              value="rear wheel drive"
                              onClick={concatDriveTrainSearch}
                            />
                            <label for="rwdrive">Rear Wheel Drive</label>
                          </div>
                          <div class="form-group input-group ">
                            <input
                              type="checkbox"
                              id="fowdrive"
                              value="four wheel drive"
                              onClick={concatDriveTrainSearch}
                            />
                            <label for="fowdrive">Four Wheel Drive</label>
                          </div>
                          <div class="form-group input-group ">
                            <input
                              type="checkbox"
                              id="awdrive"
                              value="all wheel drive"
                              onClick={concatDriveTrainSearch}
                            />
                            <label for="awdrive">All Wheel Drive</label>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div class="transmissionblock">
                      <h4>
                        Transmission
                        <span>
                          <img
                            onClick={toggleTransmissionSearch}
                            src={arrowmark}
                          />
                        </span>
                      </h4>
                      {transmissionSearchToggle ? (
                        <div class="inner">
                          <div class="form-group input-group ">
                            <input
                              type="checkbox"
                              id="manual"
                              value="manual"
                              onClick={concatTransmissionSearch}
                            />
                            <label for="manual">Manual</label>
                          </div>
                          <div class="form-group input-group ">
                            <input
                              type="checkbox"
                              id="automatic"
                              value="automatic"
                              onClick={concatTransmissionSearch}
                            />
                            <label for="automatic">Automatic</label>
                          </div>
                          <div class="form-group input-group ">
                            <input
                              type="checkbox"
                              id="otherissues"
                              value="other"
                              onClick={concatTransmissionSearch}
                            />
                            <label for="otherissues">Other</label>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div class="bodystyleblock">
                      <h4>
                        Body Style
                        <span>
                          <img
                            onClick={toggleBodyStyleSearch}
                            src={arrowmark}
                          />
                        </span>
                      </h4>

                      {bodyStyleSearchToggle ? (
                        <div class="inner">
                          {viewMoreBodyStyle
                            ? bodyStyle.length > 0
                              ? bodyStyle.map((bodyStyle) => (
                                  <div class="form-group input-group ">
                                    <input
                                      type="checkbox"
                                      id={bodyStyle.style_name}
                                      value={bodyStyle.style_name}
                                      onClick={concatBodyTypeSearch}
                                    />
                                    <label for={bodyStyle.style_name}>
                                      {bodyStyle.style_name}
                                    </label>
                                  </div>
                                ))
                              : ""
                            : bodyStyle.length > 0
                            ? bodyStyle.slice(0, 6).map((bodyStyle) => (
                                <div class="form-group input-group ">
                                  <input
                                    type="checkbox"
                                    id={bodyStyle.style_name}
                                    value={bodyStyle.style_name}
                                    onClick={concatBodyTypeSearch}
                                  />
                                  <label for={bodyStyle.style_name}>
                                    {bodyStyle.style_name}
                                  </label>
                                </div>
                              ))
                            : ""}
                          {viewMoreBodyStyle ? (
                            <div class="viewblock">
                              <a
                                href="JavaScript:void(0)"
                                onClick={() => setViewMoreBodyStyle(false)}
                              >
                                View Less
                              </a>
                            </div>
                          ) : (
                            <div class="viewblock">
                              <a
                                href="JavaScript:void(0)"
                                onClick={() => setViewMoreBodyStyle(true)}
                              >
                                View More
                              </a>
                            </div>
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div class="statesblock">
                      <h4>
                        States
                        <span>
                          <img onClick={toggleStateSearch} src={arrowmark} />
                        </span>
                      </h4>

                      {stateSearchToggle ? (
                        <div class="inner">
                          {viewMoreState
                            ? stateNameList.length > 0
                              ? stateNameList.map((stateName) => (
                                  <div class="form-group input-group ">
                                    <input
                                      type="checkbox"
                                      id={stateName.state_name}
                                      value={stateName.state_name}
                                      onClick={concatStateSearch}
                                    />
                                    <label for={stateName.state_name}>
                                      {stateName.state_name}
                                    </label>
                                  </div>
                                ))
                              : ""
                            : stateNameList.length > 0
                            ? stateNameList.slice(0, 6).map((stateName) => (
                                <div class="form-group input-group ">
                                  <input
                                    type="checkbox"
                                    id={stateName.state_name}
                                    value={stateName.state_name}
                                    onClick={concatStateSearch}
                                  />
                                  <label for={stateName.state_name}>
                                    {stateName.state_name}
                                  </label>
                                </div>
                              ))
                            : ""}

                          {viewMoreState ? (
                            <div class="viewblock">
                              <a
                                href="JavaScript:void(0)"
                                onClick={() => setViewMoreState(false)}
                              >
                                View Less
                              </a>
                            </div>
                          ) : (
                            <div class="viewblock">
                              <a
                                href="JavaScript:void(0)"
                                onClick={() => setViewMoreState(true)}
                              >
                                View More
                              </a>
                            </div>
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div class="salestypesblock">
                      <h4>
                        Sales Types
                        <span>
                          <img
                            onClick={toggleSalesTypesSearch}
                            src={arrowmark}
                          />
                        </span>
                      </h4>
                      {salesTypesSearchToggle ? (
                        <div class="inner">
                          <div class="radio input-group">
                            <input
                              id="radio-any1"
                              name="salesTypesRadio"
                              type="radio"
                              value="Any"
                              onClick={onSaleTypeClick}
                            />
                            <label for="radio-any1" class="radio-label">
                              Any
                            </label>
                          </div>

                          <div class="radio input-group">
                            <input
                              id="radio-buy"
                              name="salesTypesRadio"
                              type="radio"
                              value="Buy it now"
                              onClick={onSaleTypeClick}
                            />
                            <label for="radio-buy" class="radio-label">
                              Buy it now
                            </label>
                          </div>

                          <div class="radio input-group">
                            <input
                              id="radio-sales"
                              name="salesTypesRadio"
                              type="radio"
                              value="Sealed Bid Sales"
                              onClick={onSaleTypeClick}
                            />
                            <label for="radio-sales" class="radio-label">
                              Sealed Bid Sales
                            </label>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div class="groupblock">
                      <h4>
                        Seller
                        <span>
                          <img onClick={toggleGroupSearch} src={arrowmark} />
                        </span>
                      </h4>
                      {groupSearchToggle ? (
                        <div class="inner">
                          <div class="form-group input-group ">
                            <input
                              type="checkbox"
                              id="sellersflo"
                              value="Sellers I Follow"
                              onClick={onGroupClick}
                            />
                            <label for="sellersflo">Sellers I Follow</label>
                          </div>
                          <div class="form-group input-group ">
                            <input
                              type="checkbox"
                              id="sellerstit"
                              value="Seller Has Title"
                              onClick={onGroupClick}
                            />
                            <label for="sellerstit">Seller Has Title</label>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div class="vehiclehistoryblock">
                      <h4>
                        Vehicle History
                        <span>
                          <img
                            onClick={toggleVehicleHistorySearch}
                            src={arrowmark}
                          />
                        </span>
                      </h4>
                      {vehicleHistorySearchToggle ? (
                        <div class="inner">
                          <div class="radio input-group">
                            <input
                              id="radio-any4"
                              name="vehicleHistoryRadio"
                              type="radio"
                              value="Any"
                              onClick={onHistoryClick}
                            />
                            <label for="radio-any4" class="radio-label">
                              Any
                            </label>
                          </div>

                          <div class="radio input-group">
                            <input
                              id="radio-noreport"
                              name="vehicleHistoryRadio"
                              type="radio"
                              value="None reported"
                              onClick={onHistoryClick}
                            />
                            <label for="radio-noreport" class="radio-label">
                              None reported
                            </label>
                          </div>

                          <div class="radio input-group">
                            <input
                              id="radio-noeventreport"
                              name="vehicleHistoryRadio"
                              type="radio"
                              value="Events reported"
                              onClick={onHistoryClick}
                            />
                            <label
                              for="radio-noeventreport"
                              class="radio-label"
                            >
                              Events reported
                            </label>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div class="lowerblock">
                      <h4>
                        Lower Engine Notice
                        <span>
                          <img
                            onClick={toggleLowerEngineNoiceSearch}
                            src={arrowmark}
                          />
                        </span>
                      </h4>
                      {lowerEngineNoiceSearchToggle ? (
                        <div class="inner">
                          <div class="radio input-group">
                            <input
                              id="radio-any2"
                              name="lowerEngineNoiceRadio"
                              type="radio"
                              value="Any"
                              onClick={onEngineNoiseClick}
                            />
                            <label for="radio-any2" class="radio-label">
                              Any
                            </label>
                          </div>

                          <div class="radio input-group">
                            <input
                              id="radio-nonoise"
                              name="lowerEngineNoiceRadio"
                              type="radio"
                              value="No Noise Detected"
                              onClick={onEngineNoiseClick}
                            />
                            <label for="radio-nonoise" class="radio-label">
                              No Noise Detected
                            </label>
                          </div>

                          <div class="radio input-group">
                            <input
                              id="radio-noisedel"
                              name="lowerEngineNoiceRadio"
                              type="radio"
                              value="Noise Detected"
                              onClick={onEngineNoiseClick}
                            />
                            <label for="radio-noisedel" class="radio-label">
                              Noise Detected
                            </label>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div class="transmissionissblock">
                      <h4>
                        Transmission Issue
                        <span>
                          <img
                            onClick={toggleTransmissionIssueSearch}
                            src={arrowmark}
                          />
                        </span>
                      </h4>
                      {transmissionIssueSearchToggle ? (
                        <div class="inner">
                          <div class="radio input-group">
                            <input
                              id="radio-any3"
                              name="transmissionIssueRadio"
                              type="radio"
                              value="Any"
                              onClick={onTransmissionIssueClick}
                            />
                            <label for="radio-any3" class="radio-label">
                              Any
                            </label>
                          </div>

                          <div class="radio input-group">
                            <input
                              id="radio-noissues"
                              name="transmissionIssueRadio"
                              type="radio"
                              value="No Issue Detected"
                              onClick={onTransmissionIssueClick}
                            />
                            <label for="radio-noissues" class="radio-label">
                              No Issue Detected
                            </label>
                          </div>

                          <div class="radio input-group">
                            <input
                              id="radio-noissues2"
                              name="transmissionIssueRadio"
                              type="radio"
                              value="Noise Detected"
                              onClick={onTransmissionIssueClick}
                            />
                            <label for="radio-noissues2" class="radio-label">
                              Noise Detected
                            </label>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div class="dealershipblock">
                      <h4>
                        Dealership
                        <span>
                          <img
                            onClick={toggleDealershipSearch}
                            src={arrowmark}
                          />
                        </span>
                      </h4>
                      {dealershipSearchToggle ? (
                        <div class="inner">
                          <div class="radio input-group">
                            <input
                              id="radio-newdealer"
                              name="sellerTypeRadio"
                              type="radio"
                              cheid="car"
                              value="New Car Dealer"
                              onClick={onDealerShipClick}
                            />
                            <label for="radio-newdealer" class="radio-label">
                              New Car Dealer
                            </label>
                          </div>

                          <div class="radio input-group">
                            <input
                              id="radio-useddealer"
                              name="sellerTypeRadio"
                              type="radio"
                              value="Used Car Dealer"
                              onClick={onDealerShipClick}
                            />
                            <label for="radio-useddealer" class="radio-label">
                              Used Car Dealer
                            </label>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-lg-9">
                  <div class="row aos-init aos-animate">
                    {carFavInventoryDetail.length > 0 ? (
                      carFavInventoryDetail.map((item, index) => (
                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6">
                          <div class="car-item">
                            <div class="cars-lock">
                              <img
                                src={item.isFavourite === 0 ? lock : locked}
                                onClick={() =>
                                  addRemoveFavourite(
                                    item.car_id,
                                    item.isFavourite,
                                    "fav"
                                  )
                                }
                              />
                            </div>
                            <img
                              src={item.image}
                              class="carImg"
                              onClick={() => {
                                redirectpage(
                                  item.car_id,
                                  item.seller_dealer_id
                                );
                              }}
                              alt="..."
                            />
                            {item.isbestSale ? (
                              <div class="cars-tag">
                                <h4>Best deal</h4>
                              </div>
                            ) : (
                              ""
                            )}
                            <div class="cars-content">
                              <h3>
                                <a href="#">
                                  {" "}
                                  {item.year} {item.make} {item.model}{" "}
                                </a>
                              </h3>
                              <div className="d-flex align-items-center mb-3">
                                <p className="details">
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/images/speedometer.svg"
                                    }
                                    alt=""
                                  />
                                  <span>{item.miles} m</span>
                                </p>
                                <p className="details">
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/images/gasoline-pump.svg"
                                    }
                                    alt=""
                                  />
                                  <span>{item.fuel_type}</span>
                                </p>
                                <p className="details buyitnow">
                                  {priviliges[0]?.buy_now === 0 ? (
                                    ""
                                  ) : (
                                    <>
                                      {item.buy_it_now == "" ||
                                      item.buy_it_now == null ||
                                      item.buy_it_now == undefined ||
                                      item.buy_it_now == 0 ? (
                                        ""
                                      ) : (
                                        <a
                                          className={`${
                                            lateFeeValue > 0 &&
                                            "buy-it-disable-btn"
                                          } cta-btns`}
                                          href="JavaScript:void(0)"
                                          onClick={() =>
                                            lateFeeValue === 0 &&
                                            setBuyItNowValue(
                                              item.buy_it_now,
                                              item.car_id,
                                              item.image,
                                              item.model,
                                              item.make,
                                              item.year,
                                              item.price,
                                              item.transportation,
                                              item.transportation_charge,
                                              item.lot_fee,
                                              item.credit_limit,
                                              item.seller_dealer_id
                                            )
                                          }
                                        >
                                          Buy It Now $ {item.buy_it_now}
                                        </a>
                                      )}{" "}
                                    </>
                                  )}
                                </p>
                              </div>
                              <div className="d-flex align-items-center mb-3 dealerType">
                                <p className="details">
                                  <span className="dlrname">
                                    {item.dealer_type}{" "}
                                  </span>
                                  <span className="dlraddress">
                                    <i class="icofont-google-map"></i>{" "}
                                    {item.location}
                                  </span>
                                </p>
                                <p className="details">
                                  <img src={item.logo} />
                                </p>
                              </div>

                              <div class="cars-prices">
                                {/* <a className="cta-btns" href="#">Inventory Number {item.inventory_no}</a> */}

                                {item.high_bid == "" ||
                                item.high_bid == null ||
                                item.high_bid == undefined ? (
                                  ""
                                ) : (
                                  <a className="cta-btns" href="#">
                                    High Bid $ {item.high_bid}
                                  </a>
                                )}
                                {/* {item.buy_it_now=="" || item.buy_it_now== null || item.buy_it_now== undefined?"":
							<a className="cta-btns" href="#">Counter Bid $ {item.buy_it_now}</a>
							}  */}
                                {priviliges[0]?.bid == 0 ? (
                                  ""
                                ) : (
                                  <>
                                    {(item.isbuyercounterbid == "me" &&
                                      item.iscounterbid !== null &&
                                      (item.time !== 0 ||
                                        item.time !== null)) ||
                                    ((item.iscounterbid == null ||
                                      item.iscounterbid == "no") &&
                                      (item.isbuyercounterbid == null ||
                                        item.isbuyercounterbid == "not") &&
                                      (item.time == 0 || item.time == null)) ? (
                                      <a
                                        className={`${
                                          lateFeeValue > 0 &&
                                          "buy-it-disable-btn"
                                        } cta-btns-primary`}
                                        href="JavaScript:void(0)"
                                        onClick={() =>
                                          lateFeeValue === 0 &&
                                          setMakeBitValue(
                                            item.high_bid,
                                            item.min_price,
                                            item.save_purchase,
                                            item.car_id,
                                            item.time,
                                            item.counter_buyer_dealer_id,
                                            item.max_price,
                                            item.buy_it_now,
                                            item.comments,
                                            item.transportation,
                                            item.display,
                                            item.proxy_bid,
                                            item.transportation_charge,
                                            item.save_policy,
                                            item.transportation_charge,
                                            item.credit_limit,
                                            item.lot_fee,
                                            item.image,
                                            item.model,
                                            item.make,
                                            item.year,
                                            item.seller_dealer_id
                                          )
                                        }
                                      >
                                        Make Bid
                                      </a>
                                    ) : (
                                      <a class="cta-btns lockedcarBtn">
                                        Locked up for Higher Bid{" "}
                                      </a>
                                    )}{" "}
                                  </>
                                )}

                                {(item.buyer_high_bid == item.high_bid ||
                                  item.buyer_high_bid !== item.high_bid) && (
                                  <div
                                    class={
                                      item.time !== null && item.time < 20
                                        ? "countownBlock"
                                        : ""
                                    }
                                  >
                                    <Countdown
                                      date={
                                        Date.now() +
                                        (item.time !== null && item.time < 20
                                          ? item.time * 60 * 1000
                                          : 0)
                                      }
                                      renderer={renderer}
                                    />
                                  </div>
                                )}

                                {/* <a class="cta-btns-primary" onClick={()=>setMakeBitValue(item.high_bid, item.min_price, item.save_purchase, item.car_id, item.time, item.counter_buyer_dealer_id, item.max_price, item.buy_it_now,item.comments,item.transportation,item.display,item.proxy_bid,item.transportation_charge,item.save_policy)}>Make Bid</a> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="floor_notfiled_block">
                        <p>No Data Found</p>
                      </div>
                    )}

                    {/* {carFavInventoryDetail.length >=2 ? carFavInventoryDetail.slice(0,1)
                                .map(() =>
				<div class="col-md-12 text-center">
					<a href="JavaScript:void(0)" onClick={FavoriteListViewMore} class="load-more-btn">Load More</a>
				</div> ):""}        */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center clearB col-lg-12">
            {carFavInventoryDetail.length >= 4
              ? carFavInventoryDetail.slice(0, 1).map(() => (
                  <a
                    onClick={loadMoreDetails}
                    class={
                      carFavInventoryDetail.length !== carCountDetail &&
                      favDetailsCount !== favSearchCount
                        ? "load-more-btn"
                        : ""
                    }
                  >
                    {carFavInventoryDetail.length !== carCountDetail &&
                    favDetailsCount !== favSearchCount
                      ? "Load More"
                      : ""}
                  </a>
                ))
              : ""}
          </div>

          <section id="playstoreBlock" class="playstoreBlock">
            <div class="container">
              <div class="row content">
                <div class="col-lg-12">
                  <img src={appstore} />
                  <img src={googleplay} />
                </div>
              </div>
            </div>
          </section>
          {isOpen && (
            <Popup
              isClose={false}
              content={
                <>
                  <Makeurbid
                    toggle={toggleMakeBid}
                    setMakeBitValue={makeBitData}
                    getMakeBitValue={getMakeBitValue}
                  />
                </>
              }
              handleClose={toggleMakeBid}
            />
          )}

          {openBuyItNow && (
            <Popup
              isClose={false}
              content={
                <>
                  <BuyItNow
                    toggle={toggleBuyItNow}
                    setBuyItNowValue={buyItNowData}
                    getBuyItNowValue={getBuyItNowValue}
                  />
                </>
              }
              handleClose={toggleBuyItNow}
            />
          )}

          {isLateFee && (
            <Popup
              isClose={false}
              content={
                <>
                  <LateFee toggle={toggleLateFee} />
                </>
              }
              handleClose={toggleLateFee}
            />
          )}
        </main>
      )}
    </div>
  );
};
export default Favoritelist;

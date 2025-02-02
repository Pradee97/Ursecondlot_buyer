import React, { useState, useEffect } from "react";
import $ from "jquery";
import { useHistory, useLocation, useParams } from "react-router-dom";
import API from "../Services/BaseService";
import lock from "../assets/img/lock.png";
import cars01 from "../assets/img/cars01.png";
import carbrand from "../assets/img/carshonda.jpg";
import appstore from "../assets/img/appstore.png";
import googleplay from "../assets/img/googleplay.png";
import speedometer from "../assets/img/speedometer.svg";
import gasolinePump from "../assets/img/gasolinePump.svg";
import car from "../assets/img/car.svg";
import book from "../assets/img/book.svg";
import barcode from "../assets/img/barcode.svg";
import carcheck from "../assets/img/carcheck.png";
import tag from "../assets/img/tag.svg";
import oops from "../assets/img/oops.jpg";
import Path from "../assets/img/Path.svg";
import transmission from "../assets/img/manual-transmission.svg";
import drivetrain from "../assets/img/drivetrain.svg";
import cardetail1 from "../assets/img/cardetail1.jpg";
import cardetail2 from "../assets/img/cardetail2.jpg";
import cardetail3 from "../assets/img/cardetail3.jpg";
import cardetail4 from "../assets/img/cardetail4.jpg";
import cardetail5 from "../assets/img/cardetail5.jpg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import locked from "../assets/img/locked.png";
import { useDispatch, useSelector } from "react-redux";
import CarListReducer from "./CarList/CarListReducer";
import CarListAction from "./CarList/CarListAction";
import Loading from "../Component/Loading/Loading";
import Popup from "../Component/Popup/Popup";
import Makeurbid from "./Makeurbid";
import CarDetailsAction from "./CarDetails/CarDetailsAction";
import Countdown from "react-countdown";
import BuyItNow from "../Pages/BuyItNow/BuyItNow";
import Barcode from "react-hooks-barcode";
import LateFee from "../Pages/LateFee/LateFee";
import ls from "local-storage";

const Cardetail = (props) => {
  const history = useHistory();
  let userDetails = ls.get("userDetails");

  const dispatch = useDispatch();
  const [copySuccess, setCopySuccess] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [carDetail, setCarDetail] = useState([]);
  const [carInventoryDetail, setCarInventoryDetail] = useState([]);
  const [otherDealerCarDetail, setOtherDealerCarDetail] = useState([]);
  const { id, sellerDealerId } = props.location.state;
  const [sellerCarDetail, setSellerCarDetail] = useState([]);
  const [lrgImg, setLrgImg] = useState("");
  const [copied, setCopied] = useState(false);
  const [data, setData] = useState("");
  const [distance, setDistance] = useState("");
  const [moreCarFlag, setMoreCarFlag] = useState(false);
  const [similarCarFromSellerFlag, setSimilarCarFromSellerFlag] =
    useState(false);
  // const sellerDealerId = useSelector(state => state.CarListReducer.payload);
  const [buyer_dealer_id, setBuyer_Dealer_Id] = useState(
    JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id
  );
  const [carBuyerDealerId, setCarBuyerDealerId] = useState("");
  const [loading, setLoading] = useState(true);
  console.log("selescted seller id_______", sellerDealerId);

  const [carSellerDealerId, setCarSellerDealerId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const [highBid, setHighBid] = useState(null);
  const [makeBitData, setMakeBitData] = useState({});
  const [buyItNowData, setBuyItNowData] = useState({});

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  const [isShown, setIsShown] = useState(false);

  const [isLateFee, setIsLateFee] = useState(false);
  const [lateFeeValue, setLateFeeValue] = useState(0);
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

  const getMakeBitValue = (data) => {
    const highBid = data;
    setHighBid(highBid);
  };
  // const highBid= useSelector(state => state.CarDetailsReducer.payload.high_bid);

  const toggleMakeBid = () => {
    setIsOpen(!isOpen);
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
    // console.log("check the toggle make bid value")
    setMakeBitData({
      carHighBid: high_bid,
      carMinBid: min_price,
      carId: car_id,
      carSavePurchase: save_purchase,
      redirectPage: "cardetail",
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
    setOpen(!open);
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

  const redirectpage = (pathid, seller_dealer_id) => {
    //e.preventDefault();

    // dispatch(CarListAction.sellerid(seller_dealer_id))
    // history.push("/cardetail/"+pathid);
    history.push({
      pathname: "/cardetail",
      state: { id: pathid, sellerDealerId: seller_dealer_id },
    });
  };

  const redirecttoInspection = (pathid) => {
    //   history.push("/Inspection/"+pathid);
    history.push({
      pathname: "/Inspection",
      state: { id: pathid },
    });
  };

  const redirectpagemorecarseller = (pathid) => {
    //e.preventDefault();
    history.push("/MoreCarFromBuyer/" + pathid);
  };

  const redirectpagesimilarcar = (pathid) => {
    //e.preventDefault();
    history.push("/similarCarFromBuyer/" + pathid);
  };
  function copytoclipboard(e) {
    document.execCommand("copy");

    e.target.focus();
    setCopySuccess("Copied!");
  }
  function img1Click(img) {
    loadLrgImg(img.target.src);
  }
  function img2Click(img) {
    console.log("values passed", img);
    console.log("Imgfile", img.target.src);
    loadLrgImg(img.target.src);
  }
  function img3Click(img) {
    loadLrgImg(img.target.src);
  }
  function img4Click(img) {
    loadLrgImg(img.target.src);
  }

  function loadLrgImg(img) {
    setLrgImg(img);
  }

  function CarDetailList() {
    const request = {
      car_id: id,
      buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails"))
        .buyer_dealer_id,
      seller_dealer_id: sellerDealerId,
    };

    API.post("carDetails/condition", request).then((res) => {
      setCarDetail(res.data.data);

      let make = res.data.data[0].make;
      let sellerDealerId = res.data.data[0].seller_dealer_id;

      setDistance(res.data.distance);
      setLrgImg(res.data.data[0].image);
      setLoading(false);

      let rq = {
        buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails"))
          .buyer_dealer_id,
      };
      API.post("BuyerInventoryCarList/condition", rq).then((res) => {
        console.log("response", res.data.data);
        // const {results} = res.data.data;
        //console.log("Response data",res.data.data);
        //if(results.length>0){
        setCarInventoryDetail(res.data.data);
        console.log("car Inventory Detail", res.data.data);
        const req = {
          seller_dealer_id: sellerDealerId,
          buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails"))
            .buyer_dealer_id,
          car_id: id,
        };
        API.post("SellerCarList/condition", req).then((resp) => {
          console.log("response", resp.data.data);
          // const {results} = res.data.data;
          //console.log("Response data",res.data.data);
          //if(results.length>0){
          setSellerCarDetail(resp.data.data);
          console.log("Seller car Inventory Detail", resp.data.data);
          //}
        });
        const req_samecar = {
          make: make,
          buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails"))
            .buyer_dealer_id,
          seller_dealer_id: sellerDealerId,
        };
        console.log("other dealer car req", req_samecar);
        API.post("OtherDealerCarList/condition", req_samecar).then(
          (response) => {
            console.log("otherdealercar list", response.data.data);
            setOtherDealerCarDetail(response.data.data);
            console.log("other dealer car req", req_samecar);
            console.log("otherdealercar list", response.data.data);
          }
        );
        //}
      });

      //}
    });
  }
  function BuyerInventoryCarDetailList() {}

  useEffect(() => {
    CarDetailList();
  }, [id, highBid]);

  useEffect(() => {
    let intervalId;
    intervalId = setInterval(() => {
      CarDetailList();
      getPrivileges();
    }, 30000);
    return () => clearInterval(intervalId);
  }, []);

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

      if (flag === "morecar") {
        setMoreCarFlag(!moreCarFlag);
      } else if (flag === "SimilarCarFromSellerFlag") {
        setSimilarCarFromSellerFlag(!similarCarFromSellerFlag);
      }
    });
  };

  useEffect(() => {
    //BuyerInventoryCarDetailList();
    CarDetailList();
  }, [moreCarFlag, similarCarFromSellerFlag]);

  const config = {
    background: "#f5f5f5",
    displayValue: false,
    marginTop: "20px",
    marginBottom: "20px",
    fontOptions: "italic",
    width: 2,
    heigth: 5,
  };

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

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <main id="main" class="inner-page-cars carDetailsPage">
          <div id="products-details" class="products-details">
            <div class="container">
              <div class="back-btn">
                <a class="back-btn-primary" onClick={() => history.goBack()}>
                  <i class="bx bx-chevron-left"></i> Back
                </a>
              </div>

              <div class="row">
                {carDetail.length > 0 && (
                  <div
                    className={
                      (carDetail[0].buyer_high_bid == "" ||
                        carDetail[0].buyer_high_bid == null ||
                        carDetail[0].buyer_high_bid == undefined) &&
                      (carDetail[0].high_bid == "" ||
                        carDetail[0].high_bid == null ||
                        carDetail[0].high_bid == undefined)
                        ? "col-md-5"
                        : "col-md-5"
                    }
                  >
                    <div class="vehicle-detail-banner banner-content clearfix">
                      <div class="banner-slider">
                        <div class="slider slider-for">
                          <div class="slider-banner-image">
                            <img src={lrgImg} alt="no image" />
                          </div>
                        </div>
                        <div class="slider slider-nav thumb-image">
                          {carDetail.length > 1 ? (
                            <div class="thumbnail-image">
                              <div class="thumbImg">
                                <img
                                  src={carDetail[1].image}
                                  alt=""
                                  onClick={img1Click}
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {carDetail.length > 2 ? (
                            <div class="thumbnail-image">
                              <div class="thumbImg">
                                <img
                                  src={carDetail[2].image}
                                  alt=""
                                  onClick={img2Click}
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {carDetail.length > 3 ? (
                            <div class="thumbnail-image">
                              <div class="thumbImg">
                                <img
                                  src={carDetail[3].image}
                                  alt=""
                                  onClick={img3Click}
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {carDetail.length > 4 ? (
                            <div class="thumbnail-image">
                              <div class="thumbImg">
                                <img
                                  src={carDetail[4].image}
                                  alt=""
                                  onClick={img4Click}
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {carDetail.length > 0 && (
                  <div
                    className={
                      (carDetail[0].buyer_high_bid == "" ||
                        carDetail[0].buyer_high_bid == null ||
                        carDetail[0].buyer_high_bid == undefined) &&
                      (carDetail[0].high_bid == "" ||
                        carDetail[0].high_bid == null ||
                        carDetail[0].high_bid == undefined)
                        ? "col-md-4"
                        : "col-md-4"
                    }
                  >
                    <div class="product-dtl">
                      <div class="product-info">
                        <div class="product-name">
                          {carDetail[0].year} {carDetail[0].make}{" "}
                          {carDetail[0].model}{" "}
                        </div>
                        <p class="productdes">
                          <span className="greytext">Inventory #</span> -{" "}
                          {carDetail[0].inventory_no}
                        </p>
                        <p class="productdes">{carDetail[0].car_description}</p>
                        <div class="d-flex align-items-center">
                          <p class="details">
                            <img src={speedometer} alt="" />
                            <span>{carDetail[0].miles} m</span>
                          </p>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <p class="details">
                            <img src={gasolinePump} alt="" />
                            <span>{carDetail[0].fuel_type}</span>
                          </p>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <div class="product-count">
                              <h3>{carDetail[0].dealer_type}</h3>
                              <div class=" d-flex align-items-center mb-3">
                                <p class="details">
                                  <img src={Path} alt="" />
                                  <span>{carDetail[0].seller_location}</span>
                                </p>

                                <p class="details">
                                  <img
                                    src="assets/img/road-with-broken-line.svg"
                                    alt=""
                                  />
                                  <span>{distance} M</span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="product-count carBrand">
                              <img src={carDetail[0].seller_logo} alt="" />
                            </div>
                          </div>
                        </div>

                        {carDetail[0].announcement == "" ||
                        carDetail[0].announcement == null ||
                        carDetail[0].announcement == undefined ? (
                          <p>
                            <span class="dealertaglines">Announcement -</span>{" "}
                            No Message
                          </p>
                        ) : (
                          <p>
                            <span class="dealertaglines">Announcement -</span>{" "}
                            {carDetail[0].announcement}
                          </p>
                        )}

                        {carDetail[0].dealer_message == "" ||
                        carDetail[0].dealer_message == null ||
                        carDetail[0].dealer_message == undefined ? (
                          <p>
                            <span class="dealertaglines">
                              Message From The Dealer-
                            </span>{" "}
                            No Message
                          </p>
                        ) : (
                          <p>
                            <span class="dealertaglines">
                              Message From The Dealer-
                            </span>{" "}
                            {carDetail[0].dealer_message}
                          </p>
                        )}
                      </div>

                      <div class="row">
                        <div class="col-md-12 carpoints">
                          <div className="label">VIN # -</div>
                          <div class="carpoint">
                            <img src={car} alt="" />
                            <span>{carDetail[0].vin_no}</span>
                            <CopyToClipboard
                              text={carDetail[0].vin_no}
                              onCopy={() => setCopied(true)}
                            >
                              <span
                                title="Copy"
                                onClick={copytoclipboard}
                                className="copyImg"
                              >
                                <i class="icofont-copy"></i>
                              </span>
                            </CopyToClipboard>

                            {/* <img src={book} onClick={copytoclipboard} alt=""/>  */}
                            <span className="barCodeIcon">
                              <img
                                src={barcode}
                                alt=""
                                onMouseEnter={() => setIsShown(true)}
                                onMouseLeave={() => setIsShown(false)}
                              />{" "}
                            </span>

                            {/* <img ref={inputRef}  alt=""/> */}
                          </div>

                          {isShown && (
                            <div class="barCodeDiv">
                              <Barcode
                                value={carDetail[0].vin_no}
                                {...config}
                              />
                            </div>
                          )}

                          {/* {copied ? <p>Copied !</p> : ""} */}
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-12">
                          <div class="titlestatus mt-3">
                            <p>
                              <img src={book} alt="" />
                              <span>Title status</span> -
                              {carDetail[0].title_status}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12 cars-detail-ins">
                          <div class="cars-detail-views">
                            <a
                              class="car-btns carcheck"
                              onClick={() =>
                                redirecttoInspection(carDetail[0].car_id)
                              }
                            >
                              View Inspection
                            </a>
                            <img src={carcheck} alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div class="col-md-3">
                  {carDetail[0].noofBuyer == "" ||
                  carDetail[0].noofBuyer == null ||
                  carDetail[0].noofBuyer == undefined ? (
                    ""
                  ) : (
                    <div>
                      <p className="offerMade">
                        Number of Bids {carDetail[0].noofBuyer}{" "}
                      </p>
                    </div>
                  )}
                  {(carDetail[0].buyer_high_bid == "" ||
                    carDetail[0].buyer_high_bid == null ||
                    carDetail[0].buyer_high_bid == undefined) &&
                  (carDetail[0].high_bid == "" ||
                    carDetail[0].high_bid == null ||
                    carDetail[0].high_bid == undefined) ? (
                    ""
                  ) : (
                    <div className="offerDetailsBlock">
                      <div className="offerDetail">
                        {carDetail[0].buyer_high_bid == "" ||
                        carDetail[0].buyer_high_bid == null ||
                        carDetail[0].buyer_high_bid == undefined ? (
                          ""
                        ) : (
                          <div>
                            <h3>Last Bid</h3>
                            <div className="offerPrice">
                              $ {carDetail[0].buyer_high_bid}
                            </div>
                            <p>
                              by <span>Me</span>
                            </p>

                            {carDetail[0].proxy_status == "yes" ? (
                              <div className="oops">
                                <img src={oops} alt="" />
                                <p>
                                  Oops! Somebody offered that first. Its Tide
                                  Bid, you must bid more
                                </p>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        )}
                      </div>
                      <hr></hr>
                      <div className="offerDetail">
                        {carDetail[0].high_bid == "" ||
                        carDetail[0].high_bid == null ||
                        carDetail[0].high_bid == undefined ? (
                          ""
                        ) : (
                          <div className="left">
                            <h3>High Bid</h3>
                            <div className="offerPrice">
                              $ {carDetail[0].high_bid}
                            </div>
                            {carDetail[0].buyer_high_bid ==
                            carDetail[0].high_bid ? (
                              <p>
                                by <span>Me</span>
                              </p>
                            ) : (
                              <p>
                                by{" "}
                                <span>{carDetail[0].high_bid_buyer_name}</span>
                              </p>
                            )}
                          </div>
                        )}
                        <div class="carBrand">
                          <img src={carDetail[0].high_bid_buyer_logo} alt="" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="buyNowBlock">
                    {priviliges[0]?.buy_now === 0 ? (
                      ""
                    ) : (
                      <>
                        {carDetail[0].buy_it_now == "" ||
                        carDetail[0].buy_it_now == null ||
                        carDetail[0].buy_it_now == undefined ||
                        carDetail[0].buy_it_now == 0 ? (
                          ""
                        ) : (
                          <a
                            className={`${
                              lateFeeValue > 0 && "buy-it-disable-btn"
                            } car-btns-primary buyitBtn`}
                            href="JavaScript:void(0)"
                            onClick={() =>
                              lateFeeValue === 0 &&
                              setBuyItNowValue(
                                carDetail[0].buy_it_now,
                                carDetail[0].car_id,
                                carDetail[0].image,
                                carDetail[0].model,
                                carDetail[0].make,
                                carDetail[0].year,
                                carDetail[0].price,
                                carDetail[0].transportation,
                                carDetail[0].transportation_charge,
                                carDetail[0].lot_fee,
                                carDetail[0].credit_limit,
                                carDetail[0].seller_dealer_id
                              )
                            }
                          >
                            <i class="icofont-tag"></i> Buy it Now :
                            <span> $ {carDetail[0].buy_it_now}</span>
                          </a>
                        )}{" "}
                      </>
                    )}

                    {(carDetail[0].buyer_high_bid == carDetail[0].high_bid ||
                      carDetail[0].buyer_high_bid !==
                        carDetail[0].high_bid) && (
                      <div
                        class={
                          carDetail[0].time !== null && carDetail[0].time < 20
                            ? "countownBlock"
                            : ""
                        }
                      >
                        <Countdown
                          date={
                            Date.now() +
                            (carDetail[0].time !== null &&
                            carDetail[0].time < 20
                              ? carDetail[0].time * 60 * 1000
                              : 0)
                          }
                          renderer={renderer}
                        />
                      </div>
                    )}

                    <div class="makeBidBtn">
                      {priviliges[0]?.bid == 0 ? (
                        ""
                      ) : (
                        <>
                          {(carDetail[0].isbuyercounterbid == "me" &&
                            carDetail[0].iscounterbid !== null &&
                            (carDetail[0].time !== 0 ||
                              carDetail[0].time !== null)) ||
                          ((carDetail[0].iscounterbid == null ||
                            carDetail[0].iscounterbid == "no") &&
                            (carDetail[0].isbuyercounterbid == null ||
                              carDetail[0].isbuyercounterbid == "not") &&
                            (carDetail[0].time == 0 ||
                              carDetail[0].time == null)) ? (
                            <div class="cars-buy">
                              <a
                                className={`${
                                  lateFeeValue > 0 && "buy-it-disable-btn"
                                } cars-buy-btns-primary`}
                                href="JavaScript:void(0)"
                                onClick={() =>
                                  lateFeeValue === 0 &&
                                  setMakeBitValue(
                                    carDetail[0].high_bid,
                                    carDetail[0].min_price,
                                    carDetail[0].save_purchase,
                                    carDetail[0].car_id,
                                    carDetail[0].time,
                                    carDetail[0].counterbuyerid,
                                    carDetail[0].max_price,
                                    carDetail[0].buy_it_now,
                                    carDetail[0].comments,
                                    carDetail[0].transportation,
                                    carDetail[0].display,
                                    carDetail[0].proxy_bid,
                                    carDetail[0].transportation_charge,
                                    carDetail[0].save_policy,
                                    carDetail[0].credit_limit,
                                    carDetail[0].lot_fee,
                                    carDetail[0].image,
                                    carDetail[0].model,
                                    carDetail[0].make,
                                    carDetail[0].year,
                                    carDetail[0].seller_dealer_id
                                  )
                                }
                              >
                                Make Bid
                              </a>
                            </div>
                          ) : (
                            <div class="carpoint lockedcar">
                              {" "}
                              <a class="cars-buy-btns-primary">
                                Locked up for Higher Bid{" "}
                              </a>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {carDetail.length > 0 && (
            <div id="carspecifation" class="carspecifation">
              <div class="container">
                <div class="carspecifationblock col-lg-12">
                  <div class="section-title">
                    <h2>Car Specification</h2>
                  </div>
                  <div class="row content">
                    <div class="col-lg-2">
                      <div class="specifati">
                        <p>
                          <img src={transmission} /> <span>Transmission</span>
                        </p>
                        <p>
                          <img src={drivetrain} /> <span>Drivetrain</span>
                        </p>
                        <p>
                          <img src={gasolinePump} /> <span>Fuel Type</span>
                        </p>
                      </div>
                    </div>
                    <div class="col-lg-2">
                      <div class="specifati2">
                        <p>{carDetail[0].transmission_types}</p>
                        <p>{carDetail[0].drivetrain}</p>
                        <p>{carDetail[0].fuel_type}</p>
                      </div>
                    </div>
                    <div class="col-lg-2">
                      <div class="specifati">
                        <p>
                          <img src={transmission} /> <span>Radio</span>
                        </p>
                        <p>
                          <img src={drivetrain} /> <span>Color</span>
                        </p>
                      </div>
                    </div>
                    <div class="col-lg-2">
                      <div class="specifati2">
                        <p>{carDetail[0].radio_types}</p>
                        <p>{carDetail[0].color}</p>
                      </div>
                    </div>
                    <div class="col-lg-2">
                      <div class="specifati">
                        <p>
                          <img src={gasolinePump} /> <span>Engine</span>
                        </p>
                        <p>
                          <img src={gasolinePump} /> <span>Vehile Type</span>
                        </p>
                      </div>
                    </div>
                    <div class="col-lg-2">
                      <div class="specifati2">
                        <p>{carDetail[0].engine}</p>
                        <p>{carDetail[0].vehicle_types}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div id="dealer-cars" class="dealer-cars">
            <div class="container-fluid aos-init aos-animate">
              {/* <div class="container-fluid aos-init aos-animate" data-aos="fade-up"> */}
              <div class="section-title">
                <h2>More cars from the dealer</h2>
              </div>

              <div
                class="row aos-init aos-animate"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                {sellerCarDetail.length > 0
                  ? sellerCarDetail.slice(0, 4).map((moreCar, index) => (
                      <div class="col-lg-3 col-md-3 col-sm-4 col-xs-6">
                        <div class="car-item">
                          <div class="cars-lock">
                            <img
                              src={moreCar.isFavourite === 0 ? locked : lock}
                              onClick={() =>
                                addRemoveFavourite(
                                  moreCar.car_id,
                                  moreCar.isFavourite,
                                  "morecar"
                                )
                              }
                            />
                          </div>
                          <img
                            src={moreCar.image}
                            onClick={() => {
                              redirectpage(
                                moreCar.car_id,
                                moreCar.seller_dealer_id
                              );
                            }}
                            class="carImg"
                            alt="..."
                          />
                          {moreCar.isbestSale ? (
                            <div class="cars-tag">
                              <h4>{moreCar.deal_name}</h4>
                            </div>
                          ) : (
                            ""
                          )}
                          <div class="cars-content">
                            <h3>
                              <a href="#">
                                {moreCar.year} {moreCar.make} {moreCar.model}{" "}
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
                                <span>{moreCar.miles} m</span>
                              </p>
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              <p className="details">
                                <img
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/images/gasoline-pump.svg"
                                  }
                                  alt=""
                                />
                                <span>{moreCar.fuel_type}</span>
                              </p>
                              <p className="details buyitnow">
                                {priviliges[0]?.buy_now === 0 ? (
                                  ""
                                ) : (
                                  <>
                                    {moreCar.buy_it_now == "" ||
                                    moreCar.buy_it_now == null ||
                                    moreCar.buy_it_now == undefined ||
                                    moreCar.buy_it_now == 0 ? (
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
                                            moreCar.buy_it_now,
                                            moreCar.car_id,
                                            moreCar.image,
                                            moreCar.model,
                                            moreCar.make,
                                            moreCar.year,
                                            moreCar.price,
                                            moreCar.transportation,
                                            moreCar.transportation_charge,
                                            moreCar.lot_fee,
                                            moreCar.credit_limit,
                                            moreCar.seller_dealer_id
                                          )
                                        }
                                      >
                                        Buy It Now $ {moreCar.buy_it_now}
                                      </a>
                                    )}
                                  </>
                                )}
                              </p>
                            </div>

                            <div className="d-flex align-items-center mb-3 dealerType">
                              <p className="details">
                                <span className="dlrname">
                                  {moreCar.dealer_type}{" "}
                                </span>
                                <span className="dlraddress">
                                  <i class="icofont-google-map"></i>{" "}
                                  {moreCar.location}
                                </span>
                              </p>
                              <p className="details">
                                <img src={moreCar.logo} />
                              </p>
                            </div>
                            <div class="cars-prices">
                              {/* <a className="cta-btns" href="#">Inventory Number {moreCar.inventory_no}</a> */}

                              {moreCar.high_bid == "" ||
                              moreCar.high_bid == null ||
                              moreCar.high_bid == undefined ? (
                                ""
                              ) : (
                                <a className="cta-btns" href="#">
                                  High Bid $ {moreCar.high_bid}
                                </a>
                              )}
                              {/* {moreCar.buy_it_now=="" || moreCar.buy_it_now== null || moreCar.buy_it_now== undefined?"":
					<a className="cta-btns" href="#">Counter Bid $ {moreCar.buy_it_now}</a>
					} */}
                              {priviliges[0]?.bid == 0 ? (
                                ""
                              ) : (
                                <>
                                  {(moreCar.isbuyercounterbid == "me" &&
                                    moreCar.iscounterbid !== null &&
                                    (moreCar.time !== 0 ||
                                      moreCar.time !== null)) ||
                                  ((moreCar.iscounterbid == null ||
                                    moreCar.iscounterbid == "no") &&
                                    (moreCar.isbuyercounterbid == null ||
                                      moreCar.isbuyercounterbid == "not") &&
                                    (moreCar.time == 0 ||
                                      moreCar.time == null)) ? (
                                    <a
                                      className={`${
                                        lateFeeValue > 0 && "buy-it-disable-btn"
                                      } cta-btns-primary`}
                                      href="JavaScript:void(0)"
                                      onClick={() =>
                                        lateFeeValue === 0 &&
                                        setMakeBitValue(
                                          moreCar.high_bid,
                                          moreCar.min_price,
                                          moreCar.save_purchase,
                                          moreCar.car_id,
                                          moreCar.time,
                                          moreCar.counterbuyerid,
                                          moreCar.max_price,
                                          moreCar.buy_it_now,
                                          moreCar.comments,
                                          moreCar.transportation,
                                          moreCar.display,
                                          moreCar.proxy_bid,
                                          moreCar.transportation_charge,
                                          moreCar.save_policy,
                                          moreCar.credit_limit,
                                          moreCar.lot_fee,
                                          moreCar.image,
                                          moreCar.make,
                                          moreCar.model,
                                          moreCar.year,
                                          moreCar.seller_dealer_id
                                        )
                                      }
                                    >
                                      Make Bid
                                    </a>
                                  ) : (
                                    <a class="cta-btns">
                                      Locked up for Higher Bid{" "}
                                    </a>
                                  )}
                                </>
                              )}

                              {(moreCar.buyer_high_bid == moreCar.high_bid ||
                                moreCar.buyer_high_bid !==
                                  moreCar.high_bid) && (
                                <div
                                  class={
                                    moreCar.time !== null && moreCar.time < 20
                                      ? "countownBlock"
                                      : ""
                                  }
                                >
                                  <Countdown
                                    date={
                                      Date.now() +
                                      (moreCar.time !== null &&
                                      moreCar.time < 20
                                        ? moreCar.time * 60 * 1000
                                        : 0)
                                    }
                                    renderer={renderer}
                                  />
                                </div>
                              )}

                              {/* <a class="cta-btns-primary" onClick={()=>setMakeBitValue(moreCar.high_bid, moreCar.min_price, moreCar.save_purchase, moreCar.car_id, moreCar.time, moreCar.counter_buyer_dealer_id, moreCar.max_price, moreCar.buy_it_now,moreCar.comments,moreCar.transportation,moreCar.display,moreCar.proxy_bid,moreCar.transportation_charge,moreCar.save_policy)}>Make Bid</a> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : ""}
              </div>
              {sellerCarDetail.length > 4
                ? sellerCarDetail.slice(0, 1).map((moreCar, index) => (
                    <div class="text-center">
                      <a
                        href="JavaScript:void(0)"
                        onClick={() => {
                          redirectpagemorecarseller(moreCar.seller_dealer_id);
                        }}
                        class="more-btn"
                      >
                        View More<i class="bx bx-chevron-right"></i>
                      </a>
                    </div>
                  ))
                : ""}
            </div>
          </div>

          <div id="other-dealer-cars" class="other-dealer-cars">
            <div
              class="container-fluid aos-init aos-animate"
              data-aos="fade-up"
            >
              <div class="section-title">
                <h2>Similar Car From Other Dealer</h2>
              </div>

              <div
                class="row aos-init aos-animate"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                {otherDealerCarDetail.length > 0
                  ? otherDealerCarDetail.map((moreCar, index) => (
                      <div class="col-lg-3 col-md-3 col-sm-4 col-xs-6">
                        <div class="car-item">
                          <div class="cars-lock">
                            <img
                              src={moreCar.isFavourite === 0 ? locked : lock}
                              onClick={() =>
                                addRemoveFavourite(
                                  moreCar.car_id,
                                  moreCar.isFavourite,
                                  "SimilarCarFromSellerFlag"
                                )
                              }
                            />
                          </div>
                          <img
                            src={moreCar.image}
                            onClick={() => {
                              redirectpage(
                                moreCar.car_id,
                                moreCar.seller_dealer_id
                              );
                            }}
                            class="carImg"
                            alt="..."
                          />

                          <div class="cars-content">
                            <h3>
                              <a href="#">
                                {moreCar.year} {moreCar.make} {moreCar.model}
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
                                <span>{moreCar.miles} m</span>
                              </p>
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              <p className="details">
                                <img
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/images/gasoline-pump.svg"
                                  }
                                  alt=""
                                />
                                <span>{moreCar.fuel_type}</span>
                              </p>
                              <p className="details buyitnow">
                                {priviliges[0]?.buy_now === 0 ? (
                                  ""
                                ) : (
                                  <>
                                    {moreCar.buy_it_now == "" ||
                                    moreCar.buy_it_now == null ||
                                    moreCar.buy_it_now == undefined ||
                                    moreCar.buy_it_now == 0 ? (
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
                                            moreCar.buy_it_now,
                                            moreCar.car_id,
                                            moreCar.image,
                                            moreCar.model,
                                            moreCar.make,
                                            moreCar.year,
                                            moreCar.price,
                                            moreCar.transportation,
                                            moreCar.transportation_charge,
                                            moreCar.lot_fee,
                                            moreCar.credit_limit,
                                            moreCar.seller_dealer_id
                                          )
                                        }
                                      >
                                        Buy It Now $ {moreCar.buy_it_now}
                                      </a>
                                    )}
                                  </>
                                )}
                              </p>
                            </div>
                            <div className="d-flex align-items-center mb-3 dealerType">
                              <p className="details">
                                <span className="dlrname">
                                  {moreCar.dealer_type}{" "}
                                </span>
                                <span className="dlraddress">
                                  <i class="icofont-google-map"></i>{" "}
                                  {moreCar.location}
                                </span>
                              </p>
                              <p className="details">
                                <img src={moreCar.logo} />
                              </p>
                            </div>

                            <div class="cars-prices">
                              {moreCar.high_bid == "" ||
                              moreCar.high_bid == null ||
                              moreCar.high_bid == undefined ? (
                                ""
                              ) : (
                                <a className="cta-btns" href="#">
                                  High Bid $ {moreCar.high_bid}
                                </a>
                              )}
                              {/* {moreCar.buy_it_now=="" || moreCar.buy_it_now== null || moreCar.buy_it_now== undefined?"":
									<a className="cta-btns" href="#">Counter Bid $ {moreCar.buy_it_now}</a>
									} */}
                              {priviliges[0]?.bid == 0 ? (
                                ""
                              ) : (
                                <>
                                  {(moreCar.isbuyercounterbid == "me" &&
                                    moreCar.iscounterbid !== null &&
                                    (moreCar.time !== 0 ||
                                      moreCar.time !== null)) ||
                                  ((moreCar.iscounterbid == null ||
                                    moreCar.iscounterbid == "no") &&
                                    (moreCar.isbuyercounterbid == null ||
                                      moreCar.isbuyercounterbid == "not") &&
                                    (moreCar.time == 0 ||
                                      moreCar.time == null)) ? (
                                    <a
                                      className={`${
                                        lateFeeValue > 0 && "buy-it-disable-btn"
                                      } cta-btns-primary`}
                                      href="JavaScript:void(0)"
                                      onClick={() =>
                                        lateFeeValue === 0 &&
                                        setMakeBitValue(
                                          moreCar.high_bid,
                                          moreCar.min_price,
                                          moreCar.save_purchase,
                                          moreCar.car_id,
                                          moreCar.time,
                                          moreCar.counter_buyer_dealer_id,
                                          moreCar.max_price,
                                          moreCar.buy_it_now,
                                          moreCar.comments,
                                          moreCar.transportation,
                                          moreCar.display,
                                          moreCar.proxy_bid,
                                          moreCar.transportation_charge,
                                          moreCar.save_policy,
                                          moreCar.credit_limit,
                                          moreCar.lot_fee,
                                          moreCar.image,
                                          moreCar.make,
                                          moreCar.model,
                                          moreCar.year,
                                          moreCar.seller_dealer_id
                                        )
                                      }
                                    >
                                      Make Bid
                                    </a>
                                  ) : (
                                    <a class="cta-btns">
                                      Locked up for Higher Bid{" "}
                                    </a>
                                  )}
                                </>
                              )}

                              {(moreCar.buyer_high_bid == moreCar.high_bid ||
                                moreCar.buyer_high_bid !==
                                  moreCar.high_bid) && (
                                <div
                                  class={
                                    moreCar.time !== null && moreCar.time < 20
                                      ? "countownBlock"
                                      : ""
                                  }
                                >
                                  <Countdown
                                    date={
                                      Date.now() +
                                      (moreCar.time !== null &&
                                      moreCar.time < 20
                                        ? moreCar.time * 60 * 1000
                                        : 0)
                                    }
                                    renderer={renderer}
                                  />
                                </div>
                              )}

                              {/* <a class="cta-btns-primary" onClick={()=>setMakeBitValue( moreCar.high_bid, moreCar.min_price, moreCar.save_purchase, moreCar.car_id, moreCar.time, moreCar.counter_buyer_dealer_id, moreCar.max_price, moreCar.buy_it_now,moreCar.comments,moreCar.transportation,moreCar.display,moreCar.proxy_bid,moreCar.transportation_charge,moreCar.save_policy)}>Make Bid</a> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : ""}
              </div>
              {otherDealerCarDetail.length > 4
                ? otherDealerCarDetail.slice(0, 1).map((moreCar, index) => (
                    <div class="text-center">
                      <a
                        href="#"
                        class="more-btn"
                        onClick={() => {
                          redirectpagesimilarcar(carDetail[0].make);
                        }}
                      >
                        View More<i class="bx bx-chevron-right"></i>
                      </a>
                    </div>
                  ))
                : ""}
            </div>
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

          {open && (
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
export default Cardetail;

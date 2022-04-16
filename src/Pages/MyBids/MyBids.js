import React from "react";
import speedometer from "../../assets/img/speedometer.svg";
import gasolinePump from "../../assets/img/gasolinePump.svg";
import car from "../../assets/img/car.svg";
import persent from "../../assets/img/persent.svg";
import roadwithBrokenLine from "../../assets/img/roadwithBrokenLine.svg";
import carbrid from "../../assets/img/carbrid.jpg";
import Path from "../../assets/img/Path.svg";
import carshonda from "../../assets/img/carshonda.jpg";
import appstore from "../../assets/img/appstore.png";
import googleplay from "../../assets/img/googleplay.png";
import API from "../../Services/BaseService";
import { useState, useEffect } from "react";
import Loading from "../../Component/Loading/Loading";
import Popup from "../../Component/Popup/Popup";
import Makeurbid from "../Makeurbid";
import BuyItNow from "../../Pages/BuyItNow/BuyItNow";
import { useHistory } from "react-router-dom";
import Countdown from "react-countdown";
import CommonPopup from "../../Component/CommonPopup/CommonPopup";
import checkImg from "../../assets/img/check.svg";
import errorImg from "../../assets/img/erroricon.png";
import CancelBid from "./CancelBid";
import LateFee from "../../Pages/LateFee/LateFee";
import ls from "local-storage";

const MyBids = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [myBids, setMyBids] = useState("");
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [makeBitData, setMakeBitData] = useState({});
  const [highBid, setHighBid] = useState(null);
  const [buyItNowData, setBuyItNowData] = useState({});
  let userDetails = ls.get("userDetails");

  const [cancelBidData, setCancelBidData] = useState({});
  const [alertmessage, setAlertMessage] = useState("");
  const [alerttitle, setAlertTitle] = useState("");
  const [alertimg, setAlertImg] = useState("");
  const [toggleAcceptPopupOpen, setToggleAcceptPopupOpen] = useState(true);

  const [cancelBidOpen, setCancelBidOpen] = useState(false);

  const [isLateFee, setIsLateFee] = useState(false);
  const [lateFeeValue, setLateFeeValue] = useState(0);

  const [priviliges, setPriviliges] = useState("");

  const toggleLateFee = () => {
    setIsLateFee(!isLateFee);
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
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

  const Completion = () => <span>{""}</span>;

  const render = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completion />;
    } else {
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  async function fetchMyBids() {
    let request = {
      buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails"))
        .buyer_dealer_id,
    };
    const state = API.post("mybids/condition", request);
    state
      .then((res) => {
        setMyBids(res.data.data);
        setLoading(false);
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchMyBids();
  }, [highBid]);

  useEffect(() => {
    let intervalId;
    intervalId = setInterval(() => {
      fetchMyBids();
    }, 30000);
    return () => clearInterval(intervalId);
  }, []);

  const toggleMakeBid = () => {
    setIsOpen(!isOpen);
  };

  // const cancelBid=(car_id)=>{
  //     let request = {
  //         buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,
  //         car_id:car_id
  //     };
  //     console.log("========>",request)
  //     const state = API.post('cancelbid/update', request);
  //     state.then(res => {

  //         if(res.data.data.success){
  //             const { data } = res;
  //             console.log("response", res)
  //             setToggleAcceptPopupOpen(false);
  //             setAlertImg(checkImg);
  //             setAlertTitle("Thank you")
  //             setAlertMessage("You have successfully done this deal thank you for your business with Urs second lot")

  //         } else {
  //             const { data } = res;
  //             setToggleAcceptPopupOpen(false);
  //             setAlertImg(errorImg);
  //             setAlertMessage(data.error.err)
  //         }
  //     })
  // }

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
      redirectPage: "mybids",
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
  const getMakeBitValue = (data) => {
    const highBid = data;
    setHighBid(highBid);
  };
  const redirectpage = (pathid, seller_dealer_id) => {
    history.push({
      pathname: "/cardetail",
      state: { id: pathid, sellerDealerId: seller_dealer_id },
    });
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

  const toggleCancelBid = () => {
    setCancelBidOpen(!cancelBidOpen);
  };

  const getCancelBidValue = (data) => {
    const highBid = data;
    setHighBid(highBid);
  };

  const setCancelBidValue = (car_id, image, model, make, year) => {
    setCancelBidData({
      carId: car_id,
      image: image,
      model: model,
      make: make,
      year: year,
    });

    toggleCancelBid();
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

  return (
    <main id="main" class="inner-page myBidsPage">
      <div id="mybids" class="mybids">
        <div class="container">
          {loading ? (
            <Loading />
          ) : (
            <div class="mybidsblock col-lg-12">
              <div class="section-title">
                <h2>My Bids</h2>
              </div>
              <div class="row mybidsheader">
                <div class="col-lg-3">
                  <h5>Vehicle</h5>
                </div>
                <div class="col-lg-3">
                  <h5>Seller</h5>
                </div>
                <div class="col-lg-2">
                  <h5>Best Bid</h5>
                </div>
                <div class="col-lg-2">
                  <h5>Buy Now</h5>
                </div>
                <div class="col-lg-2">
                  <h5>Control Your Bid</h5>
                </div>
              </div>

              {myBids?.map((bidsObj) => (
                <div class="row mybidsdetailsblock">
                  <div
                    class="col-lg-3 mybidsvehicledetails"
                    onClick={() => {
                      redirectpage(bidsObj.car_id, bidsObj.seller_dealer_id);
                    }}
                  >
                    <div class="mybidsleftvehicle">
                      <img src={bidsObj?.image} class="img-fluid" alt="..." />
                    </div>
                    <div class="mybidsrightvehicle">
                      <h3>
                        {bidsObj?.year} {bidsObj?.make} {bidsObj?.model}{" "}
                      </h3>
                      <div class="d-flex align-items-center">
                        <p class="details">
                          <img src={speedometer} alt="" />
                          <span>{bidsObj?.miles} m</span>
                        </p>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <p class="details">
                          <img src={gasolinePump} alt="" />
                          <span>{bidsObj?.fuel_type}</span>
                        </p>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                      </div>
                      <p class="details">
                        <img src={car} alt="" />
                        <span>{bidsObj?.vin_no}</span>
                      </p>
                      <p class="details">
                        <span>Inventory Number- {bidsObj?.inventory_no}</span>
                      </p>
                      <p class="details">
                        <span> {bidsObj?.date}</span>
                      </p>
                    </div>
                  </div>
                  <div class="col-lg-3 mybidssellerdetails">
                    <div class="mybidsleftseller">
                      <h3>Used Car Dealer</h3>
                      <p class="details">
                        <img src={Path} alt="" />
                        <span>{bidsObj?.address}</span>
                      </p>
                      <div class="d-flex align-items-center">
                        {/* <p class="details"><img src={persent} alt="" /><span>15%</span></p>&nbsp;&nbsp;&nbsp;&nbsp; */}
                        <p class="details">
                          <img src={roadwithBrokenLine} alt="" />
                          <span>{bidsObj?.mileage}M</span>
                        </p>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                      </div>
                    </div>
                    <div class="mybidsrightseller">
                      <img
                        src={bidsObj?.seller_logo}
                        class="img-fluid"
                        alt="..."
                      />
                    </div>
                  </div>
                  <div class="col-lg-2 mybidsbiddetails">
                    <div class="mybidsbid">
                      <h4>${bidsObj?.high_bid}</h4>
                      {/* <p>Car seller</p> */}
                      {bidsObj?.buyer_high_bid == bidsObj?.high_bid ? (
                        <p>
                          by <span>Me</span>
                        </p>
                      ) : (
                        <p>
                          by <span>{bidsObj?.high_bid_buyer_name}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  <div class="col-lg-2 mybidsbuynowdetails">
                    <div class="mybidsuynow">
                      {bidsObj?.buy_it_now !== "" ? (
                        <h4>$ {bidsObj?.buy_it_now}</h4>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div class="col-lg-2 mybidscontroldetails">
                    {(bidsObj?.isbuyercounterbid == "me" &&
                      bidsObj?.iscounterbid !== null &&
                      (bidsObj?.time !== 0 || bidsObj?.time !== null)) ||
                    ((bidsObj?.iscounterbid == null ||
                      bidsObj.iscounterbid == "no") &&
                      (bidsObj.isbuyercounterbid == null ||
                        bidsObj.isbuyercounterbid == "not") &&
                      (bidsObj.time == 0 || bidsObj.time == null)) ? (
                      <div class="mybidscontrol">
                        {priviliges[0]?.bid == 0 ? (
                          ""
                        ) : (
                          <>
                            <a
                              className={`${
                                lateFeeValue > 0 && "buy-it-disable-btn"
                              } cta-btns-primary redBtn`}
                              href="JavaScript:void(0)"
                              onClick={() =>
                                setMakeBitValue(
                                  bidsObj.high_bid,
                                  bidsObj.min_price,
                                  bidsObj.save_purchase,
                                  bidsObj.car_id,
                                  bidsObj.time,
                                  bidsObj.counter_buyer_dealer_id,
                                  bidsObj.max_price,
                                  bidsObj.buy_it_now,
                                  bidsObj.comments,
                                  bidsObj.transportation,
                                  bidsObj.display,
                                  bidsObj.proxy_bid,
                                  bidsObj.transportation_charge,
                                  bidsObj.save_policy,
                                  bidsObj.credit_limit,
                                  bidsObj.lot_fee,
                                  bidsObj.image,
                                  bidsObj.model,
                                  bidsObj.make,
                                  bidsObj.year,
                                  bidsObj.seller_dealer_id
                                )
                              }
                            >
                              Raise Bid
                            </a>
                          </>
                        )}
                        {priviliges[0]?.bid == 0 ? (
                          ""
                        ) : (
                          <>
                            {bidsObj?.buy_it_now !== "" ? (
                              <a
                                className={`${
                                  lateFeeValue > 0 && "buy-it-disable-btn"
                                } cta-btns greenBtn`}
                                href="JavaScript:void(0)"
                                onClick={() =>
                                  setBuyItNowValue(
                                    bidsObj.buy_it_now,
                                    bidsObj.car_id,
                                    bidsObj.image,
                                    bidsObj.model,
                                    bidsObj.make,
                                    bidsObj.year,
                                    bidsObj.price,
                                    bidsObj.transportation,
                                    bidsObj.transportation_charge,
                                    bidsObj.lot_fee,
                                    bidsObj.credit_limit,
                                    bidsObj.seller_dealer_id
                                  )
                                }
                              >
                                Accept Bid
                              </a>
                            ) : (
                              ""
                            )}
                          </>
                        )}

                        {bidsObj?.cancel_bid_time !== null &&
                        bidsObj?.cancel_bid_time !== 0 &&
                        bidsObj?.cancel_bid_time < 400 ? (
                          <div>
                            <a class="control-btns-cancel" disabled>
                              Cancel Bid Activate After Some Times
                            </a>
                            <div
                              class={
                                bidsObj?.cancel_bid_time !== null &&
                                bidsObj?.cancel_bid_time !== 0 &&
                                bidsObj?.cancel_bid_time < 400
                                  ? "countownBlock"
                                  : ""
                              }
                            >
                              <Countdown
                                date={
                                  Date.now() +
                                  (bidsObj?.cancel_bid_time !== null &&
                                  bidsObj?.cancel_bid_time < 400
                                    ? bidsObj?.cancel_bid_time * 60 * 1000
                                    : 0)
                                }
                                renderer={render}
                              />
                            </div>
                          </div>
                        ) : (
                          <div>
                            {priviliges[0]?.bid == 0 ? (
                              <a
                                class="control-btns-cancel"
                                onClick={() =>
                                  setCancelBidValue(
                                    bidsObj.car_id,
                                    bidsObj.image,
                                    bidsObj.model,
                                    bidsObj.make,
                                    bidsObj.year
                                  )
                                }
                              >
                                Cancel Bid
                              </a>
                            ) : (
                              ""
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div class="mybidscontrol">
                        <a class="control-btns-cancel">
                          Locked up for Higher Bid
                        </a>
                        {bidsObj?.cancel_bid_time !== null &&
                        bidsObj?.cancel_bid_time !== 0 &&
                        bidsObj?.cancel_bid_time < 300 ? (
                          <div>
                            <a class="control-btns-cancel" diabled>
                              Cancel Bid Activate After Some Times
                            </a>
                            <div
                              class={
                                bidsObj?.cancel_bid_time !== null &&
                                bidsObj?.cancel_bid_time !== 0 &&
                                bidsObj?.cancel_bid_time < 300
                                  ? "countownBlock"
                                  : ""
                              }
                            >
                              <Countdown
                                date={
                                  Date.now() +
                                  (bidsObj?.cancel_bid_time !== null &&
                                  bidsObj?.cancel_bid_time < 300
                                    ? bidsObj?.cancel_bid_time * 60 * 1000
                                    : 0)
                                }
                                renderer={render}
                              />
                            </div>
                          </div>
                        ) : (
                          <div>
                            <a
                              class="control-btns-cancel"
                              onClick={() =>
                                setCancelBidValue(
                                  bidsObj?.car_id,
                                  bidsObj?.image,
                                  bidsObj?.model,
                                  bidsObj?.make,
                                  bidsObj?.year
                                )
                              }
                            >
                              Cancel Bid
                            </a>
                          </div>
                        )}
                      </div>
                    )}

                    {(bidsObj?.buyer_high_bid == bidsObj?.high_bid ||
                      bidsObj?.buyer_high_bid !== bidsObj?.high_bid) && (
                      <div
                        class={
                          bidsObj?.time !== null && bidsObj?.time < 20
                            ? "countownBlock"
                            : ""
                        }
                      >
                        <Countdown
                          date={
                            Date.now() +
                            (bidsObj?.time !== null && bidsObj?.time < 20
                              ? bidsObj?.time * 60 * 1000
                              : 0)
                          }
                          renderer={renderer}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
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

      {cancelBidOpen && (
        <Popup
          isClose={false}
          content={
            <>
              <CancelBid
                toggle={toggleCancelBid}
                setCancelBidValue={cancelBidData}
                getCancelBidValue={getCancelBidValue}
              />
            </>
          }
          handleClose={toggleCancelBid}
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
  );
};
export default MyBids;

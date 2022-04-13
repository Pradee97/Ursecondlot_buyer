import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ls from "local-storage";
import ManageAccountLinks from "../../Component/ManageAccountLinks/ManageAccountLinks";
import API from "../../Services/BaseService";
import "../../Component/Popup/popup.css";
import CommonPopup from "../../Component/CommonPopup/CommonPopup";
import Loading from "../../Component/Loading/Loading";
import Popup from "../../Component/Popup/Popup";
import LateFee from "../../Pages/LateFee/LateFee";

const LotFee = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMsg, setPopupMsg] = useState("");
  const [popupType, setPopupType] = useState("");
  const [popupActionType, setPopupActionType] = useState("");
  const [popupActionValue, setPopupActionValue] = useState("");
  const [popupActionPath] = useState("");
  const [lotFee, setLotFee] = useState("");
  const [lotValue, setLotValue] = useState("");
  const [lotFeeError, setLotFeeError] = useState("");
  let userDetails = ls.get("userDetails");
  const [loading, setLoading] = useState(true);

  const [isLateFee, setIsLateFee] = useState(false);
  const [lateFeeValue, setLateFeeValue] = useState(0);

  const [priviliges, setPriviliges] = useState("");

  const toggleLateFee = () => {
    setIsLateFee(!isLateFee);
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  async function getLotfee() {
    let request = {
      buyer_dealer_id: userDetails.buyer_dealer_id,
    };
    const state = API.post("lot_fee/condition", request);
    state
      .then((res) => {
        console.log("res", res.data.data);
        setLotValue(res.data.data.lot_fee);
        setLotFee(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getLotfee();
    getlateFee();
  }, []);

  // useEffect(() => {},[lotValue]);
  const updateLotValue = (data) => {
    console.log("---------------", data);
    if (!isNaN(data) && data !== "" && data !== undefined) {
      console.log(data);
      setLotValue(data);
    } else {
      //setLotValue(0)
    }
  };

  const handlesubimt = () => {
    //console.log("check",buyer_id)
    setLotFeeError("");
    let request = {
      buyer_dealer_id: userDetails.buyer_dealer_id,
      lot_fee: lotValue,
      active: 1,
    };
    // if (lotValue === 0) {
    //     setLotFeeError("LotFee must be greater then zero")
    //     return;
    // }
    API.post("lot_fee/add", request).then(
      (response) => {
        console.log("res", response.data.success);
        if (response.data.success) {
          togglePopup();
          setPopupTitle("LotFee Update");
          setPopupMsg("LotFee Successfully Updated");
          setPopupType("success");
          setPopupActionType("close");
          setPopupActionValue("close");
          // setPopupActionPath("/lotfee")
        } else {
          togglePopup();
          setPopupTitle("Create LotFee");
          // setPopupMsg("LotFee is not Created, Please try Again");
          setPopupMsg(response.data.error.err);
          setPopupType("error");
          setPopupActionType("close");
          setPopupActionValue("close");
        }
      },
      (error) => {
        togglePopup();
        setPopupTitle("Error");
        setPopupMsg("Something went wrong, Please try Again");
        setPopupType("error");
        setPopupActionType("close");
        setPopupActionValue("close");
      }
    );
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

  const getPrivileges = () => {
    let request = {
      buyer_id: userDetails.buyer_id,
    };

    API.post("buyerPrivileges/condition", request)
      .then((res) => {
        setPriviliges(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPrivileges();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <main id="main" className="inner-page">
          <div id="lotfee" className="lotfee">
            <div className="container">
              <div className="lotfeeblock col-lg-12">
                <div className="section-title">
                  <h2>Lot Fee</h2>
                </div>
                <div className="row content">
                  <div className="col-lg-3 col-md-4 col-sm-12 accountleftblock">
                    <ManageAccountLinks />
                  </div>
                  <div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 lotfeerightblock">
                    <div className="lotfee-inner">
                      <p>
                        Your expense or your profit added to the vehicle every
                        time you purchase{" "}
                      </p>
                      <div className="form-group col-lg-6 col-md-6 lotfee-form">
                        <div className="input-icon">
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={lotFee.lot_fee}
                            value={lotValue}
                            onChange={(e) =>
                              updateLotValue(Math.round(e.target.value))
                            }
                          />
                          <i>$</i>
                        </div>
                      </div>
                      <p className="form-input-error">{lotFeeError}</p>

                      <div className="col-lg-12 loginBtn">
                        {priviliges.lot_fee === 1 ? (
                          <button className="cta-btn" onClick={handlesubimt}>
                            Submit
                          </button>
                        ) : (
                          ""
                        )}
                        {/* conclick={handlesubimt} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section id="playstoreBlock" className="playstoreBlock">
            <div className="container">
              <div className="row content">
                <div className="col-lg-12">
                  <img src={process.env.PUBLIC_URL + "/images/appstore.png"} />
                  <img
                    src={process.env.PUBLIC_URL + "/images/googleplay.png"}
                  />
                </div>
              </div>
            </div>
          </section>
          {isOpen && (
            <CommonPopup
              handleClose={togglePopup}
              popupTitle={popupTitle}
              popupMsg={popupMsg}
              popupType={popupType}
              popupActionType={popupActionType}
              popupActionValue={popupActionValue}
              popupActionPath={popupActionPath}
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

export default LotFee;

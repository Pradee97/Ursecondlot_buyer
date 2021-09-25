import React from 'react';
import API from "../../Services/BaseService";
import { useHistory, useParams } from "react-router-dom";
import './floorplans.css';
import { useState } from 'react';
import { useEffect } from 'react';
import ls from 'local-storage';
import { Button } from 'antd';
import Loading from "../../Component/Loading/Loading";
const FloorPlans = () => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [floorDetails, setFloorDetails] = useState("");
  let userDetails = ls.get('userDetails');
  async function fetchBuyerFloorPlans() {
    let request = {
      buyer_dealer_id: userDetails.buyer_dealer_id,
    };
    const state = API.post('floor_plan/condition', request);
    state.then(res => {
      console.log("res", res)
      setFloorDetails(res.data.data);
      setLoading(false);
    })
      .catch(err => { console.log(err); });
  }
  function onHandleEdit(e) {
    history.push("/flooredit/" + e);
  }
  useEffect(() => {
    fetchBuyerFloorPlans();
  }, []);

  return (
    <div>
      <main id="main" className="inner-page">


        <div id="floorplans" className="floorplans">
        {loading ? <Loading /> :
          <div className="container">
            <div className="floorplansblock col-lg-12">
              
              <div className="section-title">
                <h2>Floor Plans</h2>
              </div>

              <div className="row content">
                <div className="col-lg-12 floorplanstableblock">
                  <div className="add-floor">
                    {/* <a className="add-floor-btns" href="/flooradd"><i class="icofont-plus"></i>  Add Floor</a> */}
                    <Button autofocus className="add-user-btns" onClick={() => history.push("/FloorAdd")}><i class="icofont-plus"></i><span>Add Floor</span></Button>
                  </div>

                 

                  {floorDetails.length > 0 ? floorDetails.map((item, index) =>
                    <div className="col-lg-12 mt-3 floorplanstableblock">
                      <div className="floorplanstable">
                        
                          <table>
                            <thead>
                              <tr>
                                <th colspan="2" scope="colgroup">Floor plan {index + 1}
                                  <div className="editbutton">
                                    {/* <Button onClick={() => onHandleEdit(item.floor_plan_id)}  >Edit</Button></div></th> */}
                                  </div></th>
                                {/* <a className="editicon" onClick={() => onHandleEdit(item.floor_plan_id)}><Icon type="edit" theme = "filled"/></a></div></th> */}

                              </tr>
                            </thead>
                            <tr>
                              <td>Company Name  <span>{item.company_name} </span></td>
                              <td>Address  <span>{item.address} </span></td>
                            </tr>
                            <tr>
                              <td>Name Contact <span>{item.contact_name}</span></td>
                              <td>Floor Account Number <span>{item.account_no} </span></td>
                            </tr>
                            <tr>
                              <td>Branch Name <span>{item.branch_name}</span></td>
                              {/* <td>Floor Plan Credit Limit <span>$3000</span></td> */}
                              <td>Floor Plan Credit Limit <span>{item.credit_limit}</span></td>
                            </tr>
                            <tr>
                              <td>Email Id<span>{item.email_id}</span></td>
                              <td>Account Opened<span>{item.account_opened}</span></td>
                            </tr>
                            <tr>
                              <td>Phone<span>{item.phone_no}</span></td>
                              <td>Date Opened<span>{item.opened_date}</span></td>
                            </tr>

                          </table>

                      </div>
                    </div>
                    ) : <div className="floor_notfiled_block"><p>Floor Plan is not added yet</p></div>}
                </div>



              </div>
            </div>
          </div>}
        </div>




        <section id="playstoreBlock" className="playstoreBlock">
          <div className="container">


            <div className="row content">
              <div className="col-lg-12">
                <img src={process.env.PUBLIC_URL + "/images/appstore.png"} />
                <img src={process.env.PUBLIC_URL + "/images/googleplay.png"} />

              </div>

            </div>

          </div>
        </section>

      </main>
    </div>
  );
};

export default FloorPlans;

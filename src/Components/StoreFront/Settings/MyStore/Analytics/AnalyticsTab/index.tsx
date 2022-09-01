import axios from 'axios';
import React, { useState } from "react";
import { Row, Col, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { IAnalytics } from '../../../../../../Models/Analytics';
import { BASE_URL } from '../../../../../../Utilities/Util';

const AnalyticsTab = (analytics:IAnalytics) => {
  //@ts-ignore
  const [Analytics, setAnalytics] = useState<IAnalytics>({});
  const handleSave = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/analytics`, analytics);
      if (res) {
        toast.success("Saved Changes");
      } else {
        throw "Failed";
      }
    } catch (err) {
      console.log("err", err);
      if (err.response) {
        toast.error(err.response.data.err);
      } else {
        toast.error(err.message);
      }
    }
  };
  return (
   <div className="">
                                                <div className="row mb-25">
                                                    <div className="col-xs-12">
                                                        <h4>Analytics</h4>
                                                        <p className="">You can use your own analytics platform's code &amp; ids to track the traffic &amp; visitors in your own analytics accounts. To learn about this page please <a href="#">Click here.</a></p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-xs-8">
                                                        <div className="form-group">
                                                            <label className="">Google Analytics (Universal) <span data-tooltip="Google Analytics is a web analytics service offered by Google that tracks and reports website traffic, currently as a platform inside the Google Marketing Platform brand."><i className="i i-info"></i></span></label><br></br>
                                                            <span className="span-description">Please mention your Google's Universal Analytics Code here (eg. UA-89273982)</span>
                                                            <input type="text" className="form-control store-analytics-input" id="google_uaanalytics" data-original="" data-api-param="google_analytics" data-group-key="analytics" value="" name="" placeholder=""/>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-xs-8">
                                                        <div className="form-group">
                                                            <label className="">Google Analytics (GA4) <span data-tooltip="Google Analytics is a web analytics service offered by Google that tracks and reports website traffic, currently as a platform inside the Google Marketing Platform brand."><i className="i i-info"></i></span></label><br></br>
                                                            <span className="span-description">Please mention your Google's GA4 Analytics Code here (eg. G-2938782):</span>
                                                            <input type="text" className="form-control store-analytics-input" id="google_GA4analytics" data-original="" data-api-param="google_GA4analytics" data-group-key="analytics" value="" name="" placeholder=""/>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-xs-8">
                                                        <div className="form-group">
                                                            <label className="">Google Tag Manager (GTM) <span data-tooltip="Use Google Tag Manager to manage tags on your site. Without editing your site code, you use GTM user interface to add and update Google Ads, Google Analytics, Floodlight, and non-Google tags. This reduces errors and allows you to to deploy tags on your site quickly."><i className="i i-info"></i></span></label><br></br>
                                                            <span className="span-description">Please mention your Google's Tag Manager Code here (eg. GTM-WZDE8F):</span>
                                                            <input type="text" className="form-control store-analytics-input" id="analytics_gtm" data-original="" data-api-param="gtm" data-group-key="analytics" value="" name="" placeholder=""/>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-xs-8">
                                                        <div className="form-group">
                                                            <label className="">Mixpanel <span data-tooltip="Mixpanel is a product analytics solution founded in 2009. It helps digital-first businesses understand how customers interact with their web and mobile applications so they can improve their products."><i className="i i-info"></i></span></label><br></br>

                                                            <span className="span-description">Please mention your Mixpanel Token here (eg. 54dd5fe93dc0271a79306693af51c516):</span>
                                                            <input type="text" className="form-control store-analytics-input" id="analytics_mixpanel" data-original="" data-api-param="mixpanel" data-group-key="analytics" value="" name="" placeholder=""/>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-xs-8">
                                                        <div className="form-group">
                                                            <label className="">Facebook Pixel <span data-tooltip="The Facebook pixel is code that you place on your website. It collects data that helps you track conversions from Facebook ads, optimize ads, build targeted audiences for future ads, and remarket to people who have already taken some kind of action on your website."><i className="i i-info"></i></span></label><br></br>
                                                            <span className="span-description">Please mention your Facebook Pixel ID here (eg. 168731178137206):</span>
                                                            <input type="text" className="form-control store-analytics-input" id="analytics_fbpixel" data-original="" data-api-param="fb_pixelid" data-group-key="analytics" value="" name="" placeholder=""/>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row mt-15">
                                                    <div className="col-xs-12">
                                                        <div className="updateSetting">
                                                            <a id="saveAnalyticsSettingsBtn" href="javascript:;" className="commonbtn hide">Save Changes</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            
                                            

  );
}

export default AnalyticsTab;
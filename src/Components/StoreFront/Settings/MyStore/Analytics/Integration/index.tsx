import axios from 'axios';
import React, { useState } from "react";
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { IAnalytics } from '../../../../../Models/Analytics';
import { BASE_URL } from '../../../../../Utilities/Util';

const Integration = (analytics:IAnalytics) => {
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
    <div>
      <Row>
        <Col lg={12}>
          <h4>Integration</h4>
          <p>
            You can use third party tools code &amp; ids to track the traffic
            &amp; visitors avitity in own accounts. To learn about this page
            please <a href="#">Click here.</a>
          </p>
        </Col>
      </Row>

      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12">
          <div className="form-group mt-2">
            <h5 className="h4">
              MailChimp{" "}
              <i
                className="fa fa-info-circle"
                data-target="tooltip"
                title="Mailchimp is the All-In-One integrated marketing platform for small businesses, to grow your business on your terms."
              ></i>
            </h5>
            <span className="span-description">
              Mailchimp is an email marketing &amp; CRM tool that allows users
              to manage contacts during their sales and marketing efforts.
            </span>
          </div>
          <div className="form-group mt-2">
            <label>
              API Key{" "}
              <i
                className="fa fa-info-circle"
                data-target="tooltip"
                title="Provide your api key of mailchimp account."
              ></i>
            </label>
            <input
              type="text"
              id="mailchimp_api_key"
              className="form-control store-integration-input"
              data-original=""
              data-api-param="mailchimp_api"
              data-group-key="integration"
              value=""
              name=""
              placeholder=""
            />
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6">
          <div className="form-group mt-2">
            <label>
              User Account{" "}
              <i
                className="fa fa-info-circle"
                data-target="tooltip"
                title="Fetch Mailchimp list and assign to user account form to push data"
              ></i>
            </label>
            <select
              data-api-param="mailchimp_user_account"
              id="mailchimp_user_account"
              className="form-control store-integration-input"
              data-original=""
              data-group-key="integration"
            >
              <option value="dummy-Do Not Send"> Do Not Send</option>
            </select>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6">
          <div className="form-group mt-2">
            <label>
              Contact Us{" "}
              <i
                className="fa fa-info-circle"
                data-target="tooltip"
                title="Fetch Mailchimp list and assign to Contact Us form to push data"
              ></i>
            </label>
            <select
              data-api-param="mailchimp_contact_us"
              id="mailchimp_contact_us"
              className="form-control store-integration-input"
              data-original=""
              data-group-key="integration"
            >
              <option value="dummy-Do Not Send">Do Not Send</option>
            </select>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6">
          <div className="form-group mt-2">
            <label>
              Subscription Form{" "}
              <i
                className="fa fa-info-circle"
                data-target="tooltip"
                title="Fetch Mailchimp list and assign to subscription form to push data"
              ></i>
            </label>
            <select
              data-api-param="mailchimp_subscription"
              id="mailchimp_subscription"
              className="form-control store-integration-input"
              data-original=""
              data-group-key="integration"
            >
              <option value="dummy-Do Not Send"> Do Not Send</option>
            </select>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6">
          <a
            href="javascript:"
            id="get-mailchimplist"
            className="commonbtn getmailchimplist"
          >
            <span>Click here to fetch Mailchimp List</span>
          </a>
        </div>
      </div>

      <div className="row mt-25">
        <div className="col-xs-12 col-sm-12 col-md-12">
          <div className="form-group mt-4">
            <h5 className="h4">
              Madmimi{" "}
              <i
                className="fa fa-info-circle"
                data-target="tooltip"
                title="Madmimi is an email marketing service founded by Gary Levitt in 2007. It enables users to create, send, and track email campaigns without using templates."
              ></i>
            </h5>
            <span className="span-description">
              Madmimi is an email marketing &amp; CRM tool that allows users to
              manage contacts during their sales and marketing efforts.
            </span>
          </div>
          <div className="form-group mt-2">
            <label>
              Username Or Email{" "}
              <i
                className="fa fa-info-circle"
                data-target="tooltip"
                title="Provide your username or email of your account"
              ></i>
            </label>
            <input
              type="text"
              className="form-control store-integration-input"
              id="madmimi_email"
              data-original=""
              data-api-param="madmimi_email"
              data-group-key="integration"
              value=""
              name=""
              placeholder=""
            />
          </div>
          <div className="form-group mt-2">
            <label>
              API Key{" "}
              <i
                className="fa fa-info-circle"
                data-target="tooltip"
                title="Provide your api key of your madmimi account"
              ></i>
            </label>
            <input
              type="text"
              id="madmimi_api_key"
              className="form-control store-integration-input"
              data-original=""
              data-api-param="madmimi_api"
              data-group-key="integration"
              value=""
              name=""
              placeholder=""
            />
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6">
          <div className="form-group mt-2">
            <label>
              User Account{" "}
              <i
                className="fa fa-info-circle"
                data-target="tooltip"
                title="Fetch Madmimi list and assign to user account form to push data"
              ></i>
            </label>
            <select
              data-api-param="madmimi_user_account"
              id="madmimi_user_account"
              className="form-control store-integration-input"
              data-original=""
              value=""
              data-group-key="integration"
            >
              <option value="Do Not Send">Do Not Send</option>
            </select>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6">
          <div className="form-group mt-2">
            <label>
              Contact Us{" "}
              <i
                className="fa fa-info-circle"
                data-target="tooltip"
                title="Fetch Madmimi list and assign to Contact Us form to push data"
              ></i>
            </label>
            <select
              data-api-param="madmimi_contact_us"
              id="madmimi_contact_us"
              className="form-control store-integration-input"
              data-original=""
              value=""
              data-group-key="integration"
            >
              <option value="Do Not Send">Do Not Send</option>
            </select>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6">
          <div className="form-group mt-2">
            <label>
              Subscription Form{" "}
              <i
                className="fa fa-info-circle"
                data-target="tooltip"
                title="Fetch Madmimi list and assign to subscription form to push data"
              ></i>
            </label>
            <select
              data-api-param="madmimi_subscription"
              id="madmimi_subscription"
              className="form-control store-integration-input"
              data-original=""
              value=""
              data-group-key="integration"
            >
              <option value="Do Not Send">Do Not Send</option>
            </select>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6">
          <a
            href="javascript:"
            id="get-madmimilist"
            className="commonbtn getmadmimilist"
          >
            <span>Click here to fetch Madmimi List</span>
          </a>
        </div>
      </div>

      <div className="row mt-25">
        <div className="col-xs-12 col-sm-12 col-md-12">
          <div className="form-group mt-4">
            <h5 className="h4">
              SendGrid{" "}
              <i
                className="fa fa-info-circle"
                data-target="tooltip"
                title="SendGrid provides a cloud-based service that assists businesses with email delivery.The service manages various types of email including shipping notifications, friend requests, sign-up confirmations, and email newsletters."
              ></i>
            </h5>
            <span className="span-description">
              SendGrid is a cloud-based SMTP provider that allows you to send
              email without having to maintain email servers.{" "}
            </span>
          </div>
          <div className="form-group mt-2">
            <label>
              From Email{" "}
              <i
                className="fa fa-info-circle"
                data-target="tooltip"
                title="Provide your email of your account"
              ></i>
            </label>
            <input
              type="text"
              id="sendgrid_email_id"
              className="form-control store-integration-input"
              data-original=""
              data-api-param="sendgrid_email"
              data-group-key="integration"
              value=""
              name=""
              placeholder=""
            />
          </div>
          <div className="form-group mt-2">
            <label>
              API Key{" "}
              <i
                className="fa fa-info-circle"
                data-target="tooltip"
                title="Provide your api key of your sendgrid account"
              ></i>
            </label>
            <input
              type="text"
              id="sendgrid_api"
              className="form-control store-integration-input"
              data-original=""
              data-api-param="sendgrid_api"
              data-group-key="integration"
              value=""
              name=""
              placeholder=""
            />
          </div>
        </div>
      </div>

      <div className="row mt-25">
        <div className="col-xs-12">
          <div className="updateSetting">
            <a
              id="saveIntegrationSettingsBtn"
              href="javascript:;"
              className="commonbtn hide"
            >
              Save
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Integration;
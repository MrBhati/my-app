import "./App.css";
import { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Input, Button } from "antd";
import axios from "axios";

function App() {
  const [planlist, setPlanlist] = useState([]);
  console.log("planlist: ", planlist);

  useEffect(() => {
    var config = {
      method: "get",
      url: "https://money-india.herokuapp.com/plan-listing",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios(config)
      .then(function (response) {
        setPlanlist(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleSubmit = (value) => {
    const bodyData = {
      price: value.price,
      url: value.url,
    };
    var config = {
      method: "put",
      url: `https://money-india.herokuapp.com/updateplan/${value._id}`,
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
      },
      data: JSON.stringify(bodyData),
    };

    axios(config)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateValue = (urlText, index, item) => {
    let newList = [...planlist];
    newList[index] = { ...item, url: urlText };
    setPlanlist(newList);
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
      }}
    >
      <div style={{ marginTop: "6%", width: "50%", marginLeft: "25%" }}>
        {planlist.length > 0 &&
          planlist.map((item, index) => {
            return (
              <div key={index}>
                <h4>Price {item.price} RS.</h4>
                <Input
                  placeholder="Enter url"
                  value={item.url}
                  onChange={(e) => updateValue(e.target.value, index, item)}
                />
                <Button
                  style={{ marginTop: 20, marginBottom: 20 }}
                  type="primary"
                  htmlType="submit"
                  onClick={() => handleSubmit(item)}
                >
                  Submit
                </Button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;

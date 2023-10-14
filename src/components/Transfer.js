import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle,
  Input,
  InputGroup,
} from "reactstrap";
import Reciept from "./Reciept";

const Transfer = () => {

    // address info which will be passed to reciept compinent as prop as it is using that info
  const [addressInfo,setAddressInfo] = useState({
    addFrom: "0x5f4dcc3b5aa765d61d8327deb882cf99",
    addTo: "0x098f6bcd4621d373cade4e832627b4f6",
    blkHash:"0x8a36f255f29545ab110ed6747ca1550a72c432c12c654bf8d869f35b4dcd9837",
    transHash:"0x731a3d26bc9719c646f35a8c01a8e9d8f5f151b25bea9de2b07a0f3df647b70e7",
    blk:15,
    amtVal:0
  });

  const [error, setError] = useState(false);

  const [amtVal, setValue] = useState(null);

  //we'll update the state of parent component from child i.e reciept using below state var
  const [doTransfer,setTransfer] = useState(false)

  const onChangeVal = (e) => {
    setValue(e.target.value);
    
    // If entered value is zero or lesser then raise error it will go to if condition else it wont go to if and the erro state will remain false
    setError(false);
    if (e.target.value <= 0) {
      setError(true);
    }
  };

  const resetTransaction = () => {
    setTransfer(!doTransfer)
    setValue('')
  }

  return (
    <>
    <Card
      className="my-2">
      <CardHeader className="text-center" tag="h4">
        Transfer Ethers
      </CardHeader>
      <CardBody>
        <CardTitle tag="h6" className="mb-3">
          Your Ether will be transfered to below information
        </CardTitle>
        <CardText className="my-2">
          <strong>From: </strong>
          {addressInfo?.addFrom}
        </CardText>
        <CardText>
          <strong>To: </strong>
          {addressInfo?.addTo}
        </CardText>
        <span className="field">
          <InputGroup>
            <Input
              id="exampleNumber"
              name="number"
              placeholder="Enter Amount"
              type="number"
              min="0"
              step="1"
              onChange={onChangeVal}
              disabled={doTransfer}
              value={amtVal}
            />
            <Button disabled={amtVal < 1 || doTransfer} color="success" onClick={()=>setTransfer(true)}>
              Transfer
            </Button>
          </InputGroup>
        {/* if error is true show error msg */}
          {error && <span style={{ fontSize: "12px", color: "red" }}>
            Please enter an amount greater than 0
          </span>}
          {doTransfer && <span style={{ fontSize: "12px", color: "blue" }}>
            Please clear the reciept to Intitate a new transaction
          </span> }
        </span>
      </CardBody>
    </Card>
    {doTransfer && <Reciept resetTransaction={resetTransaction} addressInfo={addressInfo} amtVal={amtVal}/>}
    </>
  );
};

export default Transfer;

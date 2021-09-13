
import React from 'react';
import { Col, Row } from 'react-bootstrap';

function HeaderERC20() {
  const headerERC20 = 
  <Row className="blockchain-txns-header">
    <Col className="blockchain-txns-header-hash">Hash</Col>
    <Col className="blockchain-txns-header-symbol">Symbol</Col>
    <Col className="blockchain-txns-header-blocknumber">Block Number</Col>
    <Col className="blockchain-txns-header-timestamp" blockchain-txns-header>Time Stamp</Col>
    <Col className="blockchain-txns-header-from" >From</Col>
    <Col className="blockchain-txns-header-to">To</Col>
    <Col className="blockchain-txns-header-value">Symbol Value</Col>
  </Row>

  return <>
    {headerERC20}
  </>

}

export default HeaderERC20
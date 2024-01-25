
import { useState } from 'react';
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import './snippets.css'

function Snippets() {
  return (
    <div className="Snippets d-flex justify-content-center" >
    <Card isBlurred className="card-1" >
      <CardBody>
        <p>Show me my runs from October of 2023..</p>
      </CardBody>
    </Card>
    <Card isBlurred className="card-2" >
      <CardBody>
        <p>Which rides did I do that were more than 20km long?</p>
      </CardBody>
    </Card>
    <Card isBlurred className="card-3" >
      <CardBody>
        <p>Show all my runs and rides from 2023</p>
      </CardBody>
    </Card>
    <Card isBlurred className="card-4" >
      <CardBody>
        <p>Did I go Alpine skiing in november 2023?</p>
      </CardBody>
    </Card>
    </div>
  );
}

export default Snippets;

import {Alert} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectExternal, setErrorMessage} from "./thunk";
import React from "react";

export function ErrorAlert() {
  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector(selectExternal).errorMessage;
  if (errorMessage) {
    return (
      <div>
        <Alert variant="danger" onClose={() => dispatch(setErrorMessage(""))} dismissible style={{width: "200px"}}>
          <Alert.Heading>Error</Alert.Heading>
          <p>{errorMessage}</p>
        </Alert>
      </div>
    );
  } else {
     return <></>
  }
}



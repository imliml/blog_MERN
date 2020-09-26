import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";

const Activation = ({ match }) => {
  const [formData, setFormData] = useState({
    name: "",
    token: "",
    show: true,
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);

    if (token) {
      setFormData({ ...formData, name, token });
    }

    console.log(token.name);
  }, [match.params]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1>test</h1>
    </div>
  );
};

export default Activation;

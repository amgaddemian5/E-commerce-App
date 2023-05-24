import React from "react";

import styled from "styled-components";

const Container = styled.div`
  height: 35px;
  background-color: #B71C1C;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const Announcement = () => {
  return <Container>Super Deal! Free Shopping On Orders Over $90</Container>;
};

export default Announcement;

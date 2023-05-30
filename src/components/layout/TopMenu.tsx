import React from "react";
import { Layout, Row, Col, Menu } from "antd";
import { useHistory } from "react-router-dom";

const pages = [
  {
    key: "main",
    label: "Main page",
  }
];

export const TopMenu = () => {
  const history = useHistory();

  return (
    <>
      <Layout.Header>
        <Menu
          style={{ width: '960px', margin: '0 auto' }}
          theme="dark"
          mode="horizontal"
          items={pages}
          onClick={() => history.push("/")}
        />
      </Layout.Header>
    </>
  );
};

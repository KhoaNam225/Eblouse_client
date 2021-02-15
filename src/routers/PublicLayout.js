import React from "react";
import { Switch, Route } from "react-router-dom";
import { PublicNavBar } from "../components/navbar";
import Footer from "../components/Footer";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import InformationPage from "../pages/InformationPage";
import NotFoundPage from "../pages/NotFoundPage";
import ClinicDetailPage from "../pages/ClinicDetailPage";
import BookingDetailPage from "../pages/BookingDetailPage";
import BookingConfirm from "../pages/BookingConfirm";
import PrivateRoute from "./PrivateRoute";
import SearchListPage from "../pages/SearchListPage";
import ClinicLoginPage from "../pages/ClinicLoginPage";
import AdminPage from "../pages/Admin/AdminPage";

import "../style/main.css";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const PublicLayout = () => {
  const specializations = useSelector(
    (state) => state.specializations.specializations
  );

  return (
    <>
      <PublicNavBar specializations={specializations} />
      <Container style={{ padding: 0 }} fluid>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/info" component={InformationPage} />
          <Route exact path="/clinic/:id" component={ClinicDetailPage} />
          <Route exac path="/search/:query" component={SearchListPage} />
          <PrivateRoute
            exact
            path="/booking/:id"
            component={BookingDetailPage}
          />
          <PrivateRoute
            exact
            path="/booking/confirm/:id"
            component={BookingConfirm}
          />
          <Route exact component={NotFoundPage} />
        </Switch>
      </Container>
      <Footer />
    </>
  );
};

export default PublicLayout;

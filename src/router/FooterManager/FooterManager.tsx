import React from 'react';
import Footer from '../../components/Footer/Footer';
import { Link, IconButton } from '@material-ui/core';

import { ReactComponent as Facebook } from "../../assets/images/Landing/facebook-brands.svg";
import { ReactComponent as Twitter } from "../../assets/images/Landing/twitter-brands.svg";
import { ReactComponent as Youtube } from "../../assets/images/Landing/youtube-brands.svg";

const footerContent = () => {
    return [
      {
        title: "general",
        links: [
          <Link href="#">About us</Link>,
          <Link href="#">Contact us</Link>,
          <Link href="#">Feedback</Link>,
          <Link href="#">Credits</Link>,
          <Link href="#">Roadmap</Link>,
        ],
      },
      {
        title: "social",
        links: [
          <IconButton>
            <Youtube />
          </IconButton>,
          <IconButton>
            <Twitter />
          </IconButton>,
          <IconButton>
            <Facebook />
          </IconButton>,
        ],
      },
    ];
};

const FooterManager = () => {
    return <Footer sections={footerContent()} />;
};

export default FooterManager;
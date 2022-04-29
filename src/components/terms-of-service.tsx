import { Typography } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material";
import { useParams } from "react-router-dom";
import React, { useState } from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { auth } from "../firebaseSetup";
import { logout } from "../data/authFunctions";
import { onAuthStateChanged } from "firebase/auth";


const styleProps: React.CSSProperties = {
  fontFamily: 'Roboto', sans-serif,
  heading: {
    fontSize: 12
  },
  body: {
    fontSize: 8
  }
}

function HootTOS() {
  const { userId } = useParams();
  return (
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
	
	<h1 style={styleProps.heading.fontSize}>Hoot! Terms of Service</h1>

	<p style={styleProps.body.fontSize}>These terms of service (“Terms”) govern your use of and access to Hoot (the “Site”) and any images, text, or other types of media uploaded, downloaded, or appearing on the platform (collectively referred to as “Content”), except where expressly stated otherwise. By creating an account with and using the Site, you agree to be bound by these Terms. The Site reserves the right to modify these terms at a future date as necessary for reasons including but not limited to technological changes, system requirements, industry trends, and ensuring continued proper function. In the event that such changes are made, you will be provided with an opportunity to review these changes, and close your account with the Site if you do not agree to the changes within thirty (30) days of being sent such notification. By keeping your account open after this thirty-day period, you agree to be bound by these changes.</p>
	
	<h2 style={styleProps.heading.fontSize}>WHO MAY USE THIS SITE</h2>
	 
	<p2 style={styleProps.body.fontSize}>You may use the Site only if you agree to the rules outlined by these Terms, and are not a person barred from using or receiving Content through such sites and similar services by law. Additionally, in all cases, you must be at least 13 years old, and must not have previously held an account with the Site which was removed or suspended for violation of these Terms. By creating an account with the Site, you accept these Terms, and confirm to the best of your knowledge that you satisfy all eligibility criteria. Discovery of an account made in violation of these Terms will be cause for immediate suspension.</p2>
	
	<h3 style={styleProps.heading.fontSize}>PRIVACY</h3>

	<p3 style={styleProps.body.fontSize}>The Site has a separate Privacy Policy, which may be viewed at <link to Hoot privacy policy here>. This policy describes how we handle the information you provide us when you use the Site. By creating an account and using the Site, you agree that you have read this privacy policy, and agree to allow the Site to collect and use information collected as is necessary to facilitate operation of the Site and rendering of services to users, as outlined in the Privacy Policy. The Site reserves the right to modify the Privacy Policy at a future date as necessary to allow proper function for reasons including but not limited to technological changes, system requirements, and industry trends. In the event that such changes are made, you will be provided with an opportunity to review these changes, and close your account with the Site if you do not agree to the changes within thirty (30) days of being sent such notification. By keeping your account open after this thirty-day period, you agree to be bound by these changes.</p3>

	<h4 style={styleProps.heading.fontSize}>CONTENT ON THE SITE</h4>
	
	<p4 style={styleProps.body.fontSize}>You are responsible for any Content, as defined above, which you provide and upload to the Site, including ensuring compliance with all applicable laws, rules, and regulations. Illegal content or incitement of illegal activity is expressly prohibited on the Site.
Any Content that you view, reference, or otherwise obtain from the Site is done so at your own risk. The Site does not endorse, support, represent, or guarantee the completeness, accuracy, or reliability of any Content uploaded to the Site. You understand that by using the Site, you may be exposed to Content that might be viewed as offensive, inaccurate, or otherwise inappropriate. All Content that obeys applicable laws, rules, and regulations, as well as abides by the Terms of the Site, is the sole responsibility of the individual who uploads it. The Site does not actively monitor or control Content posted to it, and as such does not take responsibility for such Content.
We reserve the right to remove Content for reasons that are determined to be violations of the Terms, including but not limited to unlawful content, sexually explicit content, impersonation, and copyright violation. If you believe there is Content that has been uploaded to the Site that violates the Terms in any way, please contact the Site to report such Content at:
HootCS@gmail.com
You retain all rights to any Content you submit to the Site. All content which you have rights to use, you continue to have those rights with after uploading to the Site. By submitting, posting, uploading or otherwise displaying Content on the Site, you grant the Site a worldwide, non-exclusive, royalty-free license to use, copy, reproduce, adapt, modify, publish, transmit, display, and distribute the Content in-question in any and all media formats now known or later developed. This license (“Service License”) is for the purpose of allowing the Site to make your Content available to other users and vice versa. You agree that this license also allows the Site to provide, promote, and improve the Site as appropriate, without compensation. By uploading this Content, you agree that you have obtained any and all rights, licenses, permissions, and other authority necessary to grant the Service License as described.</p4>

	<h5 style={styleProps.heading.fontSize}>USER ACCOUNTS</h5>

	<p5 style={styleProps.body.fontSize}>In order to access and use the Site, you will need a user account. (“Account”) Creating an Account makes you a user (“User”) of the Site. The security of your Account is your sole responsibility, and the Site is not liable for any loss of information, loss of Content, or other damages that arise if your Account becomes compromised.
The Site grants you a personal, worldwide, royalty-free, non-assignable, non-exclusive license to use the Site. This license (“User License”) has the sole purpose of enabling you to use and enjoy the Site, uploading your Content to Hoot and viewing the Content of others in accordance with the Terms. The User License does not give you permission to use the Hoot name, mascot, logo, or any other distinctive brand features. You may end the User License and the legal agreements it constitutes at any time by terminating your Account and discontinuing your usage of the Site. We may suspend or terminate an Account and its User License at any time for any reason, including but not limited to violations of Terms, creation of a legal risk for the Site, prolonged inactivity, or changes in the state of the industry. Prior to doing so, we will make reasonable attempts to contact you regarding the relevant particular concern, barring situations necessitating immediate action such as an event posing risk of physical harm. In all cases where your Account or User License are suspended, terminated, or otherwise rendered unusable, the Terms and all rights, licenses, and permissions granted to you by the Terms shall also be terminated. If you believe your Account or License were disabled, suspended, or otherwise terminated in error, please contact the Site at:
HootCS@gmail.com</p5>

	<h6 style={styleProps.heading.fontSize}>DISCLAIMERS</h6>

	<p6 style={styleProps.body.fontSize}>Your access and use of the Site and its Content are at your own risk. You understand and agree that the Site and its content are provided to you on an “as is” and “as available” basis. Without limiting the foregoing, to the maximum extent permitted under applicable law, Hoot, the Site, and their respective parties disclaim all warranties and conditions, whether express or implied, of merchantability, fitness for a particular purpose, or non-infringement. Hoot, the Site, and their respective parties make no warranty or representation and disclaim all responsibility and liability for: (i) the completeness, accuracy, availability, timeliness, security, or reliability of the Site and any Content; (ii) any harm to your computer system, loss of data, or other harm that results from your access to or use of the Site or any Content; (iii) the deletion of, or failure to store or to transmit, any Content and other communications maintained by the Site; and (iv) whether the Site will meet your requirements or be available on an uninterrupted, secure, or error-free basis. No advice or information, whether oral or written, obtained from Hoot, the Site, or their respective parties, will create any warranty or representation not expressly made herein.</p6>

	<h7 style={styleProps.heading.fontSize}>LIMITATION OF LIABILITY</h7>

	<p7 style={styleProps.body.fontSize}>To the maximum extent permitted by applicable law, Hoot, the Site, and their respective parties shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Site; (ii) any conduct or content of any third party on the Site, including without limitation, any defamatory, offensive, or illegal conduct of other users or third parties; (iii) any content obtained from the Site; or (iv) unauthorized access, use, or alteration of your transmissions or Content. In no event shall the aggregate liability of Hoot, the Site, or their respective parties exceed the greater of one hundred US dollars (U.S. $100.00) or the amount you paid to Hoot, the Site, or their respective parties, if any, in the past six months for the services giving rise to the claim. The limitations of this subsection shall apply to any theory of liability, whether based on warranty, contract, statute, tort (including negligence), or otherwise, and whether or not Hoot, the Site, or its respective entities have been informed of the possibility of any such damage, even if a remedy set forth herein is found to have failed of its essential purpose.</p7>

	<h8 style={styleProps.heading.fontSize}>GENERAL</h8>

	<p8 style={styleProps.body.fontSize}>This agreement, as modified from time to time, governs the relationship between you, the User, and Hoot, the Site. Modifications to this agreement will not be retroactive, and the current version of these terms will always be available at <link here>. We will make reasonable efforts to inform you of any notable changes when they occur, such as through an email notification to your associated email address, or an alert message upon logging in. By continuing to log in and use the Site after these changes become effective, you agree to be bound by the revised Terms.
The laws of the State of Maryland, excluding its choice of law provisions, shall govern these Terms and any dispute that arises between you and Hoot, the Site, or their respective parties. All disputes related to these Terms or the Site will be brought solely in the federal or state courts located in Baltimore County, Maryland, United States, and you consent to personal jurisdiction and wave any objections as to inconvenient forum.
If you are a United States federal, state, or local government agency or body, using the Services in your official capacity, and legally unable to accept the clauses as defined in this section, then this section does not apply to you. For such entities, this agreement and any related section will be governed by the laws of the United States of America, without regard of conflict of law provisions, and, in the absence of federal law and to the extent permitted under Federal law, the State of Maryland, excluding choice of law.</p8>

	)
}

export default HootUser;
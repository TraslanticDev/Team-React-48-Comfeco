import { Grid } from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import Head from "next/head";
import React, { ReactNode } from "react";
import FooterComponent from "./FooterComponent";
import Loader from "./Loader";
import HeaderLogin from "./header/HeaderLogin";
import HeaderLogout from "./header/HeaderLogout";

type Props = {
  children?: ReactNode;
  title?: string;
  type?: boolean;
};
const Layout = ({
  children,
  title = "This is the default title",
  type,
}: Props) => {
  const [session, loading] = useSession();
  return loading ? (
    <Loader title={title} />
  ) : (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Grid bg={type ? "bg.200" : "bg.100"} backgroundSize="cover" w="100%">
        {session ? <HeaderLogin /> : <HeaderLogout type={type} />}
        {children}
        <FooterComponent />
      </Grid>
    </>
  );
};

export default Layout;

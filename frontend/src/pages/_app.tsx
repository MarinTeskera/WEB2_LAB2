import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";

function ExampleApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default ExampleApp;

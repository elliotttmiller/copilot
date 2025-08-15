import "../components/agentic-ui.css";
import { CopilotKit } from "@copilotkit/react-core";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CopilotKit
      runtimeUrl={process.env.NEXT_PUBLIC_COPILOTKIT_API_URL}
      publicLicenseKey={process.env.NEXT_PUBLIC_COPILOTKIT_API_KEY || "ck_pub_011541242c359e759e3256628c64144b"}
    >
      <Component {...pageProps} />
    </CopilotKit>
  );
}

export default MyApp;

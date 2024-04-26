// import { PrismaClient } from "@repo/db/client";

import UseBalance from "./user/useBalance";


export default function Page(): JSX.Element {
  // const client = new PrismaClient()
  return (
<>
<div className="bg-red-200">user APP</div>
<UseBalance></UseBalance>
</>
  );
}

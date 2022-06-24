import type { RequestConfig } from "~utils/request"

import { getMessage } from "./helper"

export const [sendRequest, subscribeRequest] =
  getMessage<RequestConfig>("REQUEST")

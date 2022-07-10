import "webextension-polyfill"

import { subscribeRequest } from "~messages"
import { request } from "~utils/request"

subscribeRequest(request)

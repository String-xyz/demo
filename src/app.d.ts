import type { StringPay } from "@stringpay/sdk";

declare global {
	interface Window {
		StringPay: StringPay;
	}
}

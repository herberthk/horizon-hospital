import Vapi from "@vapi-ai/web";
const API_KET = process.env.NEXT_PUBLIC_VAPI_API_KEY;

if (!API_KET) {
  throw new Error(
    "VAPI_API_KEY is not defined. Please set them in your environment variables."
  );
}

export const vapi = new Vapi(API_KET);

// sanity.ts
import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: 'de560hm0',
  dataset: 'production',
  apiVersion: '2024-07-04', // Current API version
  useCdn: false, // Use local development server (change for production),
  token:"skuQ3Cf2sB5HPAQya33REpsrJ2NszzxHCQiyGG3Z7iqTYTZRaDI2cX1PNqpagpt14KnjESb8ahKJi64xDe8GQVmftN6nKGCrAqOt7aSzF25IDVXvtl1Bqae1do48AKmCjCvCpX7g7samdPOuNenXdm7thpnF879lNLqsxInGgNDasRtqaNNn"
});
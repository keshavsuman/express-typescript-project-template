/**
 * @description this function is used to create a redirection URL for partner integration
 * @author Keshav suman
 * @retruns
 */
export async function createAuthorizationURL(client_id: string) {
  return `https://auth.razorpay.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${process.env.Razorpay_redirect_url}&scope=read_only&state=NOBYtv8r6c75ex6WZ`;
}

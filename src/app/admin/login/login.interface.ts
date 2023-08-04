export interface AdminLogin {
  email?: string | null | undefined;
  password?: string | null | undefined;
}


export interface returnData {
    Emailmessage?:string
    Passmessage?:string
    success?:boolean
    access_token:string 
}
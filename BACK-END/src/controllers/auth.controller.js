
import jwt, { decode } from "jsonwebtoken";
// import cloudinary from "../lib/cloudinary.js";
import prisma from "../prisma.js";
import twilio from 'twilio';




import { generateToken } from "../lib/utils.js";

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;



export const signup = async (req, res) => {
    const { name, phone } = req.body;
    if (name || phone) {
        const customer = await prisma.customer.findUnique({ where: { phone: phone, }, });

        if (!customer) {
            const newCustomer = await prisma.customer.create({ data: { name: name, phone: phone, } });
            console.log(newCustomer)
            if (newCustomer) {
                //here we will generate token that have the otp and send it in client then in 
                // verify we take the otp again and check if it in out database
                const token = await generateOtpToken(newCustomer.id, newCustomer.phone, res);
                //const client = twilio(process.env.ACCOUNTSID, process.env.AUTHTOKEN);
                //const otp = Math.floor(100000 + Math.random() * 900000);

                if (token) return res.status(201).json({
                    data: customer, success: 'User login Successfully'
                })

            }
            else
                return res.status(400).send('invalid user data');

        }
        return res.status(409).send('Customer already exists');
    }
    return res.status(400).send('All fields are required');

}
export const verify_otp = async (req, res) => {

    const { otp } = req.body;
    console.log("user otp :", otp)

    const token = req.cookies._OTP;

    if (!token) return res.status(401).json({ message: "Unauthorized" })

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({ message: "Unauthorized" })
    //now using the decoded.customerId as id of customer we get Customer and last otpverify

    const Customer = await prisma.customer.findUnique({ where: { id: decoded.customerId }, });

    if (!Customer) return res.status(404).json({ message: "User not found" })

    const Actualotp = await prisma.otpVerifcations.findFirst({ where: { customerId: Customer.id }, orderBy: { createdAt: 'desc' } });
    console.log(Actualotp)
    if (Actualotp.otp === otp) {
        res.cookie("_OTP", { maxAge: 0 });
        res.clearCookie("token");
    
        generateToken(Customer.id, res)
        return res.status(200).json({ message: `welcome mr ${Customer.name}` })
    }
    return res.status(400).json({ message: "Invalid otp" })
}








export const login = async (req, res) => {

    const { phone } = req.body;
    const customer = await prisma.customer.findUnique({ where: { phone: phone }, });

    if (customer) {

        const token = await generateOtpToken(customer.id, customer.phone, res);
        //const client = twilio(process.env.ACCOUNTSID, process.env.AUTHTOKEN);
        //const otp = Math.floor(100000 + Math.random() * 900000);
        if (token) return res.status(201).json({
            data: customer, success: 'User login Successfully'
        })
    }
    return res.status(400).send("Invalid phone number");



}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.clearCookie("token");

        return res.status(200).send("Logged out successfully");
    } catch (error) {
        res.status(500).send("internal Server Error");

    }
}



export const CheckAuth = async (req, res) => {
    try {
        
        return res.status(200).json(req.customer);
    } catch (error) {
        res.status(500).json({ message: "internal Server Error" });

    }
}
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000);
}
async function sendOtp(phone, otp) {
    const client = twilio(accountSid, authToken);

    client.messages
        .create({
            to: "+20" + phone,
            body: "Your Verification Code is : " + otp,
            from: "+17069432981"
        })
        .then(message => console.log(message.sid));
}


export const generateOtpToken = async (customerId, phone, res) => {
    const otp = generateOtp().toString();
    //now we have otp and userId we will store the otp in database with phone
   const createdOtp = await prisma.otpVerifcations.create({ data: { otp, customerId } });

    console.log("user Actual otp : ", createdOtp)
    const token = jwt.sign(
        { customerId }                              //hashing the otp to be in otp token
        , process.env.JWT_SECRET,               //secret key
        { expiresIn: '30m' }                     //token expires in 2min
    );
    res.cookie("_OTP", token, {
        httpOnly: true,
        maxAge: 30 * 60 * 1000,
        sameSite: "strict",
        //secure: process.env.NODE_ENV === "development" ? false : true
    })
     await sendOtp(phone, otp)
    return token

}
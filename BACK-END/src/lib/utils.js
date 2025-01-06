import jwt from 'jsonwebtoken';

export const generateToken = (customerId, res) => {

    const token = jwt.sign(
        { customerId }                              //hashing the userId to be in jwt token
        , process.env.JWT_SECRET,               //secret key
        { expiresIn: '7d' }                     //token expires in 7 days
    );
    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "development" ? false : true
    })

    return token;
}
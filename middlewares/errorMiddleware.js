class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

export const errMiddleware = (err,req,res,next)=>{
    err.message = err.message || "internal server Error";
    err.statusCode = err.statusCode || 500;
    
    // 11000 means if some one add same email then duplicate
    if(err.code === 11000){
        const message = `Duplicate${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message,400)
    }
    if(err.name === "jsonWebTokenError"){
        const message = "json Web Token is invalid, Try Again";
        err = new ErrorHandler(message,400)
    }
    if(err.name === "TokenExpiredError"){
        const message = "json Web Token is Expired, Try Again";
        err = new ErrorHandler(message,400)
    }
    if(err.name === "CastError"){
        const message = `Invalid ${err.path}`;
        err = new ErrorHandler(message,400)
    }

        const errorMessage = err.errors
        ? Object.values(err.errors).map((error)=>
            error.message
        ).join(" ")
        : err.message;

    return res.status(err.statusCode).json({
        success:false,
        message: errorMessage,
    })
}

export default ErrorHandler;
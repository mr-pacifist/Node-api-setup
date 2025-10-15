
import createError from "http-errors";
import { ApiResponse } from "./ApiResponse.js";

// 404 not found handler

function notfoundHandler(req,res,next){
    next(createError(404, "Not found"));
}

// default error handler
function errorHandler(err,req,res,next){
    if (err.message === 'Not found') {
        res.status(404).json( new ApiResponse(
            404,
            {},
            "Your request URL could not be found" ,
        ));
    } else { 
        
        res.status(500).json(new ApiResponse(
            500,
            {},
            { error: err.message },
        ));
    }
}

export {
    errorHandler, notfoundHandler
};

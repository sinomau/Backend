import {EError} from "../enums/EError.js";

export const errorHandler = (err, req, res, next) => {
    if (err) {
        console.log(err);
        switch (err.errorCode) {
        case EError.RoutingError:
            res.status(404).send({ status: "error", error: `${err}` });
            break;
        case EError.DatabaseError:
            res.status(500).send({ status: "error", error: `${err}` });
            break;
        case EError.InvalidJson:
            res.status(400).send({ status: "error", error: `${err}` });
            break;
        case EError.UserNotLogged:
            res.status(401).send({ status: "error", error: `${err}` });
            break;
        case EError.AuthError:
            res.status(401).send({ status: "error", error: `${err}` });
            break;
        default:
            res.status(500).send({ status: "error", error: `${err}` });
            break;
        }
    }
};
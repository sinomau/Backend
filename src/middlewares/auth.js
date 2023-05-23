export const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return  res.redirect("/failure-signup");
        }
        if(!roles.includes(req.user.role)){
            return res.redirect("/failure-signup");
        }
        return next();
    };
};


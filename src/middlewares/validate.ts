import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";

const validate = (validations:ValidationChain[]) => {
  return async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    for (const validation of validations) {
      await validation.run(req);
    }

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      next();
      return;
    }

    res.status(422).json({
      errors: errors.array().map((err) => ({
        field: "path" in err ? err.path : "unknown",
        message: err.msg,
      })),
    });
  };
};

export {validate};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { selectLanguageByUserId, updateCurrentLevelByUserId, insertNewLanguageToUser, } = require("../model/languagesModel");
exports.getLanguageByUserId = (req, res, next) => {
    const { user_id } = req.params;
    selectLanguageByUserId(user_id)
        .then((language) => {
        res.status(200).send({ language: language });
    })
        .catch((err) => {
        next(err);
    });
};
exports.postNewLanguageToUser = (req, res, next) => {
    // const { user_id } = req.params;
    const { language, user_id } = req.body;
    insertNewLanguageToUser(language, user_id)
        .then((language) => {
        res.status(201).send(language);
    })
        .catch((err) => {
        next(err);
    });
};
exports.patchCurrentLevelByUserId = (req, res, next) => {
    const { user_id } = req.params;
    updateCurrentLevelByUserId(user_id)
        .then((current_level) => {
        res.status(200).send({ current_level: current_level });
    })
        .catch((err) => {
        next(err);
    });
};
// exports.patchAvaliableLanguages = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { language: Language } = req.params;
//   updateAvaliableLanguages(language)
//     .then((current_level: number) => {
//       res.status(200).send({ current_level: current_level });
//     })
//     .catch((err: any) => {
//       next(err);
//     });
// };
// exports.selectAvaliableLanguages = () => {};
// exports.selectAvaliableLanguage = (req: Request, res: Response, next: NextFunction) => {
//   insertLanguage()
//     .then((language: Language) => {
//       res.status(201).send({ language: language });
//     })
//     .catch((err: any) => {
//       next(err);
//     });
// };

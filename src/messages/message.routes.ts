import { Router, Request, Response } from "express";
import { verifyToken } from "../middleware/verify.token";
import { MessageController } from "./messages.controller";

export const messageRouter = Router();
const messageController = new MessageController();
messageRouter.post("/message", async (req: Request, res: Response) => {
  const response = await messageController.createMessage(
    req.body.username,
    req.body.message,
    req.body.questionId
  );

  res.status(response.statusCode).send(response);
});
messageRouter.post(
  "/message/custom-question",
  verifyToken,
  async (req: Request, res: Response) => {
    const response = await messageController.userCreateCustomQuestion({
      title: req.body.title,
      userId: req.body.userId,
    });

    res.status(response.statusCode).send(response);
  }
);
messageRouter.get(
  "/messages",
  verifyToken,
  async (req: Request, res: Response) => {
    const response = await messageController.getAllMessages(req.body.userId);

    res.status(response.statusCode).send(response);
  }
);

messageRouter.get(
  "/messages/unread",
  verifyToken,
  async (req: Request, res: Response) => {
    const response = await messageController.getUnopendMeaages(req.body.userId);

    res.status(response.statusCode).send(response);
  }
);

messageRouter.get(
  "/username/:username/",
  async (req: Request, res: Response) => {
    const response = await messageController.getUserId(
      req.params.username,
      String(req?.query?.["questionId"])
    );
    res.status(response.statusCode).send(response);
  }
);

messageRouter.get(
  "/message/:messageId",
  verifyToken,
  async (req: Request, res: Response) => {
    const response = await messageController.getSingleMessage(
      req.body.userId,
      req.params.messageId
    );
    res.status(response.statusCode).send(response);
  }
);
messageRouter.delete(
  "/message",
  verifyToken,
  async (req: Request, res: Response) => {
    const response = await messageController.deleteAllMessages(req.body.userId);
    res.status(response.statusCode).send(response);
  }
);
messageRouter.get(
  "/messages/custom-questions",
  verifyToken,
  async (req: Request, res: Response) => {
    const response = await messageController.allCustomQuestions(req.body.userId);
    res.status(response.statusCode).send(response);
  }
);


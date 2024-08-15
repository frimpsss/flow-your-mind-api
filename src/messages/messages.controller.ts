import { CustomResponse, HttpStatusCode } from "../utils";
import { prisma } from "../../prisma";
import { encryptText } from "../services/encryption.service";
import { MessageDTO, SingleMessageDTO } from "./message.utils";
export class MessageController {
  /**
   * create Message
   */
  public async createMessage(
    id: string,
    message: string,
    questionId?: string
  ): Promise<CustomResponse<any | Error>> {
    try {
      const encryptedMessage = encryptText(message);
      let qId = await prisma.question.findUnique({
        where: {
          id: questionId || "",
        },
      });
      await prisma.message.create({
        data: {
          content: encryptedMessage,
          reciepientId: id,
          questionId: qId ? qId.id : null,
        },
      });
      return new CustomResponse(
        HttpStatusCode.Created,
        "Message sent successfully",
        true
      );
    } catch (error: any) {
      console.log(error);
      return new CustomResponse(
        HttpStatusCode.InternalServerError,
        error?.message,
        false
      );
    }
  }

  /**
   * userCreateCustomMessage
   */
  public async userCreateCustomQuestion({
    title,
    userId,
  }: {
    title: string;
    userId: string;
  }): Promise<CustomResponse<{} | Error>> {
    try {
      const createdQuestion = await prisma.question.create({
        data: {
          title,
          userId,
        },
      });

      return new CustomResponse(
        HttpStatusCode.Ok,
        "Question created successfully",
        true,
        createdQuestion
      );
    } catch (error: any) {
      return new CustomResponse(
        HttpStatusCode.InternalServerError,
        error?.message,
        false
      );
    }
  }
  public async getUnopendMeaages(
    id: string
  ): Promise<CustomResponse<number | Error>> {
    try {
      const unopendCount = await prisma.message.count({
        where: {
          reciepientId: id,
          isOpened: false,
        },
      });

      return new CustomResponse(
        HttpStatusCode.Ok,
        "all messages retrieved",
        true,
        unopendCount
      );
    } catch (error: any) {
      return new CustomResponse(
        HttpStatusCode.InternalServerError,
        error?.message,
        false
      );
    }
  }

  public async getAllMessages(
    id: string
  ): Promise<CustomResponse<MessageDTO[] | Error>> {
    try {
      const messages = await prisma.message.findMany({
        where: {
          reciepientId: id,
        },
        orderBy: {
          createdOn: "desc",
        },
      });

      const d = messages.map(
        (e: {
          id: string;
          content: string;
          isOpened: boolean | null;
          reciepientId: string;
        }) => new MessageDTO(e)
      );

      return new CustomResponse(
        HttpStatusCode.Ok,
        "all messages retrieved",
        true,
        d
      );
    } catch (error: any) {
      return new CustomResponse(
        HttpStatusCode.InternalServerError,
        error?.message,
        false
      );
    }
  }

  public async getUserId(
    username: string,
    questionId?: string
  ): Promise<CustomResponse<{} | Error>> {
    try {
      if (!username.trim()) {
        return new CustomResponse(
          HttpStatusCode.BadRequest,
          "Pass username",
          false
        );
      }

      const founduser = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (!founduser) {
        return new CustomResponse(404, "Username not found", false);
      }

      const foundQuestion = await prisma.question.findFirst({
        where: {
          userId: founduser.id,
          id: questionId || "",
        },
      });

      return new CustomResponse(HttpStatusCode.Ok, "User id retrieved", true, {
        userId: founduser.id,
        question: foundQuestion,
      });
    } catch (error: any) {
      return new CustomResponse(
        HttpStatusCode.InternalServerError,
        error?.message,
        false
      );
    }
  }

  public async getSingleMessage(
    userId: string,
    messageId: string
  ): Promise<CustomResponse<any>> {
    try {
      if (!userId || !messageId) {
        return new CustomResponse(
          HttpStatusCode.BadRequest,
          "invalid body ",
          false
        );
      }

      const founduser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          messages: {
            select: {
              question: {
                select: {
                  title: true,
                },
              },
              id: true,
              content: true,
              reciepientId: true,
              createdOn: true,
              isOpened: true,
            },
          },
        },
      });

      if (!founduser) {
        return new CustomResponse(
          HttpStatusCode.BadRequest,
          "message id incorrect",
          false
        );
      }

      // const message = founduser.messages.find(
      //   (m: {
      //     id: string;
      //     content: string;
      //     isOpened: boolean | null;
      //     reciepientId: string;
      //     createdOn: Date | null;
      //     question: {
      //       title: {
      //         st
      //       }
      //     }
      //   }) => m.id === messageId
      // );
      const message = founduser.messages.find((m: any) => m.id === messageId);
      if (!message) {
        return new CustomResponse(
          HttpStatusCode.BadRequest,
          "message id incorrect",
          false
        );
      }

      if (!message.isOpened) {
        await prisma.message.update({
          where: {
            id: message.id,
          },
          data: {
            isOpened: true,
          },
        });
      }
      console.log(message);
      const msg = new SingleMessageDTO(message as any);
      return new CustomResponse(
        HttpStatusCode.Ok,
        "message retieved",
        true,
        msg
      );
    } catch (error: unknown) {
      return new CustomResponse(
        HttpStatusCode.InternalServerError,
        error instanceof Error ? error?.message : (error as string),
        false
      );
    }
  }

  /**
   * deleteAllMessages
   */
  public async deleteAllMessages(userId: string): Promise<CustomResponse<any>> {
    try {
      const all_messages = await prisma.message.deleteMany({
        where: {
          reciepientId: userId,
        },
      });

      return new CustomResponse(
        HttpStatusCode.Ok,
        "All messages deleted",
        true,
        {}
      );
    } catch (error: unknown) {
      return new CustomResponse(
        HttpStatusCode.InternalServerError,
        error instanceof Error ? error?.message : (error as string),
        false
      );
    }
  }

  public async allCustomQuestions(
    userId: string
  ): Promise<CustomResponse<any>> {
    try {
      const all_ques = await prisma.question.findMany({
        where: {
          userId: userId,
        },
      });
      return new CustomResponse(
        HttpStatusCode.Ok,
        "All ques retrieved",
        true,
        all_ques
      );
    } catch (error: unknown) {
      return new CustomResponse(
        HttpStatusCode.InternalServerError,
        error instanceof Error ? error?.message : (error as string),
        false
      );
    }
  }
}

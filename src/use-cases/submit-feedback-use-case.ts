import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}
  async execute(request: SubmitFeedbackUseCaseRequest) {
    if (!request.type) {
      throw new Error("Type is required");
    }

    if (!request.comment) {
      throw new Error("Comment is required");
    }

    if (
      request.screenshot &&
      !request.screenshot.startsWith("data:image/png;base64")
    ) {
      throw new Error("Invalid screenshot format");
    }
    await this.feedbacksRepository.create(request);
    await this.mailAdapter.sendEmail({
      subject: "Novo feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do feedback: ${request.type}</p>`,
        `<p>Comentário: ${request.comment}</p>`,
        request.screenshot ? `<img src="${request.screenshot}"/>` : null,
        `</div>`,
      ].join("\n"),
    });
  }
}

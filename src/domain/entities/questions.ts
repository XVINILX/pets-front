export interface ReadQuestionsDto {
  type: QuestionType;
  label: string;
}

export enum QuestionType {
  email = "email",
  tellphone = "tellphone",
  text = "text",
  address = "address",
}

import {type DeepPartial} from 'typeorm';

export type TicketAnswer = {
    id: number;
    text: string;
    insertURL: string[];
    ticketId?: number | null;
    userId?: number | null;
    answerDate: Date;
};

export type TicketAnswerWithoutId = {id?: number} & Omit<TicketAnswer, 'id'>;

export type PartialTicketAnswer = DeepPartial<TicketAnswer>;
